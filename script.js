window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  setTimeout(function () {
    preloader.style.opacity = '0';
    setTimeout(function () { preloader.style.display = 'none'; }, 800);
  }, 2500);
});

var counterStart = new Date('2026-01-11T11:00:00+05:30').getTime();
function updateCounter() {
  var now = Date.now();
  var diff = now - counterStart;
  if (diff < 0) return;
  var days = Math.floor(diff / 86400000);
  var hours = Math.floor((diff % 86400000) / 3600000);
  var mins = Math.floor((diff % 3600000) / 60000);
  var secs = Math.floor((diff % 60000) / 1000);
  var d = document.getElementById('counter-days');
  var h = document.getElementById('counter-hours');
  var m = document.getElementById('counter-mins');
  var s = document.getElementById('counter-secs');
  if (d) d.textContent = String(days).padStart(2, '0');
  if (h) h.textContent = String(hours).padStart(2, '0');
  if (m) m.textContent = String(mins).padStart(2, '0');
  if (s) s.textContent = String(secs).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

(function () {
  var container = document.querySelector('.floating-hearts');
  var hearts = ['💕', '♥', '💗', '✨', '💖', '🤍'];
  for (var i = 0; i < 25; i++) {
    var heart = document.createElement('span');
    heart.className = 'fh';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = Math.random() * 15 + 's';
    container.appendChild(heart);
  }
})();

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.hero-img, .hero-title, .hero-subtitle, .envelope-img, .envelope-text, .timeline-item, .memory-card, .promise-card, .letter-sign, .her-img, .her-photo-text').forEach(function (el) {
  observer.observe(el);
});

var letterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      startTypewriter();
      letterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

var letterContainer = document.getElementById('letter-body');
if (letterContainer) letterObserver.observe(letterContainer);

function startTypewriter() {
  var lines = document.querySelectorAll('#letter-body .line');
  lines.forEach(function (line, i) {
    setTimeout(function () { line.classList.add('typed'); }, i * 600);
  });
  setTimeout(function () {
    document.querySelector('.letter-sign').classList.add('visible');
  }, lines.length * 600 + 500);
}

window.addEventListener('scroll', function () {
  var scrolled = window.pageYOffset;
  var hero = document.querySelector('.hero-img');
  if (hero) hero.style.transform = 'translateY(' + scrolled * 0.1 + 'px)';
});

var promiseCards = document.querySelectorAll('.promise-card');
var promiseObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var idx = Array.from(promiseCards).indexOf(entry.target);
      setTimeout(function () { entry.target.classList.add('visible'); }, idx * 150);
    }
  });
}, { threshold: 0.1 });
promiseCards.forEach(function (c) { promiseObserver.observe(c); });

var timelineItems = document.querySelectorAll('.timeline-item');
var timelineObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      setTimeout(function () { entry.target.classList.add('visible'); }, 200);
    }
  });
}, { threshold: 0.1 });
timelineItems.forEach(function (t) { timelineObserver.observe(t); });

var igMessages = [
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
  { type: 'time', text: 'That night changed everything 💕' }
];

var igStarted = false;
var igChat = document.getElementById('ig-chat');

function createTypingIndicator() {
  var typing = document.createElement('div');
  typing.className = 'ig-typing';
  typing.innerHTML = '<div class="ig-typing-dot"></div><div class="ig-typing-dot"></div><div class="ig-typing-dot"></div>';
  return typing;
}

function playIGReplay() {
  if (igStarted) return;
  igStarted = true;
  var delay = 0;
  igMessages.forEach(function (msg) {
    delay += (msg.type === 'received') ? 2200 : (msg.type === 'time' ? 1000 : 1400);
    setTimeout(function () {
      if (msg.type === 'received') {
        var typing = createTypingIndicator();
        igChat.appendChild(typing);
        igChat.scrollTop = igChat.scrollHeight;
        setTimeout(function () {
          typing.remove();
          var el = document.createElement('div');
          el.className = 'ig-msg received';
          el.textContent = msg.text;
          igChat.appendChild(el);
          igChat.scrollTop = igChat.scrollHeight;
        }, 1200);
      } else if (msg.type === 'sent') {
        var el = document.createElement('div');
        el.className = 'ig-msg sent';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      } else if (msg.type === 'heart') {
        var el = document.createElement('div');
        el.className = 'ig-heart-react';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      } else if (msg.type === 'time') {
        var el = document.createElement('div');
        el.className = 'ig-time-label';
        el.textContent = msg.text;
        igChat.appendChild(el);
        igChat.scrollTop = igChat.scrollHeight;
      }
    }, delay);
  });
}

var igObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      playIGReplay();
      igObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (igChat) igObserver.observe(igChat);

var ytPlayer = null;
var musicPlaying = false;
var ytReady = false;
var musicBtn = document.getElementById('music-toggle');

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: 'zlt38OOqwDc',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'zlt38OOqwDc,2Vv-BfVoq4g,Qdz5n1Xe5Qo,450p7goxZqg,cs1e0fRyI18',
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      playsinline: 1,
      enablejsapi: 1,
      origin: window.location.origin
    },
    events: {
      onReady: function (e) {
        ytReady = true;
        e.target.setVolume(50);
        e.target.playVideo();
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) {
          musicPlaying = true;
          if (musicBtn) musicBtn.textContent = '🔊';
        }
        if (e.data === YT.PlayerState.ENDED) {
          ytPlayer.playVideo();
        }
      },
      onError: function () {
        if (musicBtn) musicBtn.textContent = '🔇';
      }
    }
  });
};

var userClicked = false;
function tryPlayOnInteraction() {
  if (userClicked) return;
  userClicked = true;
  if (ytReady && ytPlayer) {
    ytPlayer.playVideo();
    musicPlaying = true;
    if (musicBtn) musicBtn.textContent = '🔊';
  }
  document.removeEventListener('click', tryPlayOnInteraction);
  document.removeEventListener('touchstart', tryPlayOnInteraction);
  document.removeEventListener('scroll', tryPlayOnInteraction);
}
document.addEventListener('click', tryPlayOnInteraction);
document.addEventListener('touchstart', tryPlayOnInteraction);
document.addEventListener('scroll', tryPlayOnInteraction);

if (musicBtn) {
  musicBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (musicPlaying) {
      ytPlayer.pauseVideo();
      musicPlaying = false;
      musicBtn.textContent = '🔇';
    } else {
      if (ytReady && ytPlayer) {
        ytPlayer.playVideo();
        musicPlaying = true;
        musicBtn.textContent = '🔊';
      }
    }
  });
}

var yesBtn = document.getElementById('yes-btn');
if (yesBtn) {
  yesBtn.addEventListener('click', function () {
    yesBtn.classList.add('clicked');
    document.querySelector('.question-note').style.opacity = '0';

    var container = document.getElementById('heart-explosion');
    var hearts = ['💖', '💕', '❤️', '💗', '🦕', '💘', '💝', '🥰', '😍', '💞', '♥️', '🤍'];

    for (var wave = 0; wave < 3; wave++) {
      (function (w) {
        setTimeout(function () {
          for (var i = 0; i < 30; i++) {
            (function (j) {
              setTimeout(function () {
                var heart = document.createElement('span');
                heart.className = 'explosion-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                heart.style.fontSize = (20 + Math.random() * 35) + 'px';
                var tx = (Math.random() - 0.5) * 400 + 'px';
                var ty = -(100 + Math.random() * 400) + 'px';
                var rot = (Math.random() - 0.5) * 720 + 'deg';
                heart.style.setProperty('--tx', tx);
                heart.style.setProperty('--ty', ty);
                heart.style.setProperty('--rot', rot);
                heart.style.animationDuration = (1.5 + Math.random() * 2) + 's';
                container.appendChild(heart);
                setTimeout(function () { heart.remove(); }, 4000);
              }, j * 50);
            })(i);
          }
        }, w * 800);
      })(wave);
    }

    setTimeout(function () {
      var postYes = document.getElementById('post-yes');
      postYes.classList.add('show');
      postYes.addEventListener('click', function () {
        postYes.classList.remove('show');
        resetYesBtn();
      });
      setTimeout(function () {
        postYes.classList.remove('show');
        resetYesBtn();
      }, 3000);
    }, 1500);
  });

  function resetYesBtn() {
    setTimeout(function () {
      yesBtn.classList.remove('clicked');
      yesBtn.style.opacity = '1';
      yesBtn.style.transform = '';
      yesBtn.style.pointerEvents = '';
      document.querySelector('.question-note').style.opacity = '1';
    }, 500);
  }
}
