// ===== Navigation Scroll =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== Pricing Toggle =====
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');
let isYearly = false;

pricingToggle.addEventListener('click', () => {
  isYearly = !isYearly;
  pricingToggle.classList.toggle('yearly', isYearly);
  monthlyLabel.classList.toggle('active', !isYearly);
  yearlyLabel.classList.toggle('active', isYearly);

  document.querySelectorAll('.price-amount').forEach(el => {
    const monthly = el.dataset.monthly;
    const yearly = el.dataset.yearly;
    if (monthly === undefined || yearly === undefined) return;
    const price = isYearly ? yearly : monthly;
    el.textContent = Number(price) === 0 ? '₩0' : '₩' + Number(price).toLocaleString();
  });
});

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString() + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString() + '+';
      }
    }
    requestAnimationFrame(update);
  });
}

// ===== Scroll Fade Animations =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

const fadeSelectors = [
  '.section-header', '.feature-card', '.step', '.step-connector',
  '.pricing-card', '.testimonial-card', '.faq-item', '.cta-content',
  '.hero-badge', '.hero-title', '.hero-desc', '.hero-actions', '.hero-preview', '.logos'
];

document.querySelectorAll(fadeSelectors.join(', ')).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

setupScrollAnimations();

// ===== Modal System =====
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modal));
});

// ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

// ===== Auth: localStorage helpers =====
function getUsers() {
  return JSON.parse(localStorage.getItem('flowdesk_users') || '[]');
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('flowdesk_users', JSON.stringify(users));
}

function findUser(email) {
  return getUsers().find(u => u.email === email);
}

function setCurrentUser(user) {
  localStorage.setItem('flowdesk_current', JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('flowdesk_current') || 'null');
}

function updateNavForUser(user) {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;
  navActions.innerHTML = `
    <div class="nav-user">
      <div class="nav-user-avatar">${user.name.charAt(0).toUpperCase()}</div>
      <span>${user.name}님</span>
    </div>
    <a href="#" class="nav-cta" id="navLogoutBtn">로그아웃</a>
  `;
  document.getElementById('navLogoutBtn').addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('flowdesk_current');
    location.reload();
  });
}

// On page load, restore logged-in user
const currentUser = getCurrentUser();
if (currentUser) updateNavForUser(currentUser);

// ===== Open modals from nav/hero buttons =====
function attachSignupTrigger(el) {
  if (!el) return;
  el.addEventListener('click', e => {
    e.preventDefault();
    // Reset form state
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('signupSuccess').classList.remove('show');
    document.querySelector('#signupModal .modal-switch').classList.remove('hidden');
    document.getElementById('signupForm').reset();
    clearErrors('signupForm');
    openModal('signupModal');
  });
}

attachSignupTrigger(document.getElementById('navCta'));
attachSignupTrigger(document.getElementById('heroSignupBtn'));
attachSignupTrigger(document.getElementById('ctaSignupBtn'));
attachSignupTrigger(document.getElementById('starterBtn'));
attachSignupTrigger(document.getElementById('proBtn'));

const navLogin = document.getElementById('navLogin');
if (navLogin) {
  navLogin.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginSuccess').classList.remove('show');
    document.querySelector('#loginModal .modal-switch').classList.remove('hidden');
    document.getElementById('loginForm').reset();
    clearErrors('loginForm');
    openModal('loginModal');
  });
}

const heroDemoBtn = document.getElementById('heroDemoBtn');
if (heroDemoBtn) {
  heroDemoBtn.addEventListener('click', e => {
    e.preventDefault();
    openModal('demoModal');
  });
}

const demoSignupBtn = document.getElementById('demoSignupBtn');
if (demoSignupBtn) {
  demoSignupBtn.addEventListener('click', e => {
    e.preventDefault();
    closeModal('demoModal');
    setTimeout(() => openModal('signupModal'), 200);
  });
}

// Switch between modals
document.getElementById('switchToLogin').addEventListener('click', e => {
  e.preventDefault();
  closeModal('signupModal');
  setTimeout(() => openModal('loginModal'), 200);
});

document.getElementById('switchToSignup').addEventListener('click', e => {
  e.preventDefault();
  closeModal('loginModal');
  setTimeout(() => openModal('signupModal'), 200);
});

// ===== Validation helpers =====
function clearErrors(formId) {
  document.querySelectorAll(`#${formId} .form-error`).forEach(el => el.textContent = '');
  document.querySelectorAll(`#${formId} input`).forEach(el => el.classList.remove('error'));
}

function showError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.textContent = msg;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Signup Form =====
document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  clearErrors('signupForm');

  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  let valid = true;

  if (!name) {
    showError('signupName', 'signupNameError', '이름을 입력해 주세요.');
    valid = false;
  }
  if (!email || !validateEmail(email)) {
    showError('signupEmail', 'signupEmailError', '올바른 이메일을 입력해 주세요.');
    valid = false;
  } else if (findUser(email)) {
    showError('signupEmail', 'signupEmailError', '이미 가입된 이메일입니다.');
    valid = false;
  }
  if (password.length < 8) {
    showError('signupPassword', 'signupPasswordError', '비밀번호는 8자 이상이어야 합니다.');
    valid = false;
  }
  if (!valid) return;

  const user = { name, email, password };
  saveUser(user);
  setCurrentUser(user);

  // Show success
  document.getElementById('signupForm').classList.add('hidden');
  document.querySelector('#signupModal .modal-switch').classList.add('hidden');
  document.getElementById('signupSuccessMsg').textContent = `${name}님, 환영합니다! 14일 무료 체험이 시작되었습니다.`;
  document.getElementById('signupSuccess').classList.add('show');
  updateNavForUser(user);
});

document.getElementById('signupSuccessClose').addEventListener('click', () => {
  closeModal('signupModal');
});

// ===== Login Form =====
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  clearErrors('loginForm');

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  let valid = true;

  if (!email || !validateEmail(email)) {
    showError('loginEmail', 'loginEmailError', '올바른 이메일을 입력해 주세요.');
    valid = false;
  }
  if (!password) {
    showError('loginPassword', 'loginPasswordError', '비밀번호를 입력해 주세요.');
    valid = false;
  }
  if (!valid) return;

  const user = findUser(email);
  if (!user || user.password !== password) {
    showError('loginEmail', 'loginEmailError', '이메일 또는 비밀번호가 올바르지 않습니다.');
    showError('loginPassword', 'loginPasswordError', ' ');
    return;
  }

  setCurrentUser(user);
  document.getElementById('loginForm').classList.add('hidden');
  document.querySelector('#loginModal .modal-switch').classList.add('hidden');
  document.getElementById('loginWelcomeMsg').textContent = `${user.name}님, 반갑습니다! 👋`;
  document.getElementById('loginSuccess').classList.add('show');
  updateNavForUser(user);
});

document.getElementById('loginSuccessClose').addEventListener('click', () => {
  closeModal('loginModal');
});
