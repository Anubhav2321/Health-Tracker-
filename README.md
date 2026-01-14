<div align="center">
  <a href="https://health-tracker-1-lidy.onrender.com/">
    <img src="frontend/static/logo.png" alt="BioNexus Logo" width="140" style="filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.2)); transition: transform 0.3s ease-in-out;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1.0)'" />
  </a>

  # 🌱 BioNexus - AI Health Tracker
  
  **Your Intelligent Companion for Health, Nutrition, and Fitness.**

  <br>

  <a href="https://health-tracker-1-lidy.onrender.com/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Click_Here-2ea44f?style=for-the-badge&logo=rocket&logoColor=white" alt="Live Demo" height="35" />
  </a>

  <br><br>
  
  [![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![AI](https://img.shields.io/badge/AI-Gemini%20%26%20Groq-8E44AD?style=flat-square&logo=google-bard&logoColor=white)](https://deepmind.google/technologies/gemini/)
  [![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=black)](https://health-tracker-1-lidy.onrender.com/)

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-installation">Setup</a>
  </p>
</div>

---

## 🚀 Overview
**BioNexus** is a cutting-edge health tracking application that blends **gamification** with advanced **Artificial Intelligence**. It transforms health management into an engaging experience—scan your food for instant nutritional analysis, chat with an AI assistant that adapts to your mood, and level up your profile by completing daily health missions.



---

## ✨ Key Features

### 🍎 AI Food Vision (Powered by Gemini 1.5 Pro)
- **Instant Analysis:** Snap a photo of your meal, and the AI identifies ingredients.
- **Nutritional Breakdown:** Get precise estimates of Calories, Protein, Carbs, and Fats.
- **Health Verdict:** Receive immediate feedback on whether the meal aligns with your goals.

### 🤖 BioNexus Assistant (Powered by Groq / Llama 3)
- **Context-Aware Chat:** The AI knows your health profile (age, weight, goals) for personalized advice.
- **Mood Detection & Music:** Detects mood from your text and plays matching background music (Lofi, Workout Bass, Happy, etc.).
- **Custom Plans:** Generates 1-Day Diet & Workout protocols instantly.

### 🎮 Gamification & Missions
- **XP System:** Earn experience points for every healthy action.
- **Daily Quests:** Complete tasks like "Drink 3L Water" or "Eat a High-Protein Meal".
- **Level Up:** Climb the levels and track your progress on a visual leaderboard.

### 📊 Smart Analytics Dashboard
- Visual graphs for weekly calorie burn and performance.
- Dynamic tracking of sleep patterns and BMR estimates.

---

## 🛠 Tech Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JavaScript, Chart.js |
| **Backend** | Python, Flask (Microframework), SQLAlchemy (ORM) |
| **Database** | SQLite (Development) |
| **AI Models** | **Google Gemini 1.5 Flash** (Vision), **Llama 3-70b via Groq** (Chat) |
| **Deployment**| **Render** (Cloud Hosting) |

---

## 📂 Project Structure

A clean and organized structure for scalability:

```bash
Health-Tracker/
│
├── Backend/                 # 🧠 Core Application Logic
│   ├── instance/            # 🗄️ SQLite Database Storage
│   ├── app.py               # ⚡ Main Flask Server & API Routes
│   ├── Procfile             # ⚙️ Render Deployment Configuration
│   └── requirements.txt     # 📦 Python Dependencies List
│
├── frontend/                # 🎨 User Interface & Assets
│   ├── static/              # 📁 Static Files
│   │   ├── css/             # 🎨 Stylesheets (Modular CSS)
│   │   ├── js/              # 📜 JavaScript Logic (Frontend modules)
│   │   ├── music/           # 🎵 Mood-based Audio Tracks
│   │   └── logo.png         # 🖼️ Application Brand Logo
│   │
│   └── templates/           # 📄 HTML Templates
│       ├── components/      # 🧩 Reusable UI Parts (Sidebar, Dash, etc.)
│       └── index.html       # 🏠 Main SPA Entry Point
│
├── .gitignore               # 🙈 Git Ignore Rules
└── README.md                # 📖 Project Documentation
```
---

## ⚙️ Installation & Local Setup

Run **BioNexus** locally on your machine by following these simple steps:

### 1️⃣ Clone the Repository
Start by cloning the project to your local machine:
```bash
git clone [https://github.com/Anubhav2321/Health-Tracker-.git](https://github.com/Anubhav2321/Health-Tracker-.git)
cd Health-Tracker-
```
2️⃣ Setup Virtual Environment
Create an isolated Python environment to manage dependencies:

Bash

# Windows
python -m venv .venv
.venv\Scripts\activate

# Mac/Linux
python3 -m venv .venv
source .venv/bin/activate
3️⃣ Install Dependencies
Navigate to the backend directory and install the required libraries:

Bash

cd Backend
pip install -r requirements.txt
4️⃣ Configure API Keys
Create a .env file in the root directory and add your API keys:

Code snippet

GROQ_API_KEY=your_actual_groq_api_key
GEMINI_API_KEY=your_actual_gemini_api_key
5️⃣ Launch Application
Start the server and enjoy the app!

Bash

python app.py
🎉 Success! Access the app at http://127.0.0.1:5000

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project 🍴

Create your Feature Branch (git checkout -b feature/NewFeature) 🌿

Commit your Changes (git commit -m 'Add NewFeature') 💬

Push to the Branch (git push origin feature/NewFeature) 📤

Open a Pull Request 🚀

<div align="center">


<b>Developed with 💻 & ❤️ by Anubhav Samanta 
