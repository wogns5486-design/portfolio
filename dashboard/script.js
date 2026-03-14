/* ─── FlowPanel Dashboard Script ─────────────────────────────── */

/* ══════════════════════════════════════════════════════════════
   DATA LAYER
══════════════════════════════════════════════════════════════ */

const DUMMY_ORDERS = [
  { id:'FP-20501', customer:'이지원', product:'에어팟 프로 3세대',   amount:389000,  status:'배송중', date:'2025.12.14', addr:'서울 강남구 역삼동 123-4',          phone:'010-1234-5678', items:[{name:'에어팟 프로 3세대',  qty:1,price:389000}]  },
  { id:'FP-20500', customer:'박민준', product:'갤럭시 S25 울트라',    amount:1799000, status:'완료',   date:'2025.12.13', addr:'경기 성남시 분당구 판교동 88',       phone:'010-2345-6789', items:[{name:'갤럭시 S25 울트라',   qty:1,price:1799000}] },
  { id:'FP-20499', customer:'김수연', product:'다이슨 에어랩',        amount:649000,  status:'처리중', date:'2025.12.13', addr:'부산 해운대구 우동 501',             phone:'010-3456-7890', items:[{name:'다이슨 에어랩',       qty:1,price:649000}]  },
  { id:'FP-20498', customer:'최현우', product:'나이키 에어맥스 95',   amount:219000,  status:'취소',   date:'2025.12.12', addr:'인천 연수구 송도동 22',              phone:'010-4567-8901', items:[{name:'나이키 에어맥스 95',  qty:1,price:219000}]  },
  { id:'FP-20497', customer:'정예린', product:'맥북 프로 M4',         amount:3290000, status:'완료',   date:'2025.12.12', addr:'서울 마포구 합정동 77',              phone:'010-5678-9012', items:[{name:'맥북 프로 M4',        qty:1,price:3290000}] },
  { id:'FP-20496', customer:'한도윤', product:'소니 WH-1000XM6',      amount:479000,  status:'배송중', date:'2025.12.11', addr:'대전 유성구 궁동 19',               phone:'010-6789-0123', items:[{name:'소니 WH-1000XM6',     qty:1,price:479000}]  },
  { id:'FP-20495', customer:'오세훈', product:'아이패드 프로 M4',     amount:1490000, status:'완료',   date:'2025.12.10', addr:'서울 용산구 이태원동 33',            phone:'010-7890-1234', items:[{name:'아이패드 프로 M4',    qty:1,price:1490000}] },
  { id:'FP-20494', customer:'윤채원', product:'삼성 QLED TV 55"',     amount:2190000, status:'처리중', date:'2025.12.09', addr:'광주 북구 운암동 44',               phone:'010-8901-2345', items:[{name:'삼성 QLED TV 55"',    qty:1,price:2190000}] },
  { id:'FP-20493', customer:'장민서', product:'닌텐도 스위치 2',      amount:459000,  status:'배송중', date:'2025.12.08', addr:'서울 노원구 상계동 55',              phone:'010-9012-3456', items:[{name:'닌텐도 스위치 2',     qty:1,price:459000}]  },
  { id:'FP-20492', customer:'이준혁', product:'발뮤다 토스터',        amount:389000,  status:'완료',   date:'2025.12.07', addr:'경기 수원시 영통구 매탄동 66',       phone:'010-0123-4567', items:[{name:'발뮤다 토스터',       qty:1,price:389000}]  },
];

const DUMMY_MEMBERS = [
  { id:'M001', name:'김민지', email:'minji@email.com',   joinDate:'2023.01.15', grade:'VVIP', orders:142, totalSpend:15200000 },
  { id:'M002', name:'이서준', email:'seojun@email.com',  joinDate:'2023.03.22', grade:'VIP',  orders:87,  totalSpend:8400000  },
  { id:'M003', name:'박지은', email:'jieun@email.com',   joinDate:'2023.05.10', grade:'VIP',  orders:63,  totalSpend:5100000  },
  { id:'M004', name:'최준서', email:'junse@email.com',   joinDate:'2023.07.03', grade:'일반', orders:12,  totalSpend:780000   },
  { id:'M005', name:'정하은', email:'haeun@email.com',   joinDate:'2023.08.19', grade:'VVIP', orders:198, totalSpend:22700000 },
  { id:'M006', name:'강도현', email:'dohyun@email.com',  joinDate:'2023.09.30', grade:'일반', orders:8,   totalSpend:340000   },
  { id:'M007', name:'윤서아', email:'seoa@email.com',    joinDate:'2023.11.05', grade:'VIP',  orders:54,  totalSpend:4200000  },
  { id:'M008', name:'임재현', email:'jaehyun@email.com', joinDate:'2024.01.12', grade:'일반', orders:3,   totalSpend:120000   },
];

const DUMMY_PRODUCTS_DEFAULT = [
  { id:'P001', name:'갤럭시 S25 울트라',  category:'스마트폰',  price:1799000, stock:48,  emoji:'📱' },
  { id:'P002', name:'맥북 프로 M4',       category:'노트북',    price:3290000, stock:22,  emoji:'💻' },
  { id:'P003', name:'에어팟 프로 3세대',  category:'오디오',    price:389000,  stock:135, emoji:'🎧' },
  { id:'P004', name:'다이슨 에어랩',      category:'뷰티 가전', price:649000,  stock:31,  emoji:'🌀' },
  { id:'P005', name:'나이키 에어맥스 95', category:'스니커즈',  price:219000,  stock:67,  emoji:'👟' },
  { id:'P006', name:'소니 WH-1000XM6',   category:'오디오',    price:479000,  stock:44,  emoji:'🎵' },
];

