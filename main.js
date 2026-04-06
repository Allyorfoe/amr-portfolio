// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startHeroAnimations();
    initECGCanvas();
  }, 1800);
});

function startHeroAnimations() {
  document.querySelectorAll('.hero-content .stat-num').forEach(el => {
    animateCounter(el, parseInt(el.dataset.target), 1600);
  });
}

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ============================================
// MOBILE NAV
// ============================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ============================================
// ECG CANVAS
// ============================================
function initECGCanvas() {
  const canvas = document.getElementById('ecgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let phase = 0;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function ecgY(x, ph) {
    const t = (x + ph) * 0.038;
    const seg = t % (2 * Math.PI);
    const normal = Math.sin(t) * 6;
    const qrs = Math.exp(-Math.pow((seg - 2.5) * 4, 2)) * 30;
    const p = Math.exp(-Math.pow((seg - 1.5) * 8, 2)) * 10;
    const tWave = Math.exp(-Math.pow((seg - 4.0) * 3, 2)) * 9;
    return canvas.height / 2 - (normal + qrs + p + tWave);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, 'rgba(74,144,226,0)');
    grad.addColorStop(0.25, 'rgba(74,144,226,0.55)');
    grad.addColorStop(0.75, 'rgba(111,183,183,0.55)');
    grad.addColorStop(1, 'rgba(111,183,183,0)');

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    for (let px = 0; px <= canvas.width; px += 2) {
      const py = ecgY(px, phase);
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    phase += 2;
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================
// INTERSECTION OBSERVER — REVEALS
// ============================================
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => revealObs.observe(el));

// Scroll counters
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target), 1400);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// PARALLAX HERO
// ============================================
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  const scrolled = window.scrollY;
  const vh = window.innerHeight;
  if (scrolled < vh) {
    heroContent.style.transform = `translateY(${scrolled * 0.18}px)`;
    heroContent.style.opacity = Math.max(0, 1 - (scrolled / vh) * 1.3);
  }
}, { passive: true });

// ============================================
// ACTIVE NAV HIGHLIGHT
// ============================================
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObs.observe(s));

// ============================================
// PROJECT CARD TILT
// ============================================
document.querySelectorAll('.project-card.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -5;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
  document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
}

function showError(inputEl, message) {
  inputEl.classList.add('error-input');
  const errorEl = document.createElement('div');
  errorEl.className = 'error-msg';
  errorEl.textContent = message;
  inputEl.parentElement.appendChild(errorEl);
}

if (form) {
  form.addEventListener('input', () => {
    formSuccess.classList.remove('show');
    clearErrors();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();
    formSuccess.classList.remove('show');

    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const emailField = document.getElementById('emailField');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    if (!fname.value.trim()) { showError(fname, "First name is required"); isValid = false; }
    if (!lname.value.trim()) { showError(lname, "Last name is required"); isValid = false; }
    
    const emailVal = emailField.value.trim();
    if (!emailVal) { 
      showError(emailField, "Email address is required"); isValid = false; 
    } else if (!validateEmail(emailVal)) {
      showError(emailField, "Please enter a valid format"); isValid = false; 
    }
    
    if (!subject.value.trim()) { showError(subject, "Subject is required"); isValid = false; }
    if (!message.value.trim()) { showError(message, "Message is required"); isValid = false; }

    if (!isValid) return;

    // PASTE_YOUR_FORMSPREE_ENDPOINT_HERE
    // Replace the string below with your actual Formspree endpoint URL
    const endpoint = 'PASTE_YOUR_FORMSPREE_ENDPOINT_HERE';

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: fname.value.trim(),
          lastName: lname.value.trim(),
          email: emailVal,
          subject: subject.value.trim(),
          message: message.value.trim()
        })
      });

      if (response.ok) {
        form.reset();
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          showError(message, data.errors.map(err => err.message).join(", "));
        } else {
          showError(message, "Oops! There was a problem submitting your form.");
        }
      }
    } catch (error) {
      showError(message, "Oops! There was a network error. Please try again later.");
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}