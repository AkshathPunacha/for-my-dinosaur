window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 1000);
  }, 2500);
});

const counterStart = new Date('2026-01-11T11:00:00+05:30').getTime();
function updateCounter() {
  const now = Date.now();
  const diff = now - counterStart;
  if (diff < 0) return;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  const d = document.getElementById('counter-days');
  const h = document.getElementById('counter-hours');
  const m = document.getElementById('counter-mins');
  const s = document.getElementById('counter-secs');
  if (d) d.textContent = String(days).padStart(2, '0');
  if (h) h.textContent = String(hours).padStart(2, '0');
  if (m) m.textContent = String(mins).padStart(2, '0');
  if (s) s.textContent = String(secs).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

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

  setTimeout(() => {
    document.querySelector('.letter-sign').classList.add('visible');
  }, lines.length * 600 + 500);
}

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-img');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

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

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 200);
    }
  });
}, { threshold: 0.1 });
timelineItems.forEach(t => timelineObserver.observe(t));

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

const igObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      playIGReplay();
      igObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (igChat) igObserver.observe(igChat);

let ytPlayer = null;
let musicPlaying = false;
let ytReady = false;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    videoId: 'zlt38OOqwDc',
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: 'zlt38OOqwDc,2Vv-BfVoq4g,Qdz5n1Xe5Qo,450p7goxZqg,cs1e0fRyI18',
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      playsinline: 1
    },
    events: {
      onReady: function () { ytReady = true; },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.ENDED) {
          ytPlayer.playVideo();
        }
      }
    }
  });
};

const musicBtn2 = document.getElementById('music-toggle');
if (musicBtn2) {
  musicBtn2.addEventListener('click', () => {
    if (!musicPlaying) {
      if (ytReady && ytPlayer) {
        ytPlayer.playVideo();
        musicPlaying = true;
        musicBtn2.textContent = '🔊';
      }
    } else {
      if (ytPlayer) {
        ytPlayer.pauseVideo();
      }
      musicPlaying = false;
      musicBtn2.textContent = '🔇';
    }
  });
}

const yesBtn = document.getElementById('yes-btn');
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    yesBtn.classList.add('clicked');
    document.querySelector('.question-note').style.opacity = '0';

    const container = document.getElementById('heart-explosion');
    const hearts = ['💖', '💕', '❤️', '💗', '🦕', '💘', '💝', '🥰', '😍', '💞', '♥️', '🤍'];

    for (let wave = 0; wave < 3; wave++) {
      setTimeout(() => {
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'explosion-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = (20 + Math.random() * 35) + 'px';

            const tx = (Math.random() - 0.5) * 400 + 'px';
            const ty = -(100 + Math.random() * 400) + 'px';
            const rot = (Math.random() - 0.5) * 720 + 'deg';
            heart.style.setProperty('--tx', tx);
            heart.style.setProperty('--ty', ty);
            heart.style.setProperty('--rot', rot);
            heart.style.animationDuration = (1.5 + Math.random() * 2) + 's';

            container.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
          }, i * 50);
        }
      }, wave * 800);
    }

    setTimeout(() => {
      document.getElementById('post-yes').classList.add('show');
    }, 1500);
  });
}
