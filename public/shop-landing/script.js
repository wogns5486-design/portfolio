/* =============================================
   MAISON — Fashion Brand Landing Page Scripts
   ============================================= */

'use strict';

/* ---------- Helpers ---------- */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------- localStorage helpers ---------- */
const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch { /* storage full or blocked */ }
  },
};

/* ---------- Price formatter ---------- */
const fmtPrice = (n) => Number(n).toLocaleString('ko-KR') + '원';

/* ---------- Product data from DOM ---------- */
const getAllProducts = () =>
  qsa('[data-id]').map(el => ({
    id:            el.dataset.id,
    name:          el.dataset.name,
    price:         Number(el.dataset.price),
    originalPrice: el.dataset.originalPrice ? Number(el.dataset.originalPrice) : null,
    badge:         el.dataset.badge || '',
    img:           el.dataset.img,
    desc:          el.dataset.desc || '',
    colors:        el.dataset.colors ? el.dataset.colors.split(',') : ['#111'],
  }));

/* =============================================
   SCROLL TO TOP
   ============================================= */
const scrollTopBtn = qs('.scroll-top');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   NAV: scroll shadow + hamburger + search
   ============================================= */
(function initNav() {
  const nav       = qs('.nav');
  const hamburger = qs('.nav__hamburger');
  const drawer    = qs('.nav__drawer');

  // Scroll shadow + scroll-top btn
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
})();

/* =============================================
   HERO SLIDER
   ============================================= */
(function initSlider() {
  const slider   = qs('.slider');
  const slides   = qsa('.slide');
  const dots     = qsa('.slider-dot');
  const prevBtn  = qs('.slider-arrow.prev');
  const nextBtn  = qs('.slider-arrow.next');
  let current    = 0;
  let autoTimer  = null;
  const DURATION = 5000;

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

  const startAuto = () => { stopAuto(); autoTimer = setInterval(next, DURATION); };
  const stopAuto  = () => clearInterval(autoTimer);

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));
  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
})();

/* =============================================
   TOAST
   ============================================= */
function showToast(msg, type = 'cart') {
  const existing = qs('.maison-toast');
  if (existing) existing.remove();

  const icon = type === 'wish'
    ? `<svg viewBox="0 0 24 24" fill="#C8001E" stroke="#C8001E" stroke-width="1.5" style="width:16px;height:16px;flex-shrink:0"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>`;

  const toast = document.createElement('div');
  toast.className = 'maison-toast';
  toast.innerHTML = `${icon}<span>${msg}</span>`;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%) translateY(16px)',
    background: '#111',
    color: '#fff',
    padding: '11px 20px',
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
    pointerEvents: 'none',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

/* =============================================
   CART — localStorage + Panel
   ============================================= */
const Cart = (() => {
  const KEY = 'maison_cart';

  const get  = ()           => storage.get(KEY);
  const save = (items)      => storage.set(KEY, items);

  const add = (product, size, color, qty = 1) => {
    const items = get();
    const itemKey = `${product.id}__${size}__${color}`;
    const existing = items.find(i => i.key === itemKey);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ key: itemKey, ...product, size, color, qty });
    }
    save(items);
    updateBadge();
    renderPanel();
  };

  const remove = (itemKey) => {
    save(get().filter(i => i.key !== itemKey));
    updateBadge();
    renderPanel();
  };

  const changeQty = (itemKey, delta) => {
    const items = get();
    const item = items.find(i => i.key === itemKey);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    save(items);
    updateBadge();
    renderPanel();
  };

  const clear = () => { save([]); updateBadge(); renderPanel(); };

  const total = () => get().reduce((sum, i) => sum + i.price * i.qty, 0);

  const count = () => get().reduce((sum, i) => sum + i.qty, 0);

  const updateBadge = () => {
    const n = count();
    const badge = qs('.cart-badge');
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  };

  const renderPanel = () => {
    const items    = get();
    const list     = qs('.cart-items');
    const empty    = qs('.cart-empty');
    const totalEl  = qs('.cart-total');

    list.innerHTML = '';

    if (items.length === 0) {
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.dataset.key = item.key;
        li.innerHTML = `
          <img class="cart-item__img" src="${item.img}" alt="${item.name}" />
          <div class="cart-item__info">
            <p class="cart-item__name">${item.name}</p>
            <p class="cart-item__meta">${item.size} / <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;margin-right:2px;border:1px solid rgba(0,0,0,0.1)"></span></p>
            <p class="cart-item__price">${fmtPrice(item.price * item.qty)}</p>
            <div class="cart-item__qty">
              <button class="cart-item__qty-btn" data-action="minus" aria-label="수량 줄이기">−</button>
              <span class="cart-item__qty-num">${item.qty}</span>
              <button class="cart-item__qty-btn" data-action="plus" aria-label="수량 늘리기">+</button>
            </div>
          </div>
          <button class="cart-item__del" aria-label="삭제">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        `;
        list.appendChild(li);
      });
    }

    totalEl.textContent = fmtPrice(total());
  };

  // Panel open/close
  const panel   = qs('.cart-panel');
  const overlay = qs('.cart-overlay');

  const openPanel = () => {
    renderPanel();
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    panel.setAttribute('aria-hidden', 'false');
  };

  const closePanel = () => {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    panel.setAttribute('aria-hidden', 'true');
  };

  // Events
  qs('.cart-btn').addEventListener('click', openPanel);
  qs('.cart-panel__close').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  // Qty / delete delegation on panel
  panel.addEventListener('click', e => {
    const item = e.target.closest('.cart-item');
    if (!item) return;
    const key = item.dataset.key;

    if (e.target.closest('.cart-item__del')) {
      remove(key);
      return;
    }
    const btn = e.target.closest('.cart-item__qty-btn');
    if (btn) {
      changeQty(key, btn.dataset.action === 'plus' ? 1 : -1);
    }
  });

  // Order button
  qs('.cart-order-btn').addEventListener('click', () => {
    if (get().length === 0) return;
    closePanel();
    Order.show(total());
    clear();
  });

  // Init
  updateBadge();

  return { add, remove, changeQty, clear, get, openPanel };
})();

