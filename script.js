// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 1000);
  }, 2500);
});

// Floating hearts background
function createFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  const hearts = ['💕', '♥', '💗', '✨', '💖', '🤍'];
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('span');
    heart.className = 'fh';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = Math.random() * 15 + 's';
    container.appendChild(heart);
  }
}
createFloatingHearts();

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.hero-img, .hero-title, .hero-subtitle, .envelope-img, .envelope-text, .timeline-item, .memory-card, .promise-card, .letter-sign, .her-img, .her-photo-text').forEach(el => {
  observer.observe(el);
});

// Typewriter effect for love letter
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTypewriter();
      letterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const letterContainer = document.getElementById('letter-body');
if (letterContainer) letterObserver.observe(letterContainer);

function startTypewriter() {
  const lines = document.querySelectorAll('#letter-body .line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('typed');
    }, i * 600);
  });
  // Show signature after all lines
  setTimeout(() => {
    document.querySelector('.letter-sign').classList.add('visible');
  }, lines.length * 600 + 500);
}

// Parallax on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-img');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});


// Staggered animation for promise cards
const promiseCards = document.querySelectorAll('.promise-card');
const promiseObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(promiseCards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 150);
    }
  });
}, { threshold: 0.1 });
promiseCards.forEach(c => promiseObserver.observe(c));

// Timeline stagger
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 200);
    }
  });
}, { threshold: 0.1 });
timelineItems.forEach(t => timelineObserver.observe(t));

// ========== INSTAGRAM DM REPLAY ==========
const igMessages = [
  { type: 'time', text: 'Feb 10, 2025 · 11:42 PM' },
  { type: 'sent', text: 'Hey trouble maker 😂' },
  { type: 'received', text: 'Hii managerr' },
  { type: 'sent', text: 'So tell me something' },
  { type: 'sent', text: 'What do you think about me? honestly' },
  { type: 'received', text: 'Hmm' },
  { type: 'received', text: 'You are good' },
  { type: 'sent', text: 'Just good?? 😂' },
  { type: 'received', text: 'Lol what else do you want to hear' },
  { type: 'sent', text: 'The truth maybe?? 😂' },
  { type: 'received', text: '🙄🙄' },
  { type: 'time', text: 'Feb 11, 2025 · 12:01 AM' },
  { type: 'received', text: 'Good night ♥️' },
  { type: 'time', text: '12:02 AM' },
  { type: 'received', text: 'I dont know if I will ever be your choice but you will always be mine. And I LOVE YOU ♥️' },
  { type: 'heart', text: '❤️' },
  { type: 'sent', text: 'You have no idea how long I waited to hear this' },
  { type: 'sent', text: 'I love you too. So so much.' },
  { type: 'sent', text: 'My beautiful dinosaur 🦕💖' },
  { type: 'received', text: 'Will be in Love with my manager forever ♥️' },
  { type: 'heart', text: '❤️' },
  { type: 'time', text: 'That night changed everything 💕' },
];

let igStarted = false;
const igChat = document.getElementById('ig-chat');

function createTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'ig-typing';
  typing.innerHTML = '<div class="ig-typing-dot"></div><div class="ig-typing-dot"></div><div class="ig-typing-dot"></div>';
  return typing;
}

function playIGReplay() {
  if (igStarted) return;
  igStarted = true;

  let delay = 0;
  igMessages.forEach((msg, i) => {
    delay += (msg.type === 'received') ? 2200 : (msg.type === 'time' ? 1000 : 1400);

    setTimeout(() => {
      // Show typing indicator for received messages
      if (msg.type === 'received') {
        const typing = createTypingIndicator();
        igChat.appendChild(typing);
        igChat.scrollTop = igChat.scrollHeight;

        setTimeout(() => {
          typing.remove();
          const el = document.createElement('div');
          el.className = 'ig-msg received';
          el.textContent = msg.text;
          igChat.appendChild(el);
          igChat.scrollTop = igChat.scrollHeight;
        }, 1200);
      } else if (msg.type === 'sent') {
        const el = document.createElement('div');
        el.className = 'ig-msg sent';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      } else if (msg.type === 'heart') {
        const el = document.createElement('div');
        el.className = 'ig-heart-react';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      } else if (msg.type === 'time') {
        const el = document.createElement('div');
        el.className = 'ig-time-label';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      }
    }, delay);
  });
}