const DUMMY_NOTIFICATIONS = [
  { id:1, type:'order',  msg:'새 주문 #FP-20502가 접수되었습니다.',    time:'방금 전',  read:false },
  { id:2, type:'member', msg:'신규 회원 5명이 오늘 가입했습니다.',      time:'15분 전',  read:false },
  { id:3, type:'stock',  msg:'에어팟 프로 3세대 재고가 부족합니다.',    time:'1시간 전', read:false },
  { id:4, type:'order',  msg:'주문 #FP-20498이 취소 처리되었습니다.',  time:'3시간 전', read:true  },
  { id:5, type:'system', msg:'시스템 정기 점검이 완료되었습니다.',       time:'어제',     read:true  },
];

/* ── Storage helpers ──────────────────────────────────────── */
function getOrders()   { const s=localStorage.getItem('fp_orders');   return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DUMMY_ORDERS)); }
function saveOrders(d) { localStorage.setItem('fp_orders',   JSON.stringify(d)); }
function getProducts()   { const s=localStorage.getItem('fp_products'); return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DUMMY_PRODUCTS_DEFAULT)); }
function saveProducts(d) { localStorage.setItem('fp_products', JSON.stringify(d)); }
function getSettings()   { const s=localStorage.getItem('fp_settings'); return s ? JSON.parse(s) : { name:'Kim Hyunwoo', email:'admin@flowpanel.com', role:'Super Admin' }; }
function saveSettings(d) { localStorage.setItem('fp_settings', JSON.stringify(d)); }


/* ══════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = {
    success:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  toast.innerHTML = `${icons[type]||icons.info}<span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3200);
}


/* ══════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════ */
function openModal(html) {
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}


/* ══════════════════════════════════════════════════════════════
   SPA ROUTER
══════════════════════════════════════════════════════════════ */
let currentPage = 'dashboard';

const PAGE_META = {
  dashboard: { title:'대시보드 개요',   sub:'2025년 12월 기준 실시간 현황' },
  orders:    { title:'주문 관리',        sub:'전체 주문 내역 및 상태 관리' },
  members:   { title:'회원 관리',        sub:'등록된 회원 목록 및 등급 관리' },
  products:  { title:'상품 관리',        sub:'상품 등록, 수정, 삭제 관리' },
  analytics: { title:'매출 분석',        sub:'기간별 매출 및 트렌드 분석' },
  settings:  { title:'설정',             sub:'계정 및 시스템 설정 관리' },
};

function navigateTo(page) {
  currentPage = page;

  /* nav active */
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === page)
  );

  /* persistent header */
  const meta = PAGE_META[page] || PAGE_META.dashboard;
  document.getElementById('pageTitle').textContent    = meta.title;
  document.getElementById('pageSubtitle').textContent = meta.sub;

  /* clear page-actions slot */
  document.getElementById('pageActions').innerHTML = '';

  /* clear search */
  document.getElementById('headerSearchInput').value = '';

  /* render */
  const main = document.getElementById('pageMain');
  main.innerHTML = '';

  ({ dashboard:renderDashboard, orders:renderOrders, members:renderMembers,
     products:renderProducts, analytics:renderAnalytics, settings:renderSettings }
  [page] || renderDashboard)(main);

  if (window.innerWidth < 900) closeSidebar();
}

/* helper: set page-actions buttons */
function setPageActions(html) {
  document.getElementById('pageActions').innerHTML = html;
}


