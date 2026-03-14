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
  nav.classList.toggle('scrolled', window.scrollY > 80);
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

// ===== Scroll Fade Animations =====
function observeFadeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

document.querySelectorAll('.section-label, .section-title, .about-image, .about-text, .about-feature, .gallery-item, .hours-card, .location-map, .location-info').forEach(el => {
  el.classList.add('fade-up');
});

// ===== Init menu =====
renderMenu('coffee');
observeFadeElements();

// ===== Toast helper =====
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('cafeToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Reservation Modal =====
const resOverlay = document.getElementById('reservationModal');
const resClose = document.getElementById('resClose');

function openReservation() {
  // Reset to form step
  document.getElementById('resFormStep').style.display = 'block';
  document.getElementById('resSuccessStep').style.display = 'none';
  document.getElementById('resForm').reset();
  clearResErrors();
  // Set min date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  document.getElementById('resDate').min = `${yyyy}-${mm}-${dd}`;

  resOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReservation() {
  resOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('openReservationBtn').addEventListener('click', e => {
  e.preventDefault();
  openReservation();
});

resClose.addEventListener('click', closeReservation);

resOverlay.addEventListener('click', e => {
  if (e.target === resOverlay) closeReservation();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && resOverlay.classList.contains('open')) closeReservation();
});

// ===== Reservation Form Validation & Submit =====
function clearResErrors() {
  document.querySelectorAll('.res-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.res-form-group input, .res-form-group select').forEach(el => el.classList.remove('error'));
}

function resError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (error) error.textContent = msg;
}

function formatPhoneNumber(val) {
  const digits = val.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return digits.slice(0, 3) + '-' + digits.slice(3);
  return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
}

document.getElementById('resPhone').addEventListener('input', function () {
  this.value = formatPhoneNumber(this.value);
});

document.getElementById('resForm').addEventListener('submit', e => {
  e.preventDefault();
  clearResErrors();

  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();

  let valid = true;

  if (!date) {
    resError('resDate', 'resDateError', '날짜를 선택해 주세요.');
    valid = false;
  }
  if (!time) {
    resError('resTime', 'resTimeError', '시간을 선택해 주세요.');
    valid = false;
  }
  if (!guests) {
    resError('resGuests', 'resGuestsError', '인원을 선택해 주세요.');
    valid = false;
  }
  if (!name) {
    resError('resName', 'resNameError', '이름을 입력해 주세요.');
    valid = false;
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone || phoneDigits.length < 10) {
    resError('resPhone', 'resPhoneError', '올바른 연락처를 입력해 주세요.');
    valid = false;
  }

  if (!valid) return;

  // Format date for display
  const dateObj = new Date(date + 'T00:00:00');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${weekdays[dateObj.getDay()]})`;

  // Save to localStorage
  const reservation = { date, time, guests, name, phone, createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem('blossom_reservations') || '[]');
  existing.push(reservation);
  localStorage.setItem('blossom_reservations', JSON.stringify(existing));

  // Show success
  document.getElementById('resSummary').innerHTML = `
    <div class="res-summary-row"><span>날짜</span><span>${formattedDate}</span></div>
    <div class="res-summary-row"><span>시간</span><span>${time}</span></div>
    <div class="res-summary-row"><span>인원</span><span>${guests}</span></div>
    <div class="res-summary-row"><span>예약자</span><span>${name}</span></div>
    <div class="res-summary-row"><span>연락처</span><span>${phone}</span></div>
  `;

  document.getElementById('resFormStep').style.display = 'none';
  document.getElementById('resSuccessStep').style.display = 'block';
});

document.getElementById('resSuccessClose').addEventListener('click', () => {
  closeReservation();
  showToast('예약이 완료되었습니다. 방문을 기다리겠습니다 🌸');
});
