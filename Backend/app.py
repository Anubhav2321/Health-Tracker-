import os
import random
from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__, 
            template_folder='../frontend/templates', 
            static_folder='../frontend/static')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Model
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer, default=25)
    weight = db.Column(db.Float, default=70.0)
    height = db.Column(db.Float, default=175.0)
    goal = db.Column(db.String(100), default="General Health")
    current_mood = db.Column(db.String(50), default="Neutral") 
    photo_data = db.Column(db.Text, default="")
    level = db.Column(db.Integer, default=1)
    xp = db.Column(db.Integer, default=0)
    missions = db.relationship('Mission', backref='user', lazy=True)

# Mission Model
class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    xp_reward = db.Column(db.Integer, default=100)
    user_id = db.Column(db.Integer, db.ForeignKey('user_profile.id'), nullable=False)

with app.app_context():
    db.create_all()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

# --- ROUTES ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('name')
    if not username: return jsonify({"error": "Name required"}), 400

    user = UserProfile.query.filter_by(name=username).first()
    if user:
        return jsonify({
            "status": "existing", "name": user.name, "age": user.age,
            "weight": user.weight, "height": user.height, "goal": user.goal,
            "mood": user.current_mood, "photo": user.photo_data,
            "level": user.level, "xp": user.xp
        })
    else:
        new_user = UserProfile(name=username)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status": "new", "name": username, "mood": "Neutral", "level": 1, "xp": 0})

@app.route('/update_profile', methods=['POST'])
def update_profile():
    data = request.json
    username = data.get('name')
    user = UserProfile.query.filter_by(name=username).first()
    if user:
        if 'age' in data: user.age = int(data['age'])
        if 'weight' in data: user.weight = float(data['weight'])
        if 'height' in data: user.height = float(data['height'])
        if 'goal' in data: user.goal = data['goal']
        if 'mood' in data: user.current_mood = data['mood']
        if 'photo' in data: user.photo_data = data['photo']
        db.session.commit()
        return jsonify({"message": "Updated"})
    return jsonify({"message": "User not found"}), 404

@app.route('/get_missions', methods=['POST'])
def get_missions():
    data = request.json
    username = data.get('username')
    user = UserProfile.query.filter_by(name=username).first()
    if not user: return jsonify({"error": "User not found"}), 404
    mission_list = [{"id": m.id, "task": m.task, "completed": m.completed, "xp": m.xp_reward} for m in user.missions]
    return jsonify({"missions": mission_list, "level": user.level, "xp": user.xp})

@app.route('/add_mission', methods=['POST'])
def add_mission():
    data = request.json
    username = data.get('username')
    task_text = data.get('task')
    user = UserProfile.query.filter_by(name=username).first()
    if not user: return jsonify({"error": "User not found"}), 404
    new_mission = Mission(task=task_text, user_id=user.id, xp_reward=100)
    db.session.add(new_mission)
    db.session.commit()
    return jsonify({"message": "Mission Added", "id": new_mission.id})

@app.route('/complete_mission', methods=['POST'])
def complete_mission():
    data = request.json
    mission_id = data.get('id')
    username = data.get('username')
    user = UserProfile.query.filter_by(name=username).first()
    mission = Mission.query.get(mission_id)
    if mission and not mission.completed:
        mission.completed = True
        user.xp += mission.xp_reward
        leveled_up = False
        if user.xp >= 200:
            user.level += 1
            user.xp = user.xp - 200 
            leveled_up = True
        db.session.commit()
        return jsonify({"status": "success", "new_xp": user.xp, "new_level": user.level, "leveled_up": leveled_up})
    return jsonify({"status": "error"})

@app.route('/delete_mission', methods=['POST'])
def delete_mission():
    data = request.json
    mission_id = data.get('id')
    Mission.query.filter_by(id=mission_id).delete()
    db.session.commit()
    return jsonify({"status": "deleted"})

@app.route('/ask_ai', methods=['POST'])
def ask_ai():
    data = request.json
    user_message = data.get('message', '')
    username = data.get('username', 'User')
    user = UserProfile.query.filter_by(name=username).first()
    user_stats = f"Name: {user.name}, Age: {user.age}, Weight: {user.weight}" if user else "Unknown"
    try:
        system_prompt = (
            f"You are BioNexus AI. Context: {user_stats}. "
            "Detect mood from text and append |||MOOD:X at end. "
            "X options: Happy, Sad, Emotional, Heavy Bass, Soft, Angry, Frustrated, Energetic, Lofi, Bhojpuri, Romantic, or Neutral. "
            "Keep answers short."
        )
        chat_completion = client.chat.completions.create(
            messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": user_message}],
            model="llama-3.1-8b-instant", temperature=0.7, max_tokens=500,
        )
        full_response = chat_completion.choices[0].message.content
        bot_reply = full_response
        detected_mood = "Neutral"
        if "|||MOOD:" in full_response:
            parts = full_response.split("|||MOOD:")
            bot_reply = parts[0].strip()
            detected_mood = parts[1].strip()
            if user:
                user.current_mood = detected_mood
                db.session.commit()
        return jsonify({"reply": bot_reply, "mood": detected_mood})
    except Exception as e:
        return jsonify({"reply": "System Error.", "mood": "Neutral"})

@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    data = request.json
    weight = data.get('weight')
    goal = data.get('goal')
    mood = data.get('mood')
    if not weight or not goal or not mood:
        return jsonify({"plan": "Please fill all fields to generate protocol."})
    prompt = f"""
    Create a 1-Day Diet & Workout Plan based on:
    Weight: {weight}kg, Goal: {goal}, Mood: {mood}.
    Format using simple HTML tags (<h3>, <ul>, <li>, <b>). 
    Structure: <h3>🥗 Nutrition</h3> ... <h3>💪 Workout</h3> ...
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant", temperature=0.7, max_tokens=600,
        )
        return jsonify({"plan": chat_completion.choices[0].message.content})
    except Exception as e:
        return jsonify({"plan": "Protocol generation failed."})

@app.route('/get_analytics', methods=['POST'])
def get_analytics():
    data = request.json
    username = data.get('username')
    user = UserProfile.query.filter_by(name=username).first()
    if not user: return jsonify({"error": "User not found"}), 404
    bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + 5
    daily_burn = int(bmr * 1.4)
    weekly_burn = daily_burn * 7
    avg_sleep = "7.5 Hrs"
    if user.age < 20: avg_sleep = "8.5 Hrs"
    elif user.age > 50: avg_sleep = "6.5 Hrs"
    perf_increase = random.randint(5, 15)
    chart_data = [random.randint(30, 95) for _ in range(7)]
    return jsonify({
        "weekly_burn": f"{weekly_burn:,} Kcal",
        "avg_sleep": avg_sleep,
        "performance": f"+{perf_increase}%",
        "chart_data": chart_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)