/* ══════════════════════════════════════════════════════════════
   PAGE: DASHBOARD
══════════════════════════════════════════════════════════════ */
function renderDashboard(el) {
  setPageActions(`
    <button class="btn btn-ghost" onclick="showToast('리포트를 생성 중입니다…','info')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <span>리포트 다운로드</span>
    </button>
    <button class="btn btn-primary" onclick="navigateTo('orders')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>주문 관리</span>
    </button>
  `);

  el.innerHTML = `
    <!-- Stat Cards -->
    <div class="stat-grid" id="statCards">
      <div class="stat-card fade-up">
        <div class="stat-header"><span class="stat-label">총 매출</span>
          <div class="stat-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        </div>
        <div class="stat-value" id="cntRevenue">₩0</div>
        <span class="stat-change up"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>+18.4%</span>
        <div class="stat-sub">전월 대비 ₩7,340,000 증가</div>
      </div>
      <div class="stat-card fade-up" data-color="green">
        <div class="stat-header"><span class="stat-label">총 주문 수</span>
          <div class="stat-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
        </div>
        <div class="stat-value" id="cntOrders">0건</div>
        <span class="stat-change up"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>+12.7%</span>
        <div class="stat-sub">이번 달 신규 주문 847건</div>
      </div>
      <div class="stat-card fade-up" data-color="orange">
        <div class="stat-header"><span class="stat-label">전체 회원</span>
          <div class="stat-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
        </div>
        <div class="stat-value" id="cntMembers">0명</div>
        <span class="stat-change up"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>+5.2%</span>
        <div class="stat-sub">신규 가입 2,140명 이번 달</div>
      </div>
      <div class="stat-card fade-up" data-color="red">
        <div class="stat-header"><span class="stat-label">월간 방문자</span>
          <div class="stat-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
        </div>
        <div class="stat-value" id="cntVisitors">0</div>
        <span class="stat-change down"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>-3.1%</span>
        <div class="stat-sub">전월 대비 소폭 감소</div>
      </div>
    </div>

    <!-- Chart Row -->
    <div class="content-row two-col">
      <div class="card fade-up">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            월별 매출 및 주문 추이 <span class="card-meta">2025년</span>
          </div>
          <div class="card-actions">
            <button class="chip active">연간</button><button class="chip">반기</button><button class="chip">분기</button>
          </div>
        </div>
        <div class="chart-wrap">
          <div class="chart-legend">
            <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>매출</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--blue)"></div>주문</div>
          </div>
          <div class="bar-chart" id="barChart"></div>
        </div>
      </div>
      <div class="card fade-up" style="display:flex;flex-direction:column">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            매출 트렌드
          </div>
        </div>
        <div class="line-chart-wrap" style="flex:1">
          <svg id="sparkline" class="sparkline" viewBox="0 0 300 80" preserveAspectRatio="none"></svg>
        </div>
        <div class="mini-stats">
          <div class="mini-stat"><div class="mini-stat-val" style="color:var(--green)">+18.4%</div><div class="mini-stat-lbl">성장률</div></div>
          <div class="mini-stat"><div class="mini-stat-val">₩48.7M</div><div class="mini-stat-lbl">이번 달</div></div>
          <div class="mini-stat"><div class="mini-stat-val">₩41.2M</div><div class="mini-stat-lbl">지난 달</div></div>
        </div>
      </div>
    </div>

    <!-- Table + Products -->
    <div class="content-row two-col">
      <div class="card fade-up">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            최근 주문 내역
          </div>
          <div class="card-actions">
            <button class="btn btn-ghost" style="padding:6px 12px;font-size:12px" onclick="navigateTo('orders')">전체 보기</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>주문 ID</th><th>고객명</th><th>상품</th><th>금액</th><th>상태</th><th>날짜</th></tr></thead>
            <tbody id="dashOrderBody"></tbody>
          </table>
        </div>
      </div>
      <div class="card fade-up" id="productList">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            인기 상품 TOP 5
          </div>
          <div class="card-actions">
            <button class="btn btn-ghost" style="padding:6px 12px;font-size:12px" onclick="navigateTo('products')">전체 보기</button>
          </div>
        </div>
        <div class="product-list" id="dashProductList"></div>
      </div>
    </div>
  `;

  /* recent orders */
  const tbody = document.getElementById('dashOrderBody');
  getOrders().slice(0, 6).forEach(o => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td><span class="order-id">#${o.id}</span></td>
      <td><span class="customer-name">${o.customer}</span></td>
      <td>${o.product}</td>
      <td><span class="amount">₩${o.amount.toLocaleString('ko-KR')}</span></td>
      <td>${badgeHtml(o.status)}</td>
      <td>${o.date}</td>`;
    tr.addEventListener('click', () => openOrderModal(o.id));
    tbody.appendChild(tr);
  });

  /* popular products */
  const TOP5 = [
    { rank:1, emoji:'📱', name:'갤럭시 S25 울트라',  cat:'스마트폰', rev:'₩12.4M', sales:'342건', w:92 },
    { rank:2, emoji:'💻', name:'맥북 프로 M4',        cat:'노트북',   rev:'₩9.8M',  sales:'218건', w:78 },
    { rank:3, emoji:'🎧', name:'에어팟 프로 3세대',   cat:'오디오',   rev:'₩6.2M',  sales:'507건', w:64 },
    { rank:4, emoji:'🌀', name:'다이슨 에어랩',       cat:'뷰티 가전',rev:'₩4.5M',  sales:'189건', w:51 },
    { rank:5, emoji:'👟', name:'나이키 에어맥스 95',  cat:'스니커즈', rev:'₩3.1M',  sales:'412건', w:38 },
  ];
  const plist = document.getElementById('dashProductList');
  plist.innerHTML = TOP5.map(p => `
    <div class="product-item">
      <span class="product-rank">${p.rank}</span>
      <div class="product-icon">${p.emoji}</div>
      <div class="product-info"><div class="product-name">${p.name}</div><div class="product-category">${p.cat}</div></div>
      <div class="product-bar-wrap"><div class="product-bar-bg"><div class="product-bar-fill" style="width:0%" data-w="${p.w}"></div></div></div>
      <div class="product-stats"><div class="product-revenue">${p.rev}</div><div class="product-sales">${p.sales}</div></div>
    </div>`).join('');

  buildBarChart();
  buildSparkline();
  setupChips();
  animateProductBars();
  setupStatObserver();
}


/* ══════════════════════════════════════════════════════════════
   PAGE: ORDERS
══════════════════════════════════════════════════════════════ */
let orderFilterStatus = '전체';
let orderSearchQuery  = '';

function renderOrders(el) {
  setPageActions(`
    <button class="btn btn-primary" onclick="showToast('새 주문 작성 기능은 준비 중입니다.','info')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>주문 추가</span>
    </button>
  `);

  orderFilterStatus = '전체';
  orderSearchQuery  = '';

  el.innerHTML = `
    <div class="card fade-up">
      <div class="card-header" style="flex-wrap:wrap;gap:12px">
        <div class="filter-bar">
          <div class="search-field">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="orderSearch" placeholder="주문번호, 고객명 검색…" />
          </div>
          <div class="status-filters" id="orderStatusFilters">
            ${['전체','배송중','완료','처리중','취소'].map(s =>
              `<button class="chip${s==='전체'?' active':''}" data-status="${s}">${s}</button>`
            ).join('')}
          </div>
        </div>
        <span class="table-count" id="orderCount"></span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>주문 ID</th><th>고객명</th><th>상품</th><th>금액</th><th>상태</th><th>날짜</th><th></th></tr></thead>
          <tbody id="orderTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  renderOrderTable();

  document.getElementById('orderSearch').addEventListener('input', function() {
    orderSearchQuery = this.value.toLowerCase();
    renderOrderTable();
  });

  document.getElementById('orderStatusFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-status]');
    if (!btn) return;
    orderFilterStatus = btn.dataset.status;
    document.querySelectorAll('#orderStatusFilters .chip').forEach(c =>
      c.classList.toggle('active', c.dataset.status === orderFilterStatus));
    renderOrderTable();
  });
}

