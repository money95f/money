document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Playlist Konfiguration
    const playlist = [
        { 
            title: "Body", 
            artist: "Don Toliver", 
            src: "assets/songs/body.mp3", 
            cover: "assets/pictures/body.jpg" 
        },
        { 
            title: "In & Out", 
            artist: "Rich Amiri", 
            src: "assets/songs/inout.mp3", 
            cover: "assets/pictures/inout.jpg" 
        },
        { 
            title: "K-Pop", 
            artist: "Playboi Carti", 
            src: "assets/songs/kpop.mp3", 
            cover: "assets/pictures/kpop.jpg" 
        },
        { 
            title: "PB&J", 
            artist: "HXG ft. Ken Car$on", 
            src: "assets/songs/pbj.mp3", 
            cover: "assets/pictures/pb_j.jpg" 
        },
        { 
            title: "SS", 
            artist: "Ken Car$on", 
            src: "assets/songs/ss.mp3", 
            cover: "assets/pictures/ss.jpg" 
        },
    ];

    const audio = new Audio();
    let currentSongIndex = 0;
    let isMuted = false;

    // 2. View Counter (Realistisch & klein)
    let views = localStorage.getItem('site_views_final') || Math.floor(Math.random() * 15) + 5;
    views = parseInt(views) + 1;
    localStorage.setItem('site_views_final', views);
    document.getElementById('view-count').innerText = views;

    // Element-Referenzen
    const volBox = document.getElementById('volume-box');
    const volIcon = document.getElementById('volume-icon');
    const volSlider = document.getElementById('volume-slider');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const coverImg = document.querySelector('.album-cover');

    // 3. Enter Screen & Start
    document.getElementById('enter-screen').addEventListener('click', () => {
        document.getElementById('enter-screen').style.display = 'none';
        
        const video = document.getElementById('bg-video');
        video.style.display = 'block';
        video.play();

        // UI einblenden
        document.querySelectorAll('.hidden-ui').forEach(el => el.classList.add('show-ui'));
        
        // Zufälligen ersten Song laden
        loadSong(Math.floor(Math.random() * playlist.length));
        audio.play();
        playPauseBtn.className = 'fa-solid fa-pause';
        
        startMoneyRain();
        createSparkles();
    });

    // 4. Volume & Mute Logik
    volIcon.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        
        if (isMuted) {
            volIcon.className = 'fa-solid fa-volume-xmark';
            volSlider.style.setProperty('--value', '0%');
        } else {
            volIcon.className = 'fa-solid fa-volume-high';
            volSlider.style.setProperty('--value', (audio.volume * 100) + '%');
        }
    });

    // Hält die Box offen, während man den unsichtbaren Punkt zieht
    volSlider.addEventListener('mousedown', () => volBox.classList.add('active'));
    window.addEventListener('mouseup', () => volBox.classList.remove('active'));

    volSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        audio.volume = val / 100;
        audio.muted = false;
        isMuted = false;
        volSlider.style.setProperty('--value', val + '%');
        volIcon.className = val == 0 ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    });

    // 5. Audio Funktionen (Inkl. Cover-Wechsel)
    function loadSong(index) {
        currentSongIndex = index;
        const song = playlist[index];
        
        audio.src = song.src;
        document.getElementById('title').innerText = song.title;
        document.getElementById('artist').innerText = song.artist;
        coverImg.src = song.cover; // Hier wird das Cover gewechselt
        
        // Progress Bar zurücksetzen
        progressBar.value = 0;
    }

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.className = 'fa-solid fa-pause';
        } else {
            audio.pause();
            playPauseBtn.className = 'fa-solid fa-play';
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.className = 'fa-solid fa-pause';
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.className = 'fa-solid fa-pause';
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent || 0;
    });

    progressBar.addEventListener('input', (e) => {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    // 6. Effekte (Sparkles & Money)
    function createSparkles() {
        const container = document.getElementById('sparkle-container');
        setInterval(() => {
            const s = document.createElement('div');
            s.className = 'sparkle';
            const x = (Math.random() - 0.5) * 350;
            const y = (Math.random() - 0.5) * 150;
            s.style.setProperty('--x', `${x}px`);
            s.style.setProperty('--y', `${y}px`);
            s.style.left = '50%';
            s.style.top = '50%';
            container.appendChild(s);
            setTimeout(() => s.remove(), 2500);
        }, 50); // Hohe Frequenz
    }

    function startMoneyRain() {
        setInterval(() => {
            const m = document.createElement('img');
            m.src = 'assets/pictures/money.png';
            m.className = 'money-icon';
            m.style.left = Math.random() * 100 + 'vw';
            const dur = Math.random() * 2 + 2;
            m.style.animationDuration = dur + 's';
            document.getElementById('money-rain-container').appendChild(m);
            setTimeout(() => m.remove(), 4000);
        }, 300);
    }
});

let tabTitle = "@money.0_   "; 
let titleIndex = 0;
let isTabDeleting = false;
let tabTimeout;

function animateTabTitle() {
    clearTimeout(tabTimeout);

    const currentTitle = tabTitle.substring(0, titleIndex);
    document.title = currentTitle;

    let nextStepDelay;

    if (!isTabDeleting && titleIndex < tabTitle.length) {
        // --- TIPPEN ---
        titleIndex++;
        nextStepDelay = 350; 
    } else if (isTabDeleting && titleIndex > 0) {
        // --- LÖSCHEN ---
        titleIndex--;
        nextStepDelay = 300; 
    } else {
        // --- PAUSEN ---
        isTabDeleting = !isTabDeleting;
        // Jetzt nur noch 2 Sekunden warten, wenn der Titel voll ist
        // Und 1 Sekunde warten, wenn er leer ist
        nextStepDelay = isTabDeleting ? 2000 : 1000; 
    }

    tabTimeout = setTimeout(animateTabTitle, nextStepDelay);
}

if (!window.tabAnimationStarted) {
    window.tabAnimationStarted = true;
    animateTabTitle();
}

// Variable am Anfang deines Scripts definieren
let canRain = false;

// In deinem bestehenden Enter-Screen Click-Event
document.getElementById('enter-screen').addEventListener('click', () => {
    // ... dein restlicher Code (Video play, UI show etc.) ...
    canRain = true; // Erst jetzt wird der Cursor-Effekt freigeschaltet
});

// Der Mousemove-Event-Handler
document.addEventListener('mousemove', (e) => {
    // Wenn wir noch im Startbildschirm sind, machen wir nichts
    if (!canRain) return;

    // Erstelle nur bei jeder ~6. Bewegung ein Bild, damit es nicht laggt
    if (Math.random() > 0.75) return; 

    const money = document.createElement('img');
    money.src = 'assets/pictures/money.png';
    money.className = 'cursor-money';
    
    // Zufälliger Drift (Links/Rechts Bewegung beim Fallen)
    const drift = (Math.random() - 0.5) * 150;
    money.style.setProperty('--drift', `${drift}px`);
    
    // Position direkt am Cursor
    money.style.left = e.pageX + 'px';
    money.style.top = e.pageY + 'px';

    // Zufällige Größe
    const size = Math.random() * 15 + 15;
    money.style.width = size + 'px';

    document.body.appendChild(money);

    // Nach der Animation entfernen
    setTimeout(() => {
        money.remove();
    }, 1500);
});
