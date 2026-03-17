/* =====================================================
   연세밝은치과 - script.js
   ===================================================== */

'use strict';

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =====================================================
   1. NAVIGATION — scroll state + hamburger
   ===================================================== */
(function initNav() {
  const header    = $('#navHeader');
  const hamburger = $('#hamburger');
  const menu      = $('#navMenu');
  const navLinks  = $$('.nav-link');

  /* Scroll → add .scrolled class */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Hamburger toggle */
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close menu on nav link click */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Active link highlight on scroll */
  const sections = $$('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = $(`.nav-link[href="#${id}"]`);
      if (!link) return;
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* =====================================================
   2. SCROLL ANIMATIONS — IntersectionObserver
   ===================================================== */
(function initScrollAnimations() {
  const elements = $$('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* =====================================================
   3. SCROLL TO TOP BUTTON
   ===================================================== */
(function initScrollTop() {
  const btn = $('#scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================================================
   4. RESERVATION MODAL
   ===================================================== */
(function initModal() {
  const backdrop     = $('#modalBackdrop');
  const closeBtn     = $('#modalClose');
  const closeBtn2    = $('#modalClose2');
  const successClose = $('#successClose');
  const step1        = $('#modalStep1');
  const step2        = $('#modalStep2');
  const form         = $('#reserveForm');
  const summary      = $('#successSummary');

  /* Open triggers */
  const openBtns = $$('#navReserveBtn, #heroReserveBtn, #locationReserveBtn, .btn-reserve');
  openBtns.forEach(btn => btn.addEventListener('click', openModal));

  function openModal() {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      const first = form.querySelector('input, select');
      if (first) first.focus();
    }, 350);
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function resetModal() {
    showStep(1);
    form.reset();
    clearAllErrors();
  }

  closeBtn.addEventListener('click', () => { closeModal(); resetModal(); });
  closeBtn2.addEventListener('click', () => { closeModal(); resetModal(); });
  successClose.addEventListener('click', () => { closeModal(); resetModal(); });

  /* Close on backdrop click */
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) { closeModal(); resetModal(); }
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
      resetModal();
    }
  });

  /* Step management */
  function showStep(n) {
    step1.classList.toggle('hidden', n !== 1);
    step2.classList.toggle('hidden', n !== 2);
  }

  /* ── Validation ── */
  const rules = {
    patientName: {
      el: () => $('#patientName'),
      err: () => $('#nameError'),
      validate(v) {
        if (!v.trim()) return '이름을 입력해 주세요.';
        if (v.trim().length < 2) return '이름은 2글자 이상 입력해 주세요.';
        return '';
      }
    },
    patientPhone: {
      el: () => $('#patientPhone'),
      err: () => $('#phoneError'),
      validate(v) {
        if (!v.trim()) return '연락처를 입력해 주세요.';
        const cleaned = v.replace(/\D/g, '');
        if (cleaned.length < 10 || cleaned.length > 11) return '올바른 연락처를 입력해 주세요. (예: 010-1234-5678)';
        return '';
      }
    },
    patientService: {
      el: () => $('#patientService'),
      err: () => $('#serviceError'),
      validate(v) {
        if (!v) return '진료과목을 선택해 주세요.';
        return '';
      }
    },
    patientDate: {
      el: () => $('#patientDate'),
      err: () => $('#dateError'),
      validate(v) {
        if (!v) return '희망 날짜를 선택해 주세요.';
        const chosen = new Date(v);
        const today  = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) return '오늘 이후 날짜를 선택해 주세요.';
        const day = chosen.getDay();
        if (day === 0) return '일요일은 휴진입니다.';
        return '';
      }
    },
    patientTime: {
      el: () => $('#patientTime'),
      err: () => $('#timeError'),
      validate(v) {
        if (!v) return '희망 시간을 선택해 주세요.';
        const dateVal = $('#patientDate').value;
        if (dateVal) {
          const chosen = new Date(dateVal);
          const day = chosen.getDay();
          if (day === 6) {
            // Saturday: operating hours 09:00–14:00 only
            const [h, m] = v.split(':').map(Number);
            const minutes = h * 60 + m;
            if (minutes >= 14 * 60) return '토요일은 14:00 이후 진료가 없습니다. (토요일 진료: 09:00–14:00)';
          }
        }
        return '';
      }
    }
  };

  /* Set min date on date input */
  const dateInput = $('#patientDate');
  if (dateInput) {
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  /* Auto-format phone number */
  $('#patientPhone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length <= 3) {
      this.value = v;
    } else if (v.length <= 7) {
      this.value = `${v.slice(0,3)}-${v.slice(3)}`;
    } else {
      this.value = `${v.slice(0,3)}-${v.slice(3,7)}-${v.slice(7)}`;
    }
  });

  function setError(key, msg) {
    const el  = rules[key].el();
    const err = rules[key].err();
    if (msg) {
      el.classList.add('error');
      err.textContent = msg;
    } else {
      el.classList.remove('error');
      err.textContent = '';
    }
  }

  function clearAllErrors() {
    Object.keys(rules).forEach(k => setError(k, ''));
  }

  /* Inline validation on blur */
  Object.keys(rules).forEach(key => {
    const el = rules[key].el();
    if (!el) return;
    el.addEventListener('blur', () => {
      const msg = rules[key].validate(el.value);
      setError(key, msg);
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const msg = rules[key].validate(el.value);
        setError(key, msg);
      }
    });
  });

  /* ── Form Submit ── */
  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    Object.keys(rules).forEach(key => {
      const el  = rules[key].el();
      const msg = rules[key].validate(el.value);
      setError(key, msg);
      if (msg) valid = false;
    });

    if (!valid) {
      /* Scroll to first error */
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* Collect data */
    const data = {
      name:    $('#patientName').value.trim(),
      phone:   $('#patientPhone').value.trim(),
      service: $('#patientService').value,
      date:    $('#patientDate').value,
      time:    $('#patientTime').value,
      memo:    $('#patientMemo').value.trim(),
      createdAt: new Date().toISOString()
    };

    /* Save to localStorage */
    saveReservation(data);

    /* Show success */
    const dateLabel = formatDate(data.date);
    summary.innerHTML = `
      <strong>예약자명:</strong> ${escHtml(data.name)}<br>
      <strong>연락처:</strong> ${escHtml(data.phone)}<br>
      <strong>진료과목:</strong> ${escHtml(data.service)}<br>
      <strong>희망일시:</strong> ${dateLabel} ${data.time}
    `;
    showStep(2);
  });

  /* ── localStorage ── */
  function saveReservation(data) {
    try {
      const key  = 'yonseiDentalReservations';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      list.push(data);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (err) {
      /* Silently fail if storage unavailable */
    }
  }

  /* ── Helpers ── */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d   = new Date(dateStr);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();

/* =====================================================
   5. SMOOTH ANCHOR SCROLL (offset for fixed nav)
   ===================================================== */
(function initAnchorScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* =====================================================
   6. HERO PARALLAX (subtle)
   ===================================================== */
(function initParallax() {
  const heroImg = $('.hero-img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroImg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
