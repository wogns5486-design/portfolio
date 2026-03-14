// ===== Menu Data =====
const menuData = {
  coffee: [
    { name: '블로썸 시그니처 라떼', desc: '장미 시럽과 바닐라의 조화', price: '6,500' },
    { name: '에티오피아 예가체프', desc: '플로럴 향과 깔끔한 산미', price: '5,500' },
    { name: '콜롬비아 수프리모', desc: '고소한 견과류 향, 부드러운 바디', price: '5,500' },
    { name: '카페 아메리카노', desc: '매일 로스팅한 블렌딩 원두', price: '4,500' },
    { name: '바닐라 플랫 화이트', desc: '진한 에스프레소와 실키한 밀크폼', price: '6,000' },
    { name: '아인슈페너', desc: '비엔나 스타일 생크림 커피', price: '6,500' },
  ],
  'non-coffee': [
    { name: '얼그레이 밀크티', desc: '직접 우린 찻잎으로 만든 밀크티', price: '6,000' },
    { name: '유자 에이드', desc: '고흥 유자청으로 만든 상큼한 에이드', price: '5,500' },
    { name: '딸기 블로썸 라떼', desc: '제철 딸기와 연유의 만남', price: '7,000' },
    { name: '말차 라떼', desc: '교토산 말차를 사용한 진한 라떼', price: '6,500' },
    { name: '레몬 허브티', desc: '레몬그라스와 캐모마일 블렌딩', price: '5,000' },
    { name: '수제 초코라떼', desc: '벨기에 초콜릿으로 만든 리치한 라떼', price: '6,500' },
  ],
  dessert: [
    { name: '바스크 치즈케이크', desc: '매장에서 매일 구워내는 시그니처', price: '7,500' },
    { name: '플레인 스콘', desc: '버터 향 가득한 수제 스콘', price: '4,000' },
    { name: '크루아상', desc: '겹겹이 바삭한 프랑스식 크루아상', price: '4,500' },
    { name: '당근 케이크', desc: '크림치즈 프로스팅의 당근 케이크', price: '6,500' },
    { name: '마들렌 (3ea)', desc: '레몬 제스트를 넣은 촉촉한 마들렌', price: '5,000' },
    { name: '티라미수', desc: '에스프레소를 듬뿍 적신 이탈리안 티라미수', price: '7,000' },
  ],
};

// ===== Render Menu =====
function renderMenu(category) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[category];

  grid.innerHTML = items.map(item => `
    <div class="menu-item fade-up">
      <div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.desc}</div>
      </div>
      <div class="menu-item-price">${item.price}</div>
    </div>
  `).join('');

  // Re-observe new elements
  observeFadeElements();
}

// ===== Menu Tabs =====
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.tab);
  });
});

// ===== Navigation Scroll =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Scroll Fade Animations =====
function observeFadeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

// ===== Add fade-up class to sections =====
document.querySelectorAll('.section-label, .section-title, .about-image, .about-text, .about-feature, .gallery-item, .hours-card, .location-map, .location-info').forEach(el => {
  el.classList.add('fade-up');
});

// ===== Init =====
renderMenu('coffee');
observeFadeElements();
