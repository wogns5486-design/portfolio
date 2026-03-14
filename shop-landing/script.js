/* =============================================
   MAISON — Fashion Brand Landing Page Scripts
   ============================================= */

'use strict';

/* ---------- Helpers ---------- */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =============================================
   NAV: scroll shadow + hamburger + search
   ============================================= */
(function initNav() {
  const nav       = qs('.nav');
  const hamburger = qs('.nav__hamburger');
  const drawer    = qs('.nav__drawer');
  const searchBtn = qs('.search-btn');
  const searchOverlay = qs('.search-overlay');
  const searchClose   = qs('.search-close');
  const searchInput   = qs('.search-input');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close drawer on link click
  qsa('.nav__drawer a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Search overlay
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
  });

  const closeSearch = () => {
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
  };

  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });
})();

/* =============================================
   SCROLL TO TOP
   ============================================= */
const scrollTopBtn = qs('.scroll-top');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   HERO SLIDER
   ============================================= */
(function initSlider() {
  const slider    = qs('.slider');
  const slides    = qsa('.slide');
  const dots      = qsa('.slider-dot');
  const prevBtn   = qs('.slider-arrow.prev');
  const nextBtn   = qs('.slider-arrow.next');
  let current     = 0;
  let autoTimer   = null;
  const DURATION  = 5000;

  const goTo = (idx) => {
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dots[current].classList.add('active');
    slides[current].removeAttribute('aria-hidden');
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(next, DURATION);
  };
  const stopAuto = () => clearInterval(autoTimer);

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));
  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Touch/swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Init
  goTo(0);
  startAuto();
})();

/* =============================================
   WISHLIST TOGGLE (UI-only)
   ============================================= */
qsa('.product-card__wish, .best-card__wish').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const svg = btn.querySelector('svg');
    const active = btn.dataset.active === 'true';
    btn.dataset.active = !active;
    svg.style.fill   = active ? 'none'      : '#C8001E';
    svg.style.stroke = active ? 'currentColor' : '#C8001E';
  });
});

/* =============================================
   ADD TO CART (UI-only toast)
   ============================================= */
(function initCart() {
  let cartCount = 0;
  const badge   = qs('.cart-badge');

  const showToast = (name) => {
    const existing = qs('.cart-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>장바구니에 담겼습니다</span>
    `;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: '#111',
      color: '#fff',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.82rem',
      fontFamily: "'Noto Sans KR', sans-serif",
      fontWeight: '400',
      zIndex: '2000',
      opacity: '0',
      transition: 'opacity 0.3s, transform 0.3s',
      whiteSpace: 'nowrap',
    });
    toast.querySelector('svg').style.cssText = 'width:16px;height:16px;flex-shrink:0;';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  document.addEventListener('click', e => {
    const cartBtn = e.target.closest('.product-card__cart, .best-card__cart');
    if (!cartBtn) return;
    cartCount++;
    badge.textContent = cartCount;
    const name = cartBtn.closest('[data-name]')?.dataset.name || '상품';
    showToast(name);
  });
})();

/* =============================================
   INTERSECTION OBSERVER — fade-in sections
   ============================================= */
(function initFadeIn() {
  const targets = qsa('.section-category, .section-arrivals, .section-best, .section-promo, .section-story');
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => io.observe(el));
})();

/* =============================================
   PRODUCT CARD stagger animation
   ============================================= */
(function initCardStagger() {
  const cards = qsa('.product-card, .best-card, .category-card');
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => io.observe(card));
})();
