document.addEventListener('DOMContentLoaded', () => {
    // 1. VARIABLEN DEFINIEREN
    const box = document.querySelector('.vault-box');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-msg');

    const SECRET = "#MONEY"; 
    const REDIRECT_URL = "vault/vault.html"; 

    // 2. DIE VALIDIERUNGS-FUNKTION (UNLOCK)
    function validate() {
        const inputCode = passwordInput.value.trim().toUpperCase();
        
        if (inputCode === SECRET) {
            // Erfolg
            submitBtn.innerHTML = "GRANTED";
            submitBtn.style.background = "#00ff41";
            if(errorMsg) errorMsg.style.display = 'none';
            
            setTimeout(() => {
                window.location.href = REDIRECT_URL;
            }, 600);
        } else {
            // Fehler
            if(errorMsg) {
                errorMsg.style.display = 'block';
                setTimeout(() => { errorMsg.style.display = 'none'; }, 2000);
            }
            
            passwordInput.value = "";
            // Shake Effekt
            box.animate([
                { transform: 'translate(-50%, -50%) translateX(0px)' },
                { transform: 'translate(-50%, -50%) translateX(-10px)' },
                { transform: 'translate(-50%, -50%) translateX(10px)' },
                { transform: 'translate(-50%, -50%) translateX(0px)' }
            ], { duration: 300 });
        }
    }

    // 3. EVENTS FÜR BUTTON UND ENTER-TASTE
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            validate();
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                validate();
            }
        });
        // Fehler ausblenden beim Tippen
        passwordInput.addEventListener('input', () => {
            if(errorMsg) errorMsg.style.display = 'none';
        });
    }

    // 4. DER 3D-TILT EFFEKT (NUR BEI MAUS ÜBER BOX)
    box.addEventListener('mousemove', (e) => {
        const boxRect = box.getBoundingClientRect();
        
        // Mausposition relativ zur Box
        const x = e.clientX - boxRect.left;
        const y = e.clientY - boxRect.top;
        
        // Zentrum der Box
        const centerX = boxRect.width / 2;
        const centerY = boxRect.height / 2;
        
        // Rotation berechnen (geteilt durch 10 für die Stärke)
        const rotateX = (centerY - y) / 10; 
        const rotateY = (x - centerX) / 10;
        
        box.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Zurücksetzen wenn Maus die Box verlässt
    box.addEventListener('mouseleave', () => {
        box.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});