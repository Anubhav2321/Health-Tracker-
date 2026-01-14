function openChat() { document.getElementById('chat-screen').classList.remove('hidden'); }
function closeChat() { document.getElementById('chat-screen').classList.add('hidden'); }
function handleEnter(e) { if(e.key === 'Enter') sendMessage(); }
async function sendMessage(txt) {
    if(!txt) txt = document.getElementById('user-input').value;
    if(!txt) return;
    document.getElementById('chat-box').innerHTML += `<div class="msg user">${txt}</div>`;
    document.getElementById('user-input').value = '';
    const res = await fetch('/ask_ai', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message:txt, username:currentUser})});
    const data = await res.json();
    document.getElementById('chat-box').innerHTML += `<div class="msg bot">${data.reply}</div>`;
    if(data.mood && data.mood !== "Neutral") updateTheme(data.mood);
    responsiveVoice.speak(data.reply);
}