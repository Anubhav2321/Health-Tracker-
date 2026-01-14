// --- DASHBOARD SENSORS & ANIMATIONS ---

let sensorInterval = null; 

// এই ফাংশনটি auth.js থেকে কল করা হয়
function startLiveSensors() {
    console.log("Sensors Starting...");
    
    // যদি আগে কোনো সেন্সর চলতে থাকে, সেটা বন্ধ করো
    if (sensorInterval) clearInterval(sensorInterval);

    // প্রথমবার ভ্যালু আপডেট করো
    updateBPM();

    // প্রতি ২ সেকেন্ড পর পর আপডেট করো
    sensorInterval = setInterval(updateBPM, 2000);
    
    // চার্ট এনিমেশন চালু করো
    triggerChartAnimation();
}

function updateBPM() {
    const bpmElement = document.getElementById('val-bpm');
    if (bpmElement) {
        // ৬৮ থেকে ৮৫ এর মধ্যে র‍্যান্ডম সংখ্যা
        const randomBPM = Math.floor(Math.random() * (85 - 68) + 68);
        bpmElement.innerText = randomBPM;
        
        // হার্টবিট ইফেক্ট (Text Shadow)
        bpmElement.style.textShadow = "0 0 15px #ff5e62";
        setTimeout(() => {
            bpmElement.style.textShadow = "none";
        }, 500);
    }
}

function triggerChartAnimation() {
    // একটু দেরি করে অ্যানিমেশন শুরু হবে যাতে লোড হওয়ার সময় পায়
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const height = bar.getAttribute('data-height');
            if(height) {
                bar.style.height = height;
            }
        });
    }, 500);
}