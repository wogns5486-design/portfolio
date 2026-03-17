/* ===========================
   맛집고래 - script.js
=========================== */

'use strict';

// ===========================
// DATA
// ===========================
const MENU_DATA = [
  {
    id: 1,
    name: '김치찌개',
    category: ['한식', '찌개', '인기'],
    price: 8000,
    desc: '묵은지와 돼지고기가 어우러진 얼큰하고 깊은 맛의 대표 한식. 밥 한 공기가 절로 생각나는 맛집고래 인기 1위 메뉴입니다.',
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80&auto=format&fit=crop',
    badges: ['hot', 'best'],
  },
  {
    id: 2,
    name: '된장찌개',
    category: ['한식', '찌개'],
    price: 8000,
    desc: '국산 된장과 두부, 제철 채소가 들어간 구수하고 건강한 찌개. 할머니 손맛 그대로 정성껏 끓여드립니다.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80&auto=format&fit=crop',
    badges: [],
  },
  {
    id: 3,
    name: '불고기',
    category: ['한식', '구이', '인기'],
    price: 13000,
    desc: '달콤한 양념에 재운 국내산 소고기를 숯불에 구운 부드럽고 풍미 넘치는 메뉴. 온 가족이 좋아하는 맛집고래 시그니처.',
    image: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=600&q=80&auto=format&fit=crop',
    badges: ['best'],
  },
  {
    id: 4,
    name: '제육볶음',
    category: ['한식', '구이', '인기'],
    price: 10000,
    desc: '매콤달콤한 고추장 양념에 볶아낸 두툼한 돼지고기. 밥도둑 그 자체! 청양고추로 칼칼함을 더했습니다.',
    image: 'https://images.unsplash.com/photo-1632709810780-b5079377ffd6?w=600&q=80&auto=format&fit=crop',
    badges: ['hot'],
  },
  {
    id: 5,
    name: '비빔밥',
    category: ['한식', '인기'],
    price: 9000,
    desc: '5가지 나물과 고슬고슬한 밥, 달걀 후라이, 참기름 듬뿍. 한 그릇에 영양을 가득 담은 건강식입니다.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600&q=80&auto=format&fit=crop',
    badges: [],
  },
  {
    id: 6,
    name: '돌솥비빔밥',
    category: ['한식'],
    price: 11000,
    desc: '뜨겁게 달궈진 돌솥에 갖은 나물과 고기, 달걀이 어우러진 프리미엄 비빔밥. 바삭한 누룽지가 포인트!',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80&auto=format&fit=crop',
    badges: ['new'],
  },
  {
    id: 7,
    name: '잡채',
    category: ['한식'],
    price: 11000,
    desc: '당면과 고기, 색색의 채소를 참기름으로 볶아낸 쫄깃하고 달콤한 잡채. 명절에만 먹기 아까운 맛!',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80&auto=format&fit=crop',
    badges: [],
  },
  {
    id: 8,
    name: '떡볶이',
    category: ['분식', '인기'],
    price: 7000,
    desc: '쫄깃한 가래떡에 매콤달콤한 고추장 소스를 입혀 끓인 국민 간식. 어묵, 달걀을 함께 즐겨보세요.',
    image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=600&q=80&auto=format&fit=crop',
    badges: ['hot'],
  },
  {
    id: 9,
    name: '김밥',
    category: ['분식'],
    price: 5000,
    desc: '신선한 재료를 밥과 함께 돌돌 만 든든한 한 끼. 참기름 향이 솔솔 나는 맛집고래 수제 김밥입니다.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80&auto=format&fit=crop',
    badges: ['new'],
  },
  {
    id: 10,
    name: '라면',
    category: ['면류', '분식'],
    price: 6000,
    desc: '진한 육수에 쫄깃한 면발, 계란과 파를 올린 얼큰한 라면. 추운 날 더욱 생각나는 맛집고래 스타일.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&auto=format&fit=crop',
    badges: [],
  },
  {
    id: 11,
    name: '갈비탕',
    category: ['한식'],
    price: 14000,
    desc: '사골과 갈비를 오랜 시간 우려낸 맑고 진한 국물. 부드럽게 익은 갈비살이 입에서 살살 녹습니다.',
    image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=600&q=80&auto=format&fit=crop',
    badges: ['new'],
  },
  {
    id: 12,
    name: '삼겹살',
    category: ['구이', '인기'],
    price: 15000,
    desc: '두툼하게 썬 국내산 삼겹살을 직화로 구워드립니다. 쌈 채소와 된장, 마늘이 함께 제공됩니다.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80&auto=format&fit=crop',
    badges: ['best'],
  },
];