function renderOrderTable() {
  let orders = getOrders();
  if (orderFilterStatus !== '전체') orders = orders.filter(o => o.status === orderFilterStatus);
  if (orderSearchQuery) orders = orders.filter(o =>
    o.id.toLowerCase().includes(orderSearchQuery) ||
    o.customer.includes(orderSearchQuery) ||
    o.product.includes(orderSearchQuery)
  );

  const countEl = document.getElementById('orderCount');
  if (countEl) countEl.textContent = `총 ${orders.length}건`;

  const tbody = document.getElementById('orderTableBody');
  if (!tbody) return;

  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-row">검색 결과가 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr class="clickable-row" data-id="${o.id}">
      <td><span class="order-id">#${o.id}</span></td>
      <td><span class="customer-name">${o.customer}</span></td>
      <td>${o.product}</td>
      <td><span class="amount">₩${o.amount.toLocaleString('ko-KR')}</span></td>
      <td>${badgeHtml(o.status)}</td>
      <td>${o.date}</td>
      <td><button class="btn-icon" title="상세">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button></td>
    </tr>`).join('');

  tbody.querySelectorAll('.clickable-row').forEach(row =>
    row.addEventListener('click', () => openOrderModal(row.dataset.id))
  );
}

function openOrderModal(orderId) {
  const order = getOrders().find(o => o.id === orderId);
  if (!order) return;
  openModal(`
    <div class="modal-header">
      <div><div class="modal-title">주문 상세</div><div class="modal-sub">#${order.id} · ${order.date}</div></div>
      <button class="modal-close-btn" onclick="closeModal()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-section">
      <div class="modal-label">고객 정보</div>
      <div class="modal-info-grid">
        <div><div class="info-key">고객명</div><div class="info-val">${order.customer}</div></div>
        <div><div class="info-key">연락처</div><div class="info-val">${order.phone}</div></div>
        <div style="grid-column:1/-1"><div class="info-key">배송지</div><div class="info-val">${order.addr}</div></div>
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-label">주문 상품</div>
      <div class="order-item-list">
        ${order.items.map(it=>`
          <div class="order-item-row">
            <span>${it.name}</span><span style="color:var(--text-muted)">x${it.qty}</span>
            <span class="amount">₩${it.price.toLocaleString('ko-KR')}</span>
          </div>`).join('')}
        <div class="order-total-row"><span>합계</span><span class="amount">₩${order.amount.toLocaleString('ko-KR')}</span></div>
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-label">주문 상태 변경</div>
      <div class="status-change-wrap">
        <div>${badgeHtml(order.status)}</div>
        <select id="statusSelect" class="status-select">
          ${['처리중','배송중','완료','취소'].map(s=>`<option value="${s}"${s===order.status?' selected':''}>${s}</option>`).join('')}
        </select>
        <button class="btn btn-primary" onclick="updateOrderStatus('${order.id}')">상태 변경</button>
      </div>
    </div>
  `);
}

function updateOrderStatus(orderId) {
  const select = document.getElementById('statusSelect');
  if (!select) return;
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx < 0) return;
  orders[idx].status = select.value;
  saveOrders(orders);
  closeModal();
  showToast(`#${orderId} 상태가 "${select.value}"로 변경되었습니다.`);
  if (currentPage === 'orders') renderOrderTable();
  if (currentPage === 'dashboard') navigateTo('dashboard');
}


/* ══════════════════════════════════════════════════════════════
   PAGE: MEMBERS
══════════════════════════════════════════════════════════════ */
function renderMembers(el) {
  setPageActions(`
    <button class="btn btn-primary" onclick="showToast('회원 초대 기능은 준비 중입니다.','info')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>회원 초대</span>
    </button>
  `);

  el.innerHTML = `
    <div class="card fade-up">
      <div class="card-header" style="flex-wrap:wrap;gap:12px">
        <div class="filter-bar">
          <div class="search-field">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="memberSearch" placeholder="이름, 이메일 검색…" />
          </div>
          <div class="status-filters" id="gradeFilters">
            ${['전체','VVIP','VIP','일반'].map(g=>
              `<button class="chip${g==='전체'?' active':''}" data-grade="${g}">${g}</button>`
            ).join('')}
          </div>
        </div>
        <span class="table-count" id="memberCount"></span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>이름</th><th>이메일</th><th>가입일</th><th>등급</th><th>주문수</th><th>누적 금액</th></tr></thead>
          <tbody id="memberTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  let gradeFilter = '전체', memberQuery = '';

  function render() {
    let list = DUMMY_MEMBERS.slice();
    if (gradeFilter !== '전체') list = list.filter(m => m.grade === gradeFilter);
    if (memberQuery) list = list.filter(m => m.name.includes(memberQuery) || m.email.includes(memberQuery));

    document.getElementById('memberCount').textContent = `총 ${list.length}명`;
    const tbody = document.getElementById('memberTableBody');
    if (!tbody) return;
    if (!list.length) { tbody.innerHTML=`<tr><td colspan="7" class="empty-row">검색 결과가 없습니다.</td></tr>`; return; }
    tbody.innerHTML = list.map(m=>`
      <tr>
        <td><span class="order-id">${m.id}</span></td>
        <td><span class="customer-name">${m.name}</span></td>
        <td style="color:var(--text-secondary)">${m.email}</td>
        <td>${m.joinDate}</td>
        <td>${gradeBadge(m.grade)}</td>
        <td style="font-weight:600">${m.orders}건</td>
        <td><span class="amount">₩${m.totalSpend.toLocaleString('ko-KR')}</span></td>
      </tr>`).join('');
  }
  render();

  document.getElementById('memberSearch').addEventListener('input', function(){ memberQuery=this.value; render(); });
  document.getElementById('gradeFilters').addEventListener('click', e=>{
    const btn=e.target.closest('[data-grade]'); if(!btn) return;
    gradeFilter=btn.dataset.grade;
    document.querySelectorAll('#gradeFilters .chip').forEach(c=>c.classList.toggle('active',c.dataset.grade===gradeFilter));
    render();
  });
}

function gradeBadge(grade) {
  const cls = {VVIP:'badge-vvip',VIP:'badge-vip','일반':'badge-normal'};
  return `<span class="badge ${cls[grade]||'badge-normal'}">${grade}</span>`;
}


/* ══════════════════════════════════════════════════════════════
   PAGE: PRODUCTS
══════════════════════════════════════════════════════════════ */
function renderProducts(el) {
  setPageActions(`
    <button class="btn btn-primary" id="addProductBtn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>상품 추가</span>
    </button>
  `);

  el.innerHTML = `
    <div class="card fade-up">
      <div class="card-header">
        <div class="card-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          상품 목록
        </div>
        <span class="table-count" id="productCount"></span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>상품명</th><th>카테고리</th><th>가격</th><th>재고</th><th>재고 상태</th><th></th></tr></thead>
          <tbody id="productTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  renderProductTable();
  document.getElementById('addProductBtn').addEventListener('click', openAddProductModal);
}