// Trigger IG replay when scrolled into view
const igObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      playIGReplay();
      igObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (igChat) igObserver.observe(igChat);

// ========== BACKGROUND MUSIC (Web Audio API) ==========
let audioCtx = null;
let musicPlaying = false;
let musicNodes = [];

function createAmbientMusic() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.12;
  masterGain.connect(audioCtx.destination);

  // Soft romantic chord progression: Am - F - C - G
  const chords = [
    [220, 261.63, 329.63],   // Am
    [174.61, 220, 261.63],   // F
    [261.63, 329.63, 392],   // C
    [196, 246.94, 293.66],   // G
  ];

  const chordDuration = 3;
  const totalLoop = chords.length * chordDuration;

  function playChordLoop(startTime) {
    chords.forEach((chord, ci) => {
      const chordStart = startTime + ci * chordDuration;

      chord.forEach(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Soft fade in/out per note
        gain.gain.setValueAtTime(0, chordStart);
        gain.gain.linearRampToValueAtTime(0.3, chordStart + 0.8);
        gain.gain.linearRampToValueAtTime(0.15, chordStart + chordDuration * 0.7);
        gain.gain.linearRampToValueAtTime(0, chordStart + chordDuration);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(chordStart);
        osc.stop(chordStart + chordDuration);
        musicNodes.push(osc);
      });

      // Add a very soft high octave shimmer
      const shimmer = audioCtx.createOscillator();
      const shimmerGain = audioCtx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.value = chord[0] * 2;
      shimmerGain.gain.setValueAtTime(0, chordStart);
      shimmerGain.gain.linearRampToValueAtTime(0.05, chordStart + 1);
      shimmerGain.gain.linearRampToValueAtTime(0, chordStart + chordDuration);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(masterGain);
      shimmer.start(chordStart);
      shimmer.stop(chordStart + chordDuration);
      musicNodes.push(shimmer);
    });
  }

  // Schedule a few loops ahead
  const now = audioCtx.currentTime;
  for (let loop = 0; loop < 20; loop++) {
    playChordLoop(now + loop * totalLoop);
  }
}

function stopMusic() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
    musicNodes = [];
  }
}

// Update the music toggle button
const musicBtn2 = document.getElementById('music-toggle');
if (musicBtn2) {
  musicBtn2.removeEventListener('click', () => { });
  musicBtn2.addEventListener('click', () => {
    if (!musicPlaying) {
      createAmbientMusic();
      musicPlaying = true;
      musicBtn2.textContent = '🔊';
    } else {
      stopMusic();
      musicPlaying = false;
      musicBtn2.textContent = '🔇';
    }
  });
}

// YES button heart explosion
const yesBtn = document.getElementById('yes-btn');
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    yesBtn.classList.add('clicked');
    document.querySelector('.question-note').style.opacity = '0';

    const container = document.getElementById('heart-explosion');
    const hearts = ['💖', '💕', '❤️', '💗', '🦕', '💘', '💝', '🥰', '😍', '💞', '♥️', '🤍'];

    // Spawn hearts in waves
    for (let wave = 0; wave < 3; wave++) {
      setTimeout(() => {
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'explosion-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            // Random starting position across the screen
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = (20 + Math.random() * 35) + 'px';

            // Random direction
            const tx = (Math.random() - 0.5) * 400 + 'px';
            const ty = -(100 + Math.random() * 400) + 'px';
            const rot = (Math.random() - 0.5) * 720 + 'deg';
            heart.style.setProperty('--tx', tx);
            heart.style.setProperty('--ty', ty);
            heart.style.setProperty('--rot', rot);
            heart.style.animationDuration = (1.5 + Math.random() * 2) + 's';

            container.appendChild(heart);

            // Clean up after animation
            setTimeout(() => heart.remove(), 4000);
          }, i * 50);
        }
      }, wave * 800);
    }

    // Show "I knew it" after hearts
    setTimeout(() => {
      document.getElementById('post-yes').classList.add('show');
    }, 1500);
  });
}
