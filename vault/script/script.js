document.addEventListener('DOMContentLoaded', () => {
    // Funktion zum Abrufen der IP
    function fetchIP() {
        const ipDisplay = document.getElementById('ip-display');
        
        // Wir nutzen die kostenlose ipify API
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ipDisplay.textContent = `IP: ${data.ip}`;
                ipDisplay.style.color = "var(--accent)"; // Falls du die Variable im CSS hast
            })
            .catch(error => {
                ipDisplay.textContent = "IP: ENCRYPTED";
                console.error('Fehler beim Abrufen der IP:', error);
            });
    }

    fetchIP();
    
    // ... dein restlicher Code (z.B. Karten-Animationen)
    const ipSpan = document.getElementById('ip-display');

ipSpan.addEventListener('mouseover', () => {
    ipSpan.style.opacity = "0.5";
    setTimeout(() => { ipSpan.style.opacity = "1"; }, 50);
    setTimeout(() => { ipSpan.style.opacity = "0.7"; }, 100);
    setTimeout(() => { ipSpan.style.opacity = "1"; }, 150);
});
document.querySelectorAll('.mini-card').forEach((card, i) => {
    card.style.opacity = '0';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease-out';
        card.style.opacity = '1';
    }, i * 100);
});

// Diese Funktion muss ganz oben oder außerhalb von anderen Funktionen stehen!
window.copyCode = function() {
    const codeElement = document.getElementById("target-code");
    const hint = document.getElementById("copy-hint");
    const codeText = codeElement.innerText;

    navigator.clipboard.writeText(codeText).then(() => {
        hint.innerText = " ";
        hint.style.color = "#00ff41";
        
        setTimeout(() => {
            hint.innerText = " ";
            hint.style.color = "#666";
        }, 2000);
    }).catch(err => {
        console.error("Fehler:", err);
    });
};


});
