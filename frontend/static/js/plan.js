function openPlanGen() { document.getElementById('plan-screen').classList.remove('hidden'); document.getElementById('plan-form').classList.remove('hidden'); document.getElementById('plan-result').classList.add('hidden'); }
function closePlanGen() { document.getElementById('plan-screen').classList.add('hidden'); }
async function generatePlan() {
    const w = document.getElementById('gen-weight').value;
    const g = document.getElementById('gen-goal').value;
    const m = document.getElementById('gen-mood').value;
    document.getElementById('plan-form').classList.add('hidden');
    const resDiv = document.getElementById('plan-result'); resDiv.classList.remove('hidden');
    resDiv.innerHTML = 'Generating...';
    const res = await fetch('/generate_plan', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({weight: w, goal: g, mood: m})});
    const data = await res.json();
    resDiv.innerHTML = `<div class="plan-content">${data.plan}</div><br><button class="glow-btn" onclick="openPlanGen()">NEW</button>`;
}