let currentUser = "";

async function handleLogin() {
    const nameInput = document.getElementById('username');
    const name = nameInput ? nameInput.value.trim() : "";
    
    if(!name) return alert("Please Enter Your Name");

    // বাটন লোডিং ইফেক্ট (অপশনাল)
    const btn = document.querySelector('.glow-btn');
    if(btn) btn.innerText = "Authenticating...";

    try {
        const res = await fetch('/login', {
            method:'POST', 
            headers:{'Content-Type':'application/json'}, 
            body:JSON.stringify({name})
        });
        
        if (!res.ok) throw new Error("Server Error");

        const data = await res.json();
        currentUser = data.name;
        
        // ইউজারের ডাটা থাকলে ড্যাশবোর্ড দেখাও, না থাকলে ফর্ম দেখাও
        if(data.status === 'existing' && data.age > 0) {
            loadDashboard(data); 
        } else {
            goToForm();
        }
        
        // মুড থিম আপডেট
        if(data.mood && typeof updateTheme === "function") updateTheme(data.mood);

    } catch(e) { 
        console.error("Login Error:", e);
        alert("Login Failed. Server might be restarting.");
        if(btn) btn.innerText = "AUTHENTICATE";
    }
}

function goToForm() { 
    document.getElementById('auth-screen').classList.add('hidden'); 
    document.getElementById('form-screen').classList.remove('hidden'); 
}

function loadDashboard(data) {
    console.log("Loading Dashboard...");

    try {
        // ১. ডাটা ঠিকঠাক করা (String to Number)
        const age = parseFloat(data.age) || 25;
        const weight = parseFloat(data.weight) || 70;
        const height = parseFloat(data.height) || 175;
        const goal = data.goal || "General";

        // ২. টেক্সট বসানো (Helper function দিয়ে)
        setText('display-name', data.name);
        setText('p-name-display', data.name);
        setText('disp-age', age + " Yrs");
        setText('disp-weight', weight + " kg");
        setText('disp-height', height + " cm");
        setText('disp-goal', goal);

        // ৩. ক্যালকুলেশন (Smart Calc)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        let targetKcal = Math.floor(bmr * 1.2); 

        if(goal === "Hypertrophy") targetKcal += 500; 
        if(goal === "Weight Loss") targetKcal -= 400; 

        let targetSteps = 7000;
        if(goal === "Weight Loss") targetSteps = 10000;
        else if(goal === "Hypertrophy") targetSteps = 8000;
        
        let sleepTarget = (age < 20) ? "9h" : "8h";

        // ৪. স্ট্যাটস বসানো
        setText('val-cals', targetKcal);
        setText('val-steps', targetSteps);
        setText('val-sleep', sleepTarget);
        setText('val-bpm', 72); // ডিফল্ট

        // ৫. ছবি বসানো
        if(data.photo && typeof applyPhoto === "function") applyPhoto(data.photo);

        // ৬. সেন্সর চালু করা (নিরাপদভাবে)
        if(typeof startLiveSensors === "function") {
            startLiveSensors();
        } else {
            console.warn("dashboard.js not loaded or startLiveSensors missing");
        }

    } catch (err) {
        console.error("Dashboard Logic Error:", err);
    } finally {
        // ৭. ভুল হোক বা ঠিক হোক, স্ক্রিন সরাতেই হবে (Force Switch)
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('form-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
    }
}

// সেফ টেক্সট সেটার (কোনো আইডি না পেলেও এরর দেবে না)
function setText(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text;
}

async function launchSystem() {
    const d = {
        name: currentUser,
        age: document.getElementById('p-age').value,
        weight: document.getElementById('p-weight').value,
        height: document.getElementById('p-height').value,
        goal: document.getElementById('p-goal').value
    };
    await fetch('/update_profile', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(d)});
    loadDashboard({...d, photo:null});
}