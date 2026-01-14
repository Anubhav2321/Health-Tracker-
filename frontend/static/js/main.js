let currentUser = "";
function switchView(id, el) {
    ['view-home','view-analytics','view-settings','view-profile'].forEach(v=>document.getElementById(v).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
}
function updateTheme(mood) {
    let color = '#00f260';
    if(mood === 'Calm') color = '#00c6ff'; else if(mood === 'Stressed') color = '#ff5e62'; else if(mood === 'Tired') color = '#f7b733';
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--neon-glow', `0 0 10px ${color}, 0 0 20px ${color}`);
    const st = document.getElementById('mood-status'); if(st) { st.innerText=mood; st.style.color=color; }
}