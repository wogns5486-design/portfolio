/* ============================================================
   LIVSPACE — script.js
   ============================================================ */

'use strict';

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Nav: scroll state + mobile toggle ── */
(function initNav() {
  const header = $('#navHeader');
  const toggle = $('#navToggle');
  const menu   = $('#navMenu');

  // Scroll → darken nav
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    $('#backToTop').classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  $$('a', menu).forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !header.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ── Back to top ── */
$('#backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Hero Slider ── */
(function initHeroSlider() {
  const slides = $$('.hero-slide');
  const dots   = $$('.dot');
  let current  = 0;
  let timer    = null;
  const INTERVAL = 5500;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Reset animations on previous slide content
    const prevContent = slides[current].querySelector('.hero-content');
    if (prevContent) {
      $$('.hero-eyebrow, .hero-title, .hero-sub, .hero-actions', prevContent).forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = '';
      });
    }

    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  $('#heroNext').addEventListener('click', () => { next(); startTimer(); });
  $('#heroPrev').addEventListener('click', () => { prev(); startTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      startTimer();
    });
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); startTimer(); }
    if (e.key === 'ArrowLeft')  { prev(); startTimer(); }
  });

  // Touch swipe
  let touchStartX = 0;
  const heroEl = $('#hero');
  heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startTimer(); }
  }, { passive: true });

  startTimer();
})();