function renderProductTable() {
  const products = getProducts();
  const countEl  = document.getElementById('productCount');
  if (countEl) countEl.textContent = `총 ${products.length}개`;

  const tbody = document.getElementById('productTableBody');
  if (!tbody) return;

  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-row">등록된 상품이 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => {
    const stockColor = p.stock === 0 ? 'var(--red)' : p.stock < 10 ? 'var(--orange)' : 'var(--green)';
    const stockBadge = p.stock === 0
      ? `<span class="badge badge-cancel">품절</span>`
      : p.stock < 10
        ? `<span class="badge badge-cancel">부족</span>`
        : `<span class="badge badge-complete">정상</span>`;
    return `
      <tr>
        <td><span class="order-id">${p.id}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:22px;line-height:1">${p.emoji||'📦'}</span>
            <span class="customer-name">${p.name}</span>
          </div>
        </td>
        <td><span class="badge badge-pending">${p.category}</span></td>
        <td><span class="amount">₩${p.price.toLocaleString('ko-KR')}</span></td>
        <td style="font-weight:600;color:${stockColor}">${p.stock}개</td>
        <td>${stockBadge}</td>
        <td>
          <button class="btn-icon btn-delete" data-id="${p.id}" title="삭제">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
          </button>
        </td>
      </tr>`;
  }).join('');

  tbody.querySelectorAll('.btn-delete').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); confirmDeleteProduct(btn.dataset.id); })
  );
}