const DELIVERY_FEE = 3000;
const MIN_ORDER = 15000;

// ===========================
// STATE
// ===========================
let state = {
  mode: 'delivery',       // 'delivery' | 'pickup'
  activeCategory: '전체',
  searchQuery: '',
  cart: [],               // [{id, name, price, image, options, qty, unitPrice}]
  currentMenu: null,      // currently open menu
  qty: 1,
};

// localStorage key
const CART_KEY = 'matjipgorae_cart';
const MODE_KEY = 'matjipgorae_mode';

// ===========================
// UTILS
// ===========================
function formatPrice(n) {
  return n.toLocaleString('ko-KR') + '원';
}

function randomOrderNum() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return '#MG-' + num;
}

function showToast(msg, duration = 2200) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) state.cart = JSON.parse(saved);
  } catch (_) {
    state.cart = [];
  }
}

function loadMode() {
  const saved = localStorage.getItem(MODE_KEY);
  if (saved === 'pickup' || saved === 'delivery') state.mode = saved;
}

// ===========================
// RENDER: MENU GRID
// ===========================
function getFilteredMenus() {
  let list = MENU_DATA;

  if (state.activeCategory !== '전체') {
    list = list.filter(m => m.category.includes(state.activeCategory));
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.desc.toLowerCase().includes(q)
    );
  }

  return list;
}

function renderBadges(badges) {
  return badges.map(b => {
    if (b === 'hot') return '<span class="badge badge-hot">🔥 인기</span>';
    if (b === 'new') return '<span class="badge badge-new">✨ NEW</span>';
    if (b === 'best') return '<span class="badge badge-best">👑 BEST</span>';
    return '';
  }).join('');
}