/* =============================================
   ORDER MODAL
   ============================================= */
const Order = (() => {
  const modal   = qs('.order-modal');
  const overlay = qs('.order-overlay');
  const numEl   = qs('.order-modal__num');

  const show = (totalAmt) => {
    const orderNum = 'M' + Date.now().toString().slice(-8);
    numEl.textContent = `주문번호 ${orderNum} · 총 ${fmtPrice(totalAmt)}`;
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  qs('.order-modal__close-btn').addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  return { show };
})();

/* =============================================
   WISHLIST — localStorage + Modal
   ============================================= */
const Wishlist = (() => {
  const KEY = 'maison_wishlist';

  const get    = ()        => storage.get(KEY);
  const save   = (items)   => storage.set(KEY, items);
  const has    = (id)      => get().some(i => i.id === id);

  const toggle = (product) => {
    const items = get();
    const idx   = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items.splice(idx, 1);
      save(items);
      updateBadge();
      return false;
    } else {
      items.push(product);
      save(items);
      updateBadge();
      return true;
    }
  };

  const count      = () => get().length;
  const updateBadge = () => {
    const n     = count();
    const badge = qs('.wishlist-badge');
    badge.textContent  = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  };

  // Sync heart buttons across the page
  const syncHearts = () => {
    qsa('[data-id]').forEach(card => {
      const id  = card.dataset.id;
      const btn = card.querySelector('.product-card__wish');
      if (!btn) return;
      btn.classList.toggle('active', has(id));
    });
  };

  // Render wishlist modal
  const renderModal = () => {
    const items  = get();
    const list   = qs('.wl-items');
    const empty  = qs('.wl-empty');
    list.innerHTML = '';

    if (items.length === 0) {
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      items.forEach(item => {
        const priceHtml = item.originalPrice
          ? `<span style="color:var(--red);margin-right:6px">${fmtPrice(item.price)}</span><span style="text-decoration:line-through;color:var(--gray-400);font-size:0.78rem;font-weight:400">${fmtPrice(item.originalPrice)}</span>`
          : fmtPrice(item.price);

        const li = document.createElement('li');
        li.className = 'wl-item';
        li.dataset.id = item.id;
        li.innerHTML = `
          <img src="${item.img}" alt="${item.name}" />
          <div>
            <p class="wl-item__name">${item.name}</p>
            <p class="wl-item__price">${priceHtml}</p>
            <button class="wl-item__add-btn" data-id="${item.id}">장바구니 담기</button>
          </div>
          <button class="wl-item__del" data-id="${item.id}" aria-label="위시리스트에서 제거">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        `;
        list.appendChild(li);
      });
    }
  };

  // Modal open/close
  const modal   = qs('.wl-modal');
  const wlOverlay = qs('.wl-overlay');

  const openModal = () => {
    renderModal();
    modal.classList.add('open');
    wlOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    wlOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Nav wishlist icon
  qs('.wishlist-btn').addEventListener('click', openModal);
  qs('.wl-modal__close').addEventListener('click', closeModal);
  wlOverlay.addEventListener('click', closeModal);

  // Delegation: delete / add-to-cart inside wishlist modal
  modal.addEventListener('click', e => {
    const delBtn = e.target.closest('.wl-item__del');
    if (delBtn) {
      const id      = delBtn.dataset.id;
      const product = getAllProducts().find(p => p.id === id);
      if (product) toggle(product);
      syncHearts();
      renderModal();
      return;
    }
    const addBtn = e.target.closest('.wl-item__add-btn');
    if (addBtn) {
      const id      = addBtn.dataset.id;
      const product = getAllProducts().find(p => p.id === id);
      if (product) {
        Cart.add(product, 'M', product.colors[0], 1);
        showToast(`${product.name} 장바구니에 담겼습니다`);
      }
    }
  });

  // Page wish buttons delegation
  document.addEventListener('click', e => {
    const wishBtn = e.target.closest('.product-card__wish');
    if (!wishBtn) return;

    // Ignore if this is inside the QV modal (handled separately)
    if (wishBtn.classList.contains('qv-wish-btn')) return;

    e.preventDefault();
    e.stopPropagation();

    const card    = wishBtn.closest('[data-id]');
    if (!card) return;
    const product = getAllProducts().find(p => p.id === card.dataset.id);
    if (!product) return;

    const added = toggle(product);
    wishBtn.classList.toggle('active', added);
    showToast(added ? `${product.name} 위시리스트에 추가되었습니다` : `${product.name} 위시리스트에서 제거되었습니다`, 'wish');
  });

  // Init
  updateBadge();
  syncHearts();

  return { has, toggle, syncHearts, updateBadge };
})();

/* =============================================
   QUICK VIEW MODAL
   ============================================= */
const QuickView = (() => {
  const modal    = qs('.qv-modal');
  const overlay  = qs('.qv-overlay');
  let currentProduct = null;
  let selectedSize   = 'M';
  let selectedColor  = null;
  let qty            = 1;

  const open = (product) => {
    currentProduct = product;
    selectedSize   = 'M';
    selectedColor  = product.colors[0];
    qty            = 1;

    // Populate
    qs('.qv-modal__img').src     = product.img;
    qs('.qv-modal__img').alt     = product.name;
    qs('.qv-modal__name').textContent = product.name;
    qs('.qv-modal__desc').textContent = product.desc;

    // Price
    const priceEl = qs('.qv-modal__price');
    if (product.originalPrice) {
      priceEl.innerHTML = `<span class="discount">${fmtPrice(product.price)}</span><span class="original">${fmtPrice(product.originalPrice)}</span>`;
    } else {
      priceEl.textContent = fmtPrice(product.price);
    }

    // Badge
    const badge = qs('.qv-modal__badge');
    badge.className = 'qv-modal__badge';
    if (product.badge === 'new')  { badge.textContent = 'NEW';  badge.classList.add('new'); }
    else if (product.badge === 'sale') { badge.textContent = 'SALE'; badge.classList.add('sale'); }
    else { badge.textContent = ''; }

    // Sizes
    qsa('.qv-size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === selectedSize);
    });

    // Colors
    const colorsEl = qs('.qv-colors');
    colorsEl.innerHTML = '';
    product.colors.forEach((c, i) => {
      const chip = document.createElement('button');
      chip.className = 'qv-color-chip' + (i === 0 ? ' active' : '');
      chip.style.background = c;
      chip.dataset.color = c;
      chip.setAttribute('aria-label', `색상 선택 ${c}`);
      chip.style.border = c === '#FFFFFF' || c === '#F5F0E8' || c === '#F0EDE5'
        ? '2px solid #ddd' : '2px solid transparent';
      colorsEl.appendChild(chip);
    });

    // Qty
    qs('.qv-qty-num').textContent = qty;

    // Wish btn state
    qs('.qv-wish-btn').classList.toggle('active', Wishlist.has(product.id));

    // Show
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  };

  const close = () => {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  };

  overlay.addEventListener('click', close);
  qs('.qv-modal__close').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Size selection
  qs('.qv-sizes').addEventListener('click', e => {
    const btn = e.target.closest('.qv-size-btn');
    if (!btn) return;
    qsa('.qv-size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
  });

  // Color selection
  qs('.qv-colors').addEventListener('click', e => {
    const chip = e.target.closest('.qv-color-chip');
    if (!chip) return;
    qsa('.qv-color-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedColor = chip.dataset.color;
  });

  // Qty
  qs('.qv-qty-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qs('.qv-qty-num').textContent = qty;
  });
  qs('.qv-qty-plus').addEventListener('click', () => {
    qty++;
    qs('.qv-qty-num').textContent = qty;
  });

  // Add to cart
  qs('.qv-cart-btn').addEventListener('click', () => {
    if (!currentProduct) return;
    Cart.add(currentProduct, selectedSize, selectedColor, qty);
    showToast(`${currentProduct.name} 장바구니에 담겼습니다`);
    close();
  });

  // Wishlist toggle inside modal
  qs('.qv-wish-btn').addEventListener('click', () => {
    if (!currentProduct) return;
    const added = Wishlist.toggle(currentProduct);
    qs('.qv-wish-btn').classList.toggle('active', added);
    Wishlist.syncHearts();
    showToast(added
      ? `${currentProduct.name} 위시리스트에 추가되었습니다`
      : `${currentProduct.name} 위시리스트에서 제거되었습니다`, 'wish');
  });

  return { open };
})();

/* =============================================
   PRODUCT IMAGE CLICK → Quick View
   ============================================= */
document.addEventListener('click', e => {
  // Image click on product/best card
  const imgWrap = e.target.closest('.product-card__img-wrap, .best-card__img-wrap');
  if (!imgWrap) return;

  // Don't open if clicking a button
  if (e.target.closest('button')) return;

  const card = imgWrap.closest('[data-id]');
  if (!card) return;

  const product = getAllProducts().find(p => p.id === card.dataset.id);
  if (product) QuickView.open(product);
});

/* =============================================
   ADD TO CART (from product grid "담기" button)
   ============================================= */
document.addEventListener('click', e => {
  const cartBtn = e.target.closest('.product-card__cart');
  if (!cartBtn) return;

  const card = cartBtn.closest('[data-id]');
  if (!card) return;

  const product = getAllProducts().find(p => p.id === card.dataset.id);
  if (!product) return;

  // Add with default size M and first color
  Cart.add(product, 'M', product.colors[0], 1);
  showToast(`${product.name} 장바구니에 담겼습니다`);
});

/* =============================================
   SEARCH OVERLAY
   ============================================= */
(function initSearch() {
  const searchBtn     = qs('.search-btn');
  const searchOverlay = qs('.search-overlay');
  const searchClose   = qs('.search-close');
  const searchInput   = qs('.search-input');
  const resultsEl     = qs('.search-results');

  const openSearch = () => {
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 80);
  };

  const closeSearch = () => {
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
    resultsEl.innerHTML = '';
    resultsEl.classList.remove('visible');
  };

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
  });

  // Live search
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      resultsEl.innerHTML = '';
      resultsEl.classList.remove('visible');
      return;
    }

    const products = getAllProducts();
    const matches  = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );

    resultsEl.classList.add('visible');
    resultsEl.innerHTML = '';

    if (matches.length === 0) {
      resultsEl.innerHTML = `<p class="search-no-result">"${searchInput.value}"에 대한 검색 결과가 없습니다.</p>`;
      return;
    }

    matches.forEach(p => {
      const priceText = p.originalPrice
        ? `${fmtPrice(p.price)} (정가 ${fmtPrice(p.originalPrice)})`
        : fmtPrice(p.price);

      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <div class="search-result-item__info">
          <p class="search-result-item__name">${highlightText(p.name, q)}</p>
          <p class="search-result-item__price">${priceText}</p>
        </div>
        <svg class="search-result-item__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      `;

      const openQV = () => {
        closeSearch();
        setTimeout(() => QuickView.open(p), 150);
      };

      item.addEventListener('click', openQV);
      item.addEventListener('keydown', e => { if (e.key === 'Enter') openQV(); });
      resultsEl.appendChild(item);
    });
  });

  const highlightText = (text, q) => {
    const re  = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:rgba(200,0,30,0.12);color:var(--red);font-weight:600">$1</mark>');
  };
})();

/* =============================================
   SORT — New Arrivals
   ============================================= */
(function initSort() {
  const select = qs('.sort-select');
  if (!select) return;

  const grid = qs('.product-grid');

  select.addEventListener('change', () => {
    const val   = select.value;
    const cards = qsa('.product-card', grid);

    cards.sort((a, b) => {
      const pa = Number(a.dataset.price);
      const pb = Number(b.dataset.price);
      if (val === 'price-asc')  return pa - pb;
      if (val === 'price-desc') return pb - pa;
      // default: original DOM order (by data-id numeric part)
      return a.dataset.id.localeCompare(b.dataset.id);
    });

    // Re-append in sorted order with a brief animation
    cards.forEach((card, i) => {
      card.style.transition = `opacity 0.25s ease ${i * 0.04}s, transform 0.25s ease ${i * 0.04}s`;
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(12px)';
      grid.appendChild(card);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cards.forEach(card => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  });
})();

/* =============================================
   INTERSECTION OBSERVER — fade-in sections
   ============================================= */
(function initFadeIn() {
  const targets = qsa('.section-category, .section-arrivals, .section-best, .section-promo, .section-story');
  targets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
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