function openAddProductModal() {
  const cats   = ['스마트폰','노트북','오디오','뷰티 가전','스니커즈','가전','기타'];
  const emojis = ['📱','💻','🎧','🌀','👟','📺','📦','🎵','🎮','🍳'];
  openModal(`
    <div class="modal-header">
      <div><div class="modal-title">상품 추가</div><div class="modal-sub">새 상품 정보를 입력하세요</div></div>
      <button class="modal-close-btn" onclick="closeModal()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-section">
      <div class="form-group">
        <label class="form-label">상품명 *</label>
        <input type="text" id="pName" class="form-input" placeholder="예: 아이폰 17 프로" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">가격 (₩) *</label>
          <input type="number" id="pPrice" class="form-input" placeholder="1200000" min="0" />
        </div>
        <div class="form-group">
          <label class="form-label">재고 수량 *</label>
          <input type="number" id="pStock" class="form-input" placeholder="50" min="0" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">카테고리</label>
          <select id="pCategory" class="form-input">${cats.map(c=>`<option>${c}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="form-label">이모지</label>
          <select id="pEmoji" class="form-input">${emojis.map(e=>`<option value="${e}">${e}</option>`).join('')}</select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">취소</button>
      <button class="btn btn-primary" onclick="submitAddProduct()">상품 추가</button>
    </div>
  `);
  document.getElementById('pName').focus();
}

function submitAddProduct() {
  const name     = document.getElementById('pName')?.value.trim();
  const price    = parseInt(document.getElementById('pPrice')?.value);
  const stock    = parseInt(document.getElementById('pStock')?.value);
  const category = document.getElementById('pCategory')?.value;
  const emoji    = document.getElementById('pEmoji')?.value;

  if (!name)                 { showToast('상품명을 입력하세요.','error');       return; }
  if (!price || price <= 0)  { showToast('올바른 가격을 입력하세요.','error');  return; }
  if (isNaN(stock)||stock<0) { showToast('올바른 재고를 입력하세요.','error');  return; }

  const products = getProducts();
  products.push({ id:'P'+String(Date.now()).slice(-6), name, category, price, stock, emoji });
  saveProducts(products);
  closeModal();
  showToast(`"${name}" 상품이 추가되었습니다.`);
  renderProductTable();
}

function confirmDeleteProduct(productId) {
  const products = getProducts();
  const product  = products.find(p => p.id === productId);
  if (!product) return;
  openModal(`
    <div class="modal-header">
      <div class="modal-title">상품 삭제 확인</div>
      <button class="modal-close-btn" onclick="closeModal()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-section" style="text-align:center;padding:32px 20px">
      <div style="font-size:48px;margin-bottom:16px">🗑️</div>
      <div style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:8px">"${product.name}"</div>
      <div style="color:var(--text-secondary);font-size:13px">이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">취소</button>
      <button class="btn" style="background:var(--red);color:white;border-color:var(--red)" onclick="doDeleteProduct('${productId}')">삭제</button>
    </div>
  `);
}

function doDeleteProduct(productId) {
  const products = getProducts();
  const idx      = products.findIndex(p => p.id === productId);
  if (idx < 0) return;
  const name = products[idx].name;
  products.splice(idx, 1);
  saveProducts(products);
  closeModal();
  showToast(`"${name}" 삭제 완료.`, 'error');
  renderProductTable();
}


/* ══════════════════════════════════════════════════════════════
   PAGE: ANALYTICS
══════════════════════════════════════════════════════════════ */
function renderAnalytics(el) {
  setPageActions(`
    <button class="btn btn-ghost" onclick="showToast('엑셀 파일을 준비 중입니다…','info')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <span>엑셀 내보내기</span>
    </button>
  `);

  const rev  = [68,82,74,91,78,95,88,102,115,98,123,138];
  const ord  = [42,55,48,62,51,70,60,75,80,68,90,105];
  const totalRev = rev.reduce((a,b)=>a+b,0)*13.7;
  const totalOrd = ord.reduce((a,b)=>a+b,0);
  const avgOrd   = Math.round(totalRev/totalOrd);

  el.innerHTML = `
    <div class="stat-grid" id="statCards">
      <div class="stat-card fade-up">
        <div class="stat-header"><span class="stat-label">연간 매출</span></div>
        <div class="stat-value" id="anRevenue">₩0</div>
        <span class="stat-change up">+18.4% YoY</span>
      </div>
      <div class="stat-card fade-up" data-color="green">
        <div class="stat-header"><span class="stat-label">연간 주문</span></div>
        <div class="stat-value" id="anOrders">0건</div>
        <span class="stat-change up">+12.7% YoY</span>
      </div>
      <div class="stat-card fade-up" data-color="orange">
        <div class="stat-header"><span class="stat-label">평균 주문 금액</span></div>
        <div class="stat-value" id="anAvg">₩0</div>
        <span class="stat-change up">+4.8% YoY</span>
      </div>
      <div class="stat-card fade-up" data-color="red">
        <div class="stat-header"><span class="stat-label">전환율</span></div>
        <div class="stat-value">3.8%</div>
        <span class="stat-change down">-0.3% YoY</span>
      </div>
    </div>

    <div class="card fade-up">
      <div class="card-header">
        <div class="card-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          월별 매출 및 주문 추이 <span class="card-meta">2025년</span>
        </div>
        <div class="card-actions">
          <button class="chip active">연간</button><button class="chip">반기</button><button class="chip">분기</button>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="chart-legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>매출</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--blue)"></div>주문</div>
        </div>
        <div class="bar-chart" id="barChart"></div>
      </div>
    </div>

    <div class="content-row two-col">
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">카테고리별 매출 비중</div></div>
        <div style="padding:20px">
          ${[
            {name:'스마트폰',pct:32,color:'var(--accent)'},
            {name:'노트북',  pct:25,color:'var(--blue)'},
            {name:'오디오',  pct:18,color:'var(--green)'},
            {name:'뷰티 가전',pct:14,color:'var(--orange)'},
            {name:'스니커즈',pct:11,color:'var(--red)'},
          ].map(c=>`
            <div style="margin-bottom:16px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
                <span style="color:var(--text-primary);font-weight:500">${c.name}</span>
                <span style="color:var(--text-secondary)">${c.pct}%</span>
              </div>
              <div class="product-bar-bg"><div class="product-bar-fill" style="width:0%;background:${c.color}" data-w="${c.pct}"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">월별 신규 회원</div></div>
        <div style="padding:20px">
          ${['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'].map((m,i)=>{
            const v=[120,145,132,178,155,201,189,214,233,198,252,280][i];
            return `
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
                <span style="font-size:12px;color:var(--text-muted);width:28px;flex-shrink:0">${m}</span>
                <div class="product-bar-bg" style="flex:1"><div class="product-bar-fill" style="width:0%;background:var(--blue)" data-w="${Math.round(v/280*100)}"></div></div>
                <span style="font-size:12px;font-weight:600;color:var(--text-primary);width:36px;text-align:right">${v}</span>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  animateCounter(document.getElementById('anRevenue'), totalRev, '₩', '',  1800);
  animateCounter(document.getElementById('anOrders'),  totalOrd, '',  '건', 1600);
  animateCounter(document.getElementById('anAvg'),     avgOrd,   '₩', '',  1500);
  buildBarChart();
  setupChips();
  setTimeout(()=>{ document.querySelectorAll('.product-bar-fill').forEach(b=>{ b.style.width=b.dataset.w+'%'; }); }, 350);
}


/* ══════════════════════════════════════════════════════════════
   PAGE: SETTINGS
══════════════════════════════════════════════════════════════ */
function renderSettings(el) {
  setPageActions('');
  const s = getSettings();
  const initials = s.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  el.innerHTML = `
    <div class="settings-grid fade-up">

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            프로필 설정
          </div>
        </div>
        <div class="settings-body">
          <div class="profile-preview">
            <div class="profile-avatar-lg">${initials}</div>
            <div>
              <div style="font-weight:700;font-size:15px">${s.name}</div>
              <div style="color:var(--text-muted);font-size:12px;margin-top:2px">${s.role}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">이름</label>
            <input type="text" id="settingName" class="form-input" value="${s.name}" />
          </div>
          <div class="form-group">
            <label class="form-label">이메일</label>
            <input type="email" id="settingEmail" class="form-input" value="${s.email}" />
          </div>
          <div class="form-group">
            <label class="form-label">역할</label>
            <input type="text" class="form-input" value="${s.role}" disabled style="opacity:0.5;cursor:not-allowed" />
          </div>
          <button class="btn btn-primary" onclick="saveProfile()" style="width:100%;justify-content:center;margin-top:4px">변경사항 저장</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            비밀번호 변경
          </div>
        </div>
        <div class="settings-body">
          <div class="form-group">
            <label class="form-label">현재 비밀번호</label>
            <input type="password" id="pwCurrent" class="form-input" placeholder="현재 비밀번호 입력" />
          </div>
          <div class="form-group">
            <label class="form-label">새 비밀번호</label>
            <input type="password" id="pwNew" class="form-input" placeholder="8자 이상 입력" />
          </div>
          <div class="form-group">
            <label class="form-label">새 비밀번호 확인</label>
            <input type="password" id="pwConfirm" class="form-input" placeholder="비밀번호 재입력" />
          </div>
          <button class="btn btn-primary" onclick="changePassword()" style="width:100%;justify-content:center;margin-top:4px">비밀번호 변경</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            알림 설정
          </div>
        </div>
        <div class="settings-body">
          ${[
            {label:'새 주문 알림',     sub:'새 주문이 접수될 때 알림',     checked:true},
            {label:'신규 회원 알림',   sub:'새 회원이 가입할 때 알림',     checked:true},
            {label:'재고 부족 알림',   sub:'재고가 10개 미만일 때 알림',   checked:true},
            {label:'주간 리포트 이메일',sub:'매주 월요일 요약 리포트 발송', checked:false},
          ].map(n=>`
            <div class="toggle-row">
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary)">${n.label}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${n.sub}</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${n.checked?'checked':''} onchange="showToast('알림 설정이 저장되었습니다.')">
                <span class="toggle-slider"></span>
              </label>
            </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>
            시스템 설정
          </div>
        </div>
        <div class="settings-body">
          <div class="form-group">
            <label class="form-label">언어</label>
            <select class="form-input" onchange="showToast('언어가 변경되었습니다.')">
              <option selected>한국어</option><option>English</option><option>日本語</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">시간대</label>
            <select class="form-input" onchange="showToast('시간대가 변경되었습니다.')">
              <option selected>Asia/Seoul (UTC+9)</option><option>UTC+0</option><option>America/New_York (UTC-5)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">데이터 관리</label>
            <button class="btn btn-ghost" style="width:100%;justify-content:center;color:var(--red);border-color:rgba(255,107,129,0.3)" onclick="resetAllData()">
              localStorage 데이터 초기화
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

function saveProfile() {
  const name  = document.getElementById('settingName')?.value.trim();
  const email = document.getElementById('settingEmail')?.value.trim();
  if (!name)  { showToast('이름을 입력하세요.','error'); return; }
  if (!email||!email.includes('@')) { showToast('올바른 이메일을 입력하세요.','error'); return; }
  const s = getSettings();
  s.name = name; s.email = email;
  saveSettings(s);
  const ini = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  ['headerAvatar','sidebarAvatar'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=ini; });
  ['headerName','sidebarName'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=name; });
  showToast('프로필이 저장되었습니다.');
}

function changePassword() {
  const cur  = document.getElementById('pwCurrent')?.value;
  const np   = document.getElementById('pwNew')?.value;
  const conf = document.getElementById('pwConfirm')?.value;
  if (!cur)           { showToast('현재 비밀번호를 입력하세요.','error'); return; }
  if (!np||np.length<8){ showToast('새 비밀번호는 8자 이상이어야 합니다.','error'); return; }
  if (np!==conf)      { showToast('비밀번호가 일치하지 않습니다.','error'); return; }
  showToast('비밀번호가 변경되었습니다.');
  ['pwCurrent','pwNew','pwConfirm'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

function resetAllData() {
  localStorage.removeItem('fp_orders');
  localStorage.removeItem('fp_products');
  localStorage.removeItem('fp_settings');
  showToast('데이터가 초기화되었습니다.','info');
}


/* ══════════════════════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
let notifs = JSON.parse(JSON.stringify(DUMMY_NOTIFICATIONS));

function setupNotifications() {
  const bell     = document.getElementById('notifBtn');
  const dropdown = document.getElementById('notifDropdown');
  if (!bell||!dropdown) return;

  function renderDropdown() {
    const unread = notifs.filter(n=>!n.read).length;
    const dot    = document.getElementById('notifDot');
    if (dot) dot.style.display = unread > 0 ? 'block' : 'none';

    dropdown.innerHTML = `
      <div class="notif-header">
        <span>알림</span>
        ${unread>0?`<span class="notif-unread-count">${unread}개 미읽음</span>`:'<span style="font-size:12px;color:var(--text-muted)">모두 읽음</span>'}
      </div>
      <div class="notif-list">
        ${notifs.map(n=>`
          <div class="notif-item${n.read?'':' unread'}" data-notif-id="${n.id}">
            <div class="notif-icon notif-icon-${n.type}">${notifIcon(n.type)}</div>
            <div class="notif-content">
              <div class="notif-msg">${n.msg}</div>
              <div class="notif-time">${n.time}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="notif-footer">
        <button onclick="markAllRead()">모두 읽음 처리</button>
      </div>
    `;

    dropdown.querySelectorAll('.notif-item').forEach(el=>{
      el.addEventListener('click', ()=>{
        const id=parseInt(el.dataset.notifId);
        notifs=notifs.map(n=>n.id===id?{...n,read:true}:n);
        renderDropdown();
      });
    });
  }

  window.markAllRead = ()=>{
    notifs=notifs.map(n=>({...n,read:true}));
    renderDropdown();
    showToast('모든 알림을 읽음 처리했습니다.');
  };

  bell.addEventListener('click', e=>{
    e.stopPropagation();
    const open = dropdown.classList.toggle('open');
    if (open) renderDropdown();
  });

  document.addEventListener('click', e=>{
    if (!dropdown.contains(e.target)&&e.target!==bell&&!bell.contains(e.target))
      dropdown.classList.remove('open');
  });

  /* initial dot */
  const dot = document.getElementById('notifDot');
  if (dot && notifs.some(n=>!n.read)) dot.style.display='block';
}

function notifIcon(type) {
  const map = {
    order: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    member:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`,
    stock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
    system:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>`,
  };
  return map[type]||map.system;
}


/* ══════════════════════════════════════════════════════════════
   HEADER SEARCH
══════════════════════════════════════════════════════════════ */
function setupHeaderSearch() {
  document.getElementById('headerSearchInput').addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    if (currentPage === 'orders') {
      orderSearchQuery = q;
      const inner = document.getElementById('orderSearch');
      if (inner) inner.value = this.value;
      renderOrderTable();
    }
    if (currentPage === 'members') {
      const inner = document.getElementById('memberSearch');
      if (inner) { inner.value = this.value; inner.dispatchEvent(new Event('input')); }
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   CHART HELPERS
══════════════════════════════════════════════════════════════ */
const CHART_DATA = {
  labels:  ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  revenue: [68,82,74,91,78,95,88,102,115,98,123,138],
  orders:  [42,55,48,62,51,70,60,75,80,68,90,105],
};

function buildBarChart() {
  const container = document.getElementById('barChart');
  if (!container) return;
  container.innerHTML = '';
  const max = Math.max(...CHART_DATA.revenue, ...CHART_DATA.orders);
  CHART_DATA.labels.forEach((label,i) => {
    const revH = Math.round((CHART_DATA.revenue[i]/max)*100);
    const ordH = Math.round((CHART_DATA.orders[i] /max)*100);
    const group = document.createElement('div');
    group.className = 'bar-group';
    group.innerHTML = `
      <div class="bar-bars">
        <div class="bar revenue" style="height:0%" data-h="${revH}">
          <div class="bar-tooltip">₩${(CHART_DATA.revenue[i]*13.7).toFixed(0)*1|0}만</div>
        </div>
        <div class="bar orders" style="height:0%" data-h="${ordH}">
          <div class="bar-tooltip">${CHART_DATA.orders[i]}건</div>
        </div>
      </div>
      <div class="bar-label">${label}</div>`;
    container.appendChild(group);
  });
  requestAnimationFrame(()=>{
    setTimeout(()=>{
      container.querySelectorAll('.bar').forEach((bar,idx)=>{
        setTimeout(()=>{ bar.style.height=bar.dataset.h+'%'; }, idx*25);
      });
    }, 80);
  });
}

function buildSparkline() {
  const svg = document.getElementById('sparkline');
  if (!svg) return;
  const W=svg.clientWidth||300, H=svg.clientHeight||80;
  const data=[30,45,28,60,50,72,65,80,70,88,75,95];
  const min=Math.min(...data), max=Math.max(...data);
  const xs=data.map((_,i)=>(i/(data.length-1))*W);
  const ys=data.map(d=>H-((d-min)/(max-min))*(H-12)-6);
  const d=xs.map((x,i)=>`${i===0?'M':'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const area=d+` L${W},${H} L0,${H} Z`;
  svg.innerHTML=`
    <defs><linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6C5CE7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#6C5CE7" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#sparkGrad)"/>
    <path d="${d}" fill="none" stroke="#8b7cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${xs.map((x,i)=>`<circle cx="${x.toFixed(1)}" cy="${ys[i].toFixed(1)}" r="3" fill="#8b7cf8" opacity="0"/>`).join('')}`;
  const path=svg.querySelector('path:last-of-type');
  const len=path.getTotalLength?path.getTotalLength():400;
  path.style.strokeDasharray=len;
  path.style.strokeDashoffset=len;
  path.style.transition='stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)';
  setTimeout(()=>{ path.style.strokeDashoffset=0; },200);
  svg.querySelectorAll('circle').forEach(c=>{
    c.addEventListener('mouseenter',()=>c.setAttribute('opacity','1'));
    c.addEventListener('mouseleave',()=>c.setAttribute('opacity','0'));
  });
}

function setupStatObserver() {
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      animateCounter(document.getElementById('cntRevenue'), 48730000,'₩','',1800);
      animateCounter(document.getElementById('cntOrders'),  3847,'','건',1600);
      animateCounter(document.getElementById('cntMembers'), 128400,'','명',1700);
      animateCounter(document.getElementById('cntVisitors'),924100,'','',1900);
      observer.unobserve(entry.target);
    });
  },{threshold:0.15});
  const sc=document.getElementById('statCards');
  if (sc) observer.observe(sc);
}

function setupChips() {
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', function(){
      const g=this.closest('.card-actions');
      if (!g) return;
      g.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function animateProductBars() {
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.product-bar-fill').forEach(b=>{ b.style.width=b.dataset.w+'%'; });
      observer.unobserve(entry.target);
    });
  },{threshold:0.2});
  const list=document.getElementById('productList');
  if (list) observer.observe(list);
}