function renderMenuGrid() {
  const grid = document.getElementById('menuGrid');
  const empty = document.getElementById('emptyState');
  const title = document.getElementById('menuTitle');
  const count = document.getElementById('menuCount');

  const menus = getFilteredMenus();

  title.textContent = state.activeCategory === '전체' && !state.searchQuery
    ? '전체 메뉴'
    : state.searchQuery
      ? `"${state.searchQuery}" 검색 결과`
      : `${state.activeCategory} 메뉴`;

  count.textContent = `${menus.length}개의 메뉴`;

  if (menus.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = menus.map(m => `
    <article class="menu-card" role="listitem" data-id="${m.id}" tabindex="0" aria-label="${m.name} ${formatPrice(m.price)}">
      <div class="menu-card-img-wrap">
        <img
          class="menu-card-img"
          src="${m.image}"
          alt="${m.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80'"
        />
        <div class="card-badges">${renderBadges(m.badges)}</div>
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-name">${m.name}</h3>
        <p class="menu-card-desc">${m.desc}</p>
        <div class="menu-card-footer">
          <p class="menu-card-price">${formatPrice(m.price)} <span>~</span></p>
          <button class="add-btn" data-id="${m.id}" aria-label="${m.name} 담기" title="${m.name} 담기">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

// ===========================
// MODAL: MENU DETAIL
// ===========================
function openMenuModal(menuId) {
  const menu = MENU_DATA.find(m => m.id === menuId);
  if (!menu) return;
  state.currentMenu = menu;
  state.qty = 1;

  document.getElementById('modalImg').src = menu.image;
  document.getElementById('modalImg').alt = menu.name;
  document.getElementById('modalMenuName').textContent = menu.name;
  document.getElementById('modalDesc').textContent = menu.desc;
  document.getElementById('modalBasePrice').textContent = '기본 ' + formatPrice(menu.price);
  document.getElementById('modalBadges').innerHTML = renderBadges(menu.badges);

  // Reset options
  document.querySelectorAll('input[name="spicy"]').forEach(r => r.checked = r.value === '0');
  document.querySelectorAll('input[name="size"]').forEach(r => r.checked = r.value === 'regular');
  document.querySelectorAll('input[name="topping"]').forEach(c => c.checked = false);

  document.getElementById('qtyNum').textContent = '1';

  updateModalPrice();

  const modal = document.getElementById('menuModal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Focus trap
  setTimeout(() => document.getElementById('modalClose').focus(), 60);
}

function closeMenuModal() {
  document.getElementById('menuModal').hidden = true;
  document.body.style.overflow = '';
  state.currentMenu = null;
}

function calcOptionExtras() {
  let extra = 0;
  const spicy = document.querySelector('input[name="spicy"]:checked');
  if (spicy) extra += Number(spicy.dataset.price);
  const size = document.querySelector('input[name="size"]:checked');
  if (size) extra += Number(size.dataset.price);
  document.querySelectorAll('input[name="topping"]:checked').forEach(c => {
    extra += Number(c.dataset.price);
  });
  return extra;
}

function updateModalPrice() {
  if (!state.currentMenu) return;
  const extra = calcOptionExtras();
  const unit = state.currentMenu.price + extra;
  const total = unit * state.qty;
  document.getElementById('addCartPrice').textContent = formatPrice(total);
  document.getElementById('qtyMinus').disabled = state.qty <= 1;
}

function buildOptionLabel() {
  const parts = [];
  const spicy = document.querySelector('input[name="spicy"]:checked');
  const spicyLabels = ['순한맛', '보통맛', '매운맛', '아주매운맛'];
  if (spicy) parts.push(spicyLabels[spicy.value] || '');
  const size = document.querySelector('input[name="size"]:checked');
  const sizeLabels = { regular: '보통', large: '곱빼기', xl: '대' };
  if (size) parts.push(sizeLabels[size.value] || '');
  document.querySelectorAll('input[name="topping"]:checked').forEach(c => {
    const label = c.closest('.option-check').querySelector('.check-label').textContent;
    parts.push(label);
  });
  return parts.filter(Boolean).join(' · ');
}

// ===========================
// CART
// ===========================
function addToCart() {
  const menu = state.currentMenu;
  if (!menu) return;

  const extra = calcOptionExtras();
  const unitPrice = menu.price + extra;
  const opts = buildOptionLabel();

  // Check if same item+option exists
  const existing = state.cart.find(
    c => c.id === menu.id && c.opts === opts
  );

  if (existing) {
    existing.qty += state.qty;
  } else {
    state.cart.push({
      cartId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      id: menu.id,
      name: menu.name,
      image: menu.image,
      opts,
      unitPrice,
      qty: state.qty,
    });
  }

  saveCart();
  updateCartBadge();
  renderCartPanel();
  closeMenuModal();
  showToast(`🛒 ${menu.name}을(를) 담았어요!`);
}

function removeFromCart(cartId) {
  state.cart = state.cart.filter(c => c.cartId !== cartId);
  saveCart();
  updateCartBadge();
  renderCartPanel();
}

function changeCartQty(cartId, delta) {
  const item = state.cart.find(c => c.cartId === cartId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartPanel();
}

function getCartSubtotal() {
  return state.cart.reduce((sum, c) => sum + c.unitPrice * c.qty, 0);
}

function getDeliveryFee() {
  if (state.mode === 'pickup') return 0;
  return state.cart.length > 0 ? DELIVERY_FEE : 0;
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const total = state.cart.reduce((s, c) => s + c.qty, 0);
  badge.textContent = total;
  badge.hidden = total === 0;
}

function renderCartPanel() {
  const empty = document.getElementById('cartEmpty');
  const itemsEl = document.getElementById('cartItems');
  const footer = document.getElementById('cartPanelFooter');
  const orderBtn = document.getElementById('orderBtn');
  const notice = document.getElementById('minOrderNotice');

  if (state.cart.length === 0) {
    empty.hidden = false;
    itemsEl.innerHTML = '';
    footer.style.display = 'block';
    document.getElementById('summarySubtotal').textContent = '0원';
    document.getElementById('summaryTotal').textContent = '0원';
    document.getElementById('summaryDelivery').textContent = state.mode === 'pickup' ? '무료' : formatPrice(DELIVERY_FEE);
    orderBtn.disabled = true;
    notice.textContent = '';
    return;
  }

  empty.hidden = true;

  itemsEl.innerHTML = state.cart.map(item => `
    <li class="cart-item" data-cart-id="${item.cartId}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=200&q=60'" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        ${item.opts ? `<p class="cart-item-opts">${item.opts}</p>` : ''}
        <div class="cart-item-price-row">
          <div class="cart-item-qty-wrap">
            <button class="cart-qty-btn" data-cart-id="${item.cartId}" data-delta="-1" aria-label="수량 줄이기">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" data-cart-id="${item.cartId}" data-delta="1" aria-label="수량 늘리기">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(item.unitPrice * item.qty)}</span>
        </div>
      </div>
      <button class="cart-item-del" data-cart-id="${item.cartId}" aria-label="${item.name} 삭제">✕</button>
    </li>
  `).join('');

  const subtotal = getCartSubtotal();
  const fee = getDeliveryFee();
  const total = subtotal + fee;

  document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
  document.getElementById('summaryDelivery').textContent = fee === 0 ? '무료' : formatPrice(fee);
  document.getElementById('summaryTotal').textContent = formatPrice(total);

  const deliveryRow = document.getElementById('deliveryRow');
  deliveryRow.style.display = state.mode === 'pickup' ? 'none' : '';

  if (subtotal < MIN_ORDER && state.mode === 'delivery') {
    notice.textContent = `최소 주문금액까지 ${formatPrice(MIN_ORDER - subtotal)} 남았어요`;
    orderBtn.disabled = true;
  } else {
    notice.textContent = '';
    orderBtn.disabled = false;
  }
}

function openCartPanel() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  overlay.hidden = false;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderCartPanel();
}

function closeCartPanel() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  setTimeout(() => { overlay.hidden = true; }, 300);
  document.body.style.overflow = '';
}

// ===========================
// ORDER
// ===========================
function placeOrder() {
  if (state.cart.length === 0) return;

  const orderNum = randomOrderNum();
  const subtotal = getCartSubtotal();
  const fee = getDeliveryFee();
  const total = subtotal + fee;

  // Save to localStorage
  const orderRecord = {
    orderNum,
    mode: state.mode,
    items: state.cart.map(c => ({ name: c.name, qty: c.qty, price: c.unitPrice * c.qty })),
    subtotal,
    fee,
    total,
    date: new Date().toISOString(),
  };
  try {
    const orders = JSON.parse(localStorage.getItem('matjipgorae_orders') || '[]');
    orders.push(orderRecord);
    localStorage.setItem('matjipgorae_orders', JSON.stringify(orders));
  } catch (_) {}

  // Populate order modal
  document.getElementById('orderNum').textContent = orderNum;
  document.getElementById('orderMode').textContent = state.mode === 'delivery' ? '배달' : '포장';
  document.getElementById('orderSummaryList').innerHTML = state.cart.map(c => `
    <li>
      <span>${c.name} × ${c.qty}</span>
      <span>${formatPrice(c.unitPrice * c.qty)}</span>
    </li>
  `).join('') + (fee > 0 ? `<li><span>배달팁</span><span>${formatPrice(fee)}</span></li>` : '');
  document.getElementById('orderTotalPrice').textContent = formatPrice(total);

  closeCartPanel();

  const modal = document.getElementById('orderModal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Clear cart
  state.cart = [];
  saveCart();
  updateCartBadge();
}

function closeOrderModal() {
  document.getElementById('orderModal').hidden = true;
  document.body.style.overflow = '';
}

// ===========================
// DELIVERY / PICKUP TOGGLE
// ===========================
function setMode(mode) {
  state.mode = mode;
  localStorage.setItem(MODE_KEY, mode);

  document.getElementById('btn-delivery').classList.toggle('active', mode === 'delivery');
  document.getElementById('btn-pickup').classList.toggle('active', mode === 'pickup');

  // Update cart mode badge
  const badge = document.getElementById('cartModeInfo').querySelector('.mode-badge');
  if (mode === 'delivery') {
    badge.className = 'mode-badge delivery';
    badge.textContent = '🛵 배달';
  } else {
    badge.className = 'mode-badge pickup';
    badge.textContent = '🏃 포장';
  }

  renderCartPanel();
}

// ===========================
// SEARCH
// ===========================
function handleSearch(val) {
  state.searchQuery = val.trim();
  document.getElementById('searchClear').hidden = !val.length;
  renderMenuGrid();
}

// ===========================
// HERO BUTTON ACTIONS
// ===========================
function filterAndScroll(cat) {
  state.activeCategory = cat;
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').hidden = true;

  document.querySelectorAll('.cat-btn').forEach(btn => {
    const isActive = btn.dataset.cat === cat;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive);
  });

  renderMenuGrid();

  document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===========================
// EVENT LISTENERS
// ===========================
function initEvents() {
  // Delivery / Pickup toggle
  document.getElementById('btn-delivery').addEventListener('click', () => setMode('delivery'));
  document.getElementById('btn-pickup').addEventListener('click', () => setMode('pickup'));

  // Search
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', e => handleSearch(e.target.value));
  document.getElementById('searchClear').addEventListener('click', () => {
    searchInput.value = '';
    handleSearch('');
    searchInput.focus();
  });

  // Cart open/close
  document.getElementById('cartBtn').addEventListener('click', openCartPanel);
  document.getElementById('cartPanelClose').addEventListener('click', closeCartPanel);
  document.getElementById('cartOverlay').addEventListener('click', closeCartPanel);

  // Category
  document.getElementById('categoryScroll').addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    const cat = btn.dataset.cat;
    state.activeCategory = cat;
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').hidden = true;

    document.querySelectorAll('.cat-btn').forEach(b => {
      const active = b.dataset.cat === cat;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active);
    });

    renderMenuGrid();
  });

  // Menu grid: card click & add button
  document.getElementById('menuGrid').addEventListener('click', e => {
    const addBtn = e.target.closest('.add-btn');
    if (addBtn) {
      e.stopPropagation();
      const id = Number(addBtn.dataset.id);
      openMenuModal(id);
      return;
    }
    const card = e.target.closest('.menu-card');
    if (card) {
      openMenuModal(Number(card.dataset.id));
    }
  });

  // Keyboard: Enter on card
  document.getElementById('menuGrid').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.menu-card');
      if (card) openMenuModal(Number(card.dataset.id));
    }
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeMenuModal);
  document.getElementById('menuModal').addEventListener('click', e => {
    if (e.target === document.getElementById('menuModal')) closeMenuModal();
  });

  // Modal options → price update
  document.getElementById('menuModal').addEventListener('change', () => updateModalPrice());

  // Qty controls
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (state.qty > 1) { state.qty--; document.getElementById('qtyNum').textContent = state.qty; updateModalPrice(); }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    state.qty++;
    document.getElementById('qtyNum').textContent = state.qty;
    updateModalPrice();
  });

  // Add to cart
  document.getElementById('addCartBtn').addEventListener('click', addToCart);

  // Cart panel: qty change + delete (event delegation)
  document.getElementById('cartItems').addEventListener('click', e => {
    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
      const cartId = qtyBtn.dataset.cartId;
      const delta = Number(qtyBtn.dataset.delta);
      changeCartQty(cartId, delta);
      return;
    }
    const delBtn = e.target.closest('.cart-item-del');
    if (delBtn) {
      const cartId = delBtn.dataset.cartId;
      removeFromCart(cartId);
    }
  });

  // Order button
  document.getElementById('orderBtn').addEventListener('click', placeOrder);

  // Order modal confirm
  document.getElementById('orderConfirmBtn').addEventListener('click', closeOrderModal);
  document.getElementById('orderModal').addEventListener('click', e => {
    if (e.target === document.getElementById('orderModal')) closeOrderModal();
  });

  // Hero buttons
  document.getElementById('heroMenuBtn').addEventListener('click', e => {
    e.preventDefault();
    filterAndScroll('인기');
  });
  document.getElementById('heroNewBtn').addEventListener('click', e => {
    e.preventDefault();
    // Filter by NEW badge
    state.activeCategory = '전체';
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').hidden = true;
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === '전체');
      b.setAttribute('aria-selected', b.dataset.cat === '전체');
    });
    // Show only new items
    const grid = document.getElementById('menuGrid');
    const empty = document.getElementById('emptyState');
    const newMenus = MENU_DATA.filter(m => m.badges.includes('new'));
    document.getElementById('menuTitle').textContent = '신메뉴';
    document.getElementById('menuCount').textContent = `${newMenus.length}개의 메뉴`;
    empty.hidden = true;
    grid.innerHTML = newMenus.map(m => `
      <article class="menu-card" role="listitem" data-id="${m.id}" tabindex="0" aria-label="${m.name} ${formatPrice(m.price)}">
        <div class="menu-card-img-wrap">
          <img class="menu-card-img" src="${m.image}" alt="${m.name}" loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80'" />
          <div class="card-badges">${renderBadges(m.badges)}</div>
        </div>
        <div class="menu-card-body">
          <h3 class="menu-card-name">${m.name}</h3>
          <p class="menu-card-desc">${m.desc}</p>
          <div class="menu-card-footer">
            <p class="menu-card-price">${formatPrice(m.price)} <span>~</span></p>
            <button class="add-btn" data-id="${m.id}" aria-label="${m.name} 담기" title="${m.name} 담기">+</button>
          </div>
        </div>
      </article>
    `).join('');
    document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ESC closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('menuModal').hidden) { closeMenuModal(); return; }
      if (!document.getElementById('orderModal').hidden) { closeOrderModal(); return; }
      if (document.getElementById('cartPanel').classList.contains('open')) { closeCartPanel(); }
    }
  });

  // Header scroll shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.10)' : '';
  }, { passive: true });
}

// ===========================
// INIT
// ===========================
function init() {
  loadCart();
  loadMode();

  // Apply saved mode UI
  document.getElementById('btn-delivery').classList.toggle('active', state.mode === 'delivery');
  document.getElementById('btn-pickup').classList.toggle('active', state.mode === 'pickup');
  const badge = document.getElementById('cartModeInfo').querySelector('.mode-badge');
  if (state.mode === 'pickup') {
    badge.className = 'mode-badge pickup';
    badge.textContent = '🏃 포장';
  }

  renderMenuGrid();
  updateCartBadge();
  initEvents();

  // cartId is a string — no conversion needed after JSON.parse
}

document.addEventListener('DOMContentLoaded', init);
