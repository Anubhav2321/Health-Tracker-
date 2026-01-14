document.getElementById('avatar-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const r = new FileReader(); 
        r.onload = (ev) => { 
            const imgData = ev.target.result;
            applyPhoto(imgData); 
            // Save to DB
            fetch('/update_profile', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name: currentUser, photo: imgData})
            }); 
        }; 
        r.readAsDataURL(file);
    }
});

function applyPhoto(u) { 
    const url = u.startsWith('url') ? u : `url('${u}')`; 
    
    // Small Navbar Avatar
    const smallPic = document.getElementById('profile-pic');
    if(smallPic) {
        smallPic.style.backgroundImage = url;
        smallPic.innerHTML = ''; // Remove Icon
    }

    // Large Profile Avatar
    const bigPic = document.getElementById('big-profile-pic');
    if(bigPic) { 
        bigPic.style.backgroundImage = url; 
        bigPic.innerHTML = ''; // Remove Icon inside
        bigPic.classList.add('has-image'); // Fix background
    } 
}