/* ── Stats Counter ── */
(function initStats() {
  const nums = $$('.stat-num[data-target]');
  let done = false;

  function animateCount(el) {
    const target = Number(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      nums.forEach(el => animateCount(el));
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const statsBar = $('.stats-bar');
  if (statsBar) observer.observe(statsBar);
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  // Add reveal class to key sections
  const targets = [
    '.service-card',
    '.portfolio-item',
    '.listing-card',
    '.testimonial-card',
    '.section-header',
    '.contact-info',
    '.contact-form',
    '.stat-item',
  ];
  targets.forEach((sel, groupIdx) => {
    $$(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => observer.observe(el));
})();

/* ── Portfolio Filter ── */
(function initPortfolioFilter() {
  const btns  = $$('.filter-btn');
  const items = $$('.portfolio-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.classList.remove('hidden');
          // Re-trigger reveal
          item.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => item.classList.add('visible'));
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Trigger visible on all initially
  items.forEach(item => item.classList.add('visible'));
})();

/* ── Portfolio Modal ── */
(function initPortfolioModal() {
  const modal      = $('#portfolioModal');
  const closeBtn   = $('#portfolioModalClose');
  const ctaBtn     = $('#portfolioModalCta');
  const items      = $$('.portfolio-item');

  function openModal(item) {
    $('#modalPortfolioImg').src = item.dataset.img;
    $('#modalPortfolioImg').alt = item.dataset.title;
    $('#modalPortfolioTitle').textContent = item.dataset.title;
    $('#modalPortfolioDesc').textContent  = item.dataset.desc;
    $('#modalPortfolioArea').textContent  = item.dataset.area;
    $('#modalPortfolioDuration').textContent = item.dataset.duration;
    $('#modalPortfolioBudget').textContent = item.dataset.budget;

    const tagText = item.querySelector('.portfolio-tag').textContent;
    $('#modalPortfolioTag').textContent = tagText;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  ctaBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
})();

/* ── Listing Filter ── */
(function initListingFilter() {
  const regionSel = $('#filterRegion');
  const priceSel  = $('#filterPrice');
  const sizeSel   = $('#filterSize');
  const resetBtn  = $('#filterReset');
  const cards     = $$('.listing-card');
  const emptyMsg  = $('#listingsEmpty');

  function applyFilters() {
    const region = regionSel.value;
    const price  = priceSel.value;
    const size   = sizeSel.value;
    let visible  = 0;

    cards.forEach(card => {
      const r = card.dataset.region;
      const p = Number(card.dataset.price);  // 만원 단위
      const s = Number(card.dataset.size);   // ㎡

      const matchRegion = !region || r === region;
      const matchPrice  = !price  || matchPriceRange(p, price);
      const matchSize   = !size   || matchSizeRange(s, size);

      if (matchRegion && matchPrice && matchSize) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (emptyMsg) emptyMsg.hidden = visible > 0;
  }

  function matchPriceRange(p, range) {
    if (range === 'under5')  return p < 50000;
    if (range === '5to10')   return p >= 50000 && p < 100000;
    if (range === 'over10')  return p >= 100000;
    return true;
  }

  function matchSizeRange(s, range) {
    if (range === 'under60') return s < 60;
    if (range === '60to100') return s >= 60 && s <= 100;
    if (range === 'over100') return s > 100;
    return true;
  }

  [regionSel, priceSel, sizeSel].forEach(sel => {
    sel.addEventListener('change', applyFilters);
  });

  resetBtn.addEventListener('click', () => {
    regionSel.value = '';
    priceSel.value  = '';
    sizeSel.value   = '';
    applyFilters();
  });
})();

/* ── Listing Modal ── */
(function initListingModal() {
  const modal    = $('#listingModal');
  const closeBtn = $('#listingModalClose');
  const ctaBtn   = $('#listingModalCta');
  const cards    = $$('.listing-card');

  function openModal(card) {
    $('#modalListingImg').src    = card.dataset.img;
    $('#modalListingImg').alt    = card.dataset.title;
    $('#modalListingTitle').textContent   = card.dataset.title;
    $('#modalListingDesc').textContent    = card.dataset.desc;
    $('#modalListingLoc').textContent     = card.dataset.location;
    $('#modalListingFloor').textContent   = card.dataset.floor;
    $('#modalListingYear').textContent    = card.dataset.year;
    $('#modalListingParking').textContent = card.dataset.parking;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('.listing-title').textContent + ' 상세 보기');
  });

  closeBtn.addEventListener('click', closeModal);
  ctaBtn.addEventListener('click', () => { closeModal(); });

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
})();

/* ── Contact Form ── */
(function initContactForm() {
  const form        = $('#contactForm');
  const successModal = $('#successModal');
  const successClose = $('#successClose');

  if (!form) return;

  // Validators
  function validateName(v)  { return v.trim().length >= 2; }
  function validatePhone(v) { return /^[0-9\-+\s]{8,15}$/.test(v.trim()); }
  function validateSelect(v){ return v !== ''; }

  const rules = [
    { id: 'fname',    errId: 'fnameError',    fn: validateName,   msg: '이름을 2자 이상 입력해 주세요.' },
    { id: 'fphone',   errId: 'fphoneError',   fn: validatePhone,  msg: '올바른 연락처를 입력해 주세요. (예: 010-1234-5678)' },
    { id: 'fservice', errId: 'fserviceError', fn: validateSelect, msg: '관심 서비스를 선택해 주세요.' },
  ];

  function showError(rule, msg) {
    const el = $(`#${rule.id}`);
    const err = $(`#${rule.errId}`);
    el.classList.add('error');
    err.textContent = msg;
  }
  function clearError(rule) {
    const el = $(`#${rule.id}`);
    const err = $(`#${rule.errId}`);
    el.classList.remove('error');
    err.textContent = '';
  }

  // Live validation
  rules.forEach(rule => {
    const el = $(`#${rule.id}`);
    el.addEventListener('blur', () => {
      if (!rule.fn(el.value)) showError(rule, rule.msg);
      else clearError(rule);
    });
    el.addEventListener('input', () => {
      if (rule.fn(el.value)) clearError(rule);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    rules.forEach(rule => {
      const el = $(`#${rule.id}`);
      if (!rule.fn(el.value)) {
        showError(rule, rule.msg);
        valid = false;
      } else {
        clearError(rule);
      }
    });

    if (!valid) {
      // Focus first error
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.focus();
      return;
    }

    // Save to localStorage
    const data = {
      name:      $('#fname').value.trim(),
      phone:     $('#fphone').value.trim(),
      service:   $('#fservice').value,
      budget:    $('#fbudget').value,
      message:   $('#fmessage').value.trim(),
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('livspace_consultations') || '[]');
    existing.push(data);
    localStorage.setItem('livspace_consultations', JSON.stringify(existing));

    // Show success
    form.reset();
    successModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    successClose.focus();
  });

  function closeSuccess() {
    successModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  successClose.addEventListener('click', closeSuccess);
  successModal.addEventListener('click', e => { if (e.target === successModal) closeSuccess(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !successModal.hasAttribute('hidden')) closeSuccess();
  });
})();

/* ── Smooth anchor scroll (offset for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