function animateCounter(el,target,prefix='',suffix='',duration=1600) {
  if (!el) return;
  const start=performance.now();
  function update(now) {
    const p=Math.min((now-start)/duration,1);
    const e=p===1?1:1-Math.pow(2,-10*p);
    const v=target*e;
    if (target>=1_000_000)      el.textContent=prefix+(v/1_000_000).toFixed(2)+suffix;
    else if (target>=1_000)     el.textContent=prefix+Math.floor(v).toLocaleString('ko-KR')+suffix;
    else                        el.textContent=prefix+Math.floor(v)+suffix;
    if (p<1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}


/* ══════════════════════════════════════════════════════════════
   BADGE
══════════════════════════════════════════════════════════════ */
function badgeHtml(status) {
  const m={배송중:'badge-shipping',완료:'badge-complete',취소:'badge-cancel',처리중:'badge-pending'};
  return `<span class="badge ${m[status]||'badge-pending'}">${status}</span>`;
}


/* ══════════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════════ */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const menuBtn = document.getElementById('menuToggle');

function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

menuBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);


/* ══════════════════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e=>{
  if ((e.ctrlKey||e.metaKey)&&e.key==='k') { e.preventDefault(); document.getElementById('headerSearchInput')?.focus(); }
  if (e.key==='Escape') { closeSidebar(); closeModal(); document.getElementById('notifDropdown')?.classList.remove('open'); }
});


/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', ()=>{
  /* nav click wiring */
  document.querySelectorAll('.nav-item[data-page]').forEach(item=>{
    item.addEventListener('click', e=>{ e.preventDefault(); navigateTo(item.dataset.page); });
  });

  /* modal overlay click */
  document.getElementById('modalOverlay')?.addEventListener('click', function(e){
    if (e.target===this) closeModal();
  });

  /* notifications */
  setupNotifications();

  /* header search */
  setupHeaderSearch();

  /* sparkline on resize */
  window.addEventListener('resize', ()=>{ if (currentPage==='dashboard') buildSparkline(); });

  /* boot */
  navigateTo('dashboard');
});
