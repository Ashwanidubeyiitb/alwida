// Background Music Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '🔇';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
}

// Initial Card Sparkle Effect
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.querySelector('.card-decoration').appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}

// Create sparkles every 300ms
setInterval(createSparkle, 300);

// Pokemon Card Flip Effect
document.querySelectorAll('.pokemon-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        playCardSound();
    });
});

// Card Sound Effect
function playCardSound() {
    const cardSound = document.getElementById('cardSound');
    cardSound.currentTime = 0;
    cardSound.play();
}

// Who's that Pokemon Message
function showWhosThatPokemon() {
    const message = document.createElement('div');
    message.className = 'who-that-pokemon';
    message.textContent = "Who's that Pokemon?";
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Show message when cards are first loaded
window.addEventListener('load', () => {
    setTimeout(showWhosThatPokemon, 1000);
});

// Background Music Playlist
const playlist = [
    'graduation-song.mp3',
    'celebration-song.mp3',
    'memories-song.mp3'
];
let currentSongIndex = 0;

function changeSong(direction) {
    currentSongIndex = (currentSongIndex + direction + playlist.length) % playlist.length;
    bgMusic.src = playlist[currentSongIndex];
    bgMusic.play();
    isMusicPlaying = true;
    musicToggle.innerHTML = '🔊';
}

// Memory Wall Messages
const memoryMessages = [
    "Yaad hai? Woh din jab hum sab saath the...",
    "Kya mast time tha!",
    "Ab toh bas yaadein reh gayi...",
    "College life ke best moments!",
    "Miss karenge hum sab ko...",
    "Dost ban gaye, family ban gaye...",
    "Har pal yaadgar ban gaya...",
    "Kya mast memories hai!",
    "Ab toh bas photos mein dekhna hoga...",
    "College life ke best moments!"
];

function showRandomMessage() {
    const message = memoryMessages[Math.floor(Math.random() * memoryMessages.length)];
    showFloatingMessage(message);
}

// Floating Message System
function showFloatingMessage(text) {
    const message = document.createElement('div');
    message.className = 'floating-message';
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Voice Recording
let mediaRecorder;
let audioChunks = [];

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            addVoiceMessage(audioUrl);
            audioChunks = [];
        };
        
        mediaRecorder.start();
        showFloatingMessage("Recording started...");
    } catch (err) {
        console.error("Error accessing microphone:", err);
        showFloatingMessage("Could not access microphone");
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        showFloatingMessage("Recording saved!");
    }
}

function addVoiceMessage(audioUrl) {
    const voiceMessages = document.querySelector('.voice-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'voice-message';
    
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioUrl;
    
    const timestamp = document.createElement('span');
    timestamp.textContent = new Date().toLocaleTimeString();
    
    messageDiv.appendChild(audio);
    messageDiv.appendChild(timestamp);
    voiceMessages.appendChild(messageDiv);
}

// Wishes Section
function addWish() {
    const wishText = document.getElementById('wishText').value;
    if (wishText.trim()) {
        const wishes = document.querySelector('.wishes');
        const wishDiv = document.createElement('div');
        wishDiv.className = 'wish';
        
        const text = document.createElement('p');
        text.textContent = wishText;
        
        const timestamp = document.createElement('span');
        timestamp.textContent = new Date().toLocaleTimeString();
        
        wishDiv.appendChild(text);
        wishDiv.appendChild(timestamp);
        wishes.appendChild(wishDiv);
        
        document.getElementById('wishText').value = '';
        showFloatingMessage("Wish added successfully!");
        createConfetti();
    }
}

// Confetti Effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Countdown Timer
function updateCountdown() {
    const graduationDate = new Date('2024-05-15').getTime();
    const now = new Date().getTime();
    const distance = graduationDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "Graduation Day! 🎓";
        showFloatingMessage("Congratulations on your graduation! 🎉");
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add confetti CSS
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        animation: fall linear forwards;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    .countdown-item {
        display: inline-block;
        margin: 0 10px;
        font-size: 2rem;
        color: #ffd700;
    }

    .countdown-item span {
        display: block;
        font-size: 0.8rem;
        color: #fff;
    }

    .wish-timestamp {
        font-size: 0.8rem;
        color: #ffd700;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style); 