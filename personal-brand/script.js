/* ===================================================
   김하늘.dev — Main Script
   =================================================== */

'use strict';

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const VIDEOS = [
  {
    id: 'v1',
    title: 'JavaScript 클로저, 드디어 이해했습니다 (feat. 실전 예제)',
    views: '24.3만',
    date: '2주 전',
    duration: '18:42',
    category: 'coding',
    thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop',
  },
  {
    id: 'v2',
    title: '개발자 연봉 현실 공개 | 신입부터 시니어까지',
    views: '41.8만',
    date: '1개월 전',
    duration: '22:15',
    category: 'career',
    thumb: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=480&h=270&fit=crop',
  },
  {
    id: 'v3',
    title: 'React 18 신기능 완전 분석 | Concurrent Mode 제대로 쓰기',
    views: '18.6만',
    date: '3주 전',
    duration: '31:07',
    category: 'coding',
    thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop',
  },
  {
    id: 'v4',
    title: '개발자 스터디카페 브이로그 | 코딩 루틴 공개',
    views: '9.2만',
    date: '5일 전',
    duration: '14:33',
    category: 'vlog',
    thumb: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=480&h=270&fit=crop',
  },
  {
    id: 'v5',
    title: 'Python으로 나만의 챗봇 만들기 | OpenAI API 완전 정복',
    views: '33.1만',
    date: '2개월 전',
    duration: '45:20',
    category: 'coding',
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=480&h=270&fit=crop',
  },
  {
    id: 'v6',
    title: '비전공자 개발자 취업, 이렇게 준비하세요',
    views: '56.7만',
    date: '3개월 전',
    duration: '28:54',
    category: 'career',
    thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&h=270&fit=crop',
  },
];

const COURSES = [
  {
    id: 'js',
    title: 'JavaScript 완전 정복',
    desc: '변수부터 비동기까지, 실무에서 바로 쓰는 자바스크립트 핵심 개념을 예제 중심으로 학습합니다.',
    price: '99,000원',
    priceOld: '149,000원',
    students: '4,820',
    rating: 4.9,
    reviews: 312,
    thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop',
    featured: false,
    badge: null,
    enrollValue: 'js',
  },
  {
    id: 'react',
    title: 'React & Next.js 마스터클래스',
    desc: 'React 훅부터 Next.js 14 App Router까지, 현업 수준의 웹 앱을 처음부터 끝까지 만들어봅니다.',
    price: '149,000원',
    priceOld: '220,000원',
    students: '3,241',
    rating: 4.8,
    reviews: 218,
    thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop',
    featured: true,
    badge: 'BEST',
    enrollValue: 'react',
  },
  {
    id: 'cs',
    title: '개발자 취업 부트캠프',
    desc: '코딩테스트, 포트폴리오, 기술 면접까지. 취업에 필요한 모든 것을 8주 커리큘럼으로 마스터합니다.',
    price: '299,000원',
    priceOld: '450,000원',
    students: '1,890',
    rating: 4.9,
    reviews: 156,
    thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop',
    featured: false,
    badge: 'NEW',
    enrollValue: 'cs',
  },
];

const BLOGS = [
  {
    title: '2026년 프론트엔드 개발자 로드맵 총정리',
    excerpt: '매년 바뀌는 프론트엔드 생태계, 올해는 무엇을 공부해야 할까요? 현직 개발자 시각에서 정리했습니다.',
    tag: '커리어',
    date: '2026.03.10',
    readTime: '8분',
    thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=300&fit=crop',
  },
  {
    title: 'async/await를 쓰면서 이건 꼭 알아야 해',
    excerpt: '에러 처리, 병렬 실행, 무한 루프 방지까지. 실무에서 자주 만나는 비동기 함정 5가지를 정리했습니다.',
    tag: '코딩',
    date: '2026.02.28',
    readTime: '12분',
    thumb: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=480&h=300&fit=crop',
  },
  {
    title: '개발자 사이드 프로젝트, 이렇게 수익화했습니다',
    excerpt: '6개월 만에 월 300만 원을 만든 사이드 프로젝트 이야기. 아이디어 선정부터 런칭까지 솔직하게.',
    tag: '브이로그',
    date: '2026.02.14',
    readTime: '10분',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=300&fit=crop',
  },
];

/* --------------------------------------------------
   RENDER FUNCTIONS
-------------------------------------------------- */
function renderVideos(filter = 'all') {
  const grid = document.getElementById('ytGrid');
  const filtered = filter === 'all' ? VIDEOS : VIDEOS.filter(v => v.category === filter);

  grid.innerHTML = filtered.map(v => `
    <div class="yt-card" data-id="${v.id}" data-title="${v.title}" data-aos>
      <div class="yt-thumb">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy" />
        <div class="yt-play-btn">
          <svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="68" height="48" rx="10" fill="#FF6B35" fill-opacity="0.9"/>
            <path d="M26 16L50 24L26 32V16Z" fill="white"/>
          </svg>
        </div>
        <span class="yt-duration">${v.duration}</span>
        <span class="yt-cat-badge">${categoryLabel(v.category)}</span>
      </div>
      <div class="yt-info">
        <h3>${v.title}</h3>
        <div class="yt-meta">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            ${v.views} 조회
          </span>
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            ${v.date}
          </span>
        </div>
      </div>
    </div>
  `).join('');

  // re-attach click handlers & AOS
  grid.querySelectorAll('.yt-card').forEach(card => {
    card.addEventListener('click', () => openVideoModal(card.dataset.title));
  });
  observeAOS(grid.querySelectorAll('[data-aos]'));
}

function categoryLabel(cat) {
  return { coding: '코딩', career: '커리어', vlog: '브이로그' }[cat] || cat;
}

function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  grid.innerHTML = COURSES.map(c => `
    <div class="course-card${c.featured ? ' course-card--featured' : ''}" data-aos>
      ${c.badge ? `<span class="course-badge">${c.badge}</span>` : ''}
      <div class="course-thumb">
        <img src="${c.thumb}" alt="${c.title}" loading="lazy" />
      </div>
      <div class="course-body">
        <h3 class="course-title">${c.title}</h3>
        <p class="course-desc">${c.desc}</p>
        <div class="course-stats">
          <span class="course-stat">
            <span class="course-stars">${starsHTML(c.rating)}</span>
            ${c.rating} (${c.reviews}개)
          </span>
          <span class="course-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            ${c.students}명 수강
          </span>
        </div>
        <div class="course-footer">
          <div>
            <span class="course-price-old">${c.priceOld}</span>
            <span class="course-price">${c.price}</span>
          </div>
          <button class="btn-enroll" data-course-id="${c.enrollValue}" data-course-title="${c.title}">수강 신청</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-enroll').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnrollModal(btn.dataset.courseId, btn.dataset.courseTitle);
    });
  });
  observeAOS(grid.querySelectorAll('[data-aos]'));
}

function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '½';
  return stars;
}

function renderBlogs() {
  const grid = document.getElementById('blogGrid');
  grid.innerHTML = BLOGS.map(b => `
    <article class="blog-card" data-aos>
      <div class="blog-thumb">
        <img src="${b.thumb}" alt="${b.title}" loading="lazy" />
      </div>
      <div class="blog-body">
        <span class="blog-tag">${b.tag}</span>
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-meta">
          <span>${b.date}</span>
          <span class="blog-dot"></span>
          <span>읽는 시간 ${b.readTime}</span>
        </div>
      </div>
    </article>
  `).join('');
  observeAOS(grid.querySelectorAll('[data-aos]'));
}

/* --------------------------------------------------
   SCROLL ANIMATIONS (AOS)
-------------------------------------------------- */
function observeAOS(elements) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => io.observe(el));
}

function initAOS() {
  observeAOS(document.querySelectorAll('[data-aos]'));
}

/* --------------------------------------------------
   COUNTER ANIMATION
-------------------------------------------------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic
    const current = Math.floor(eased * target);

    // Format number
    if (target >= 10000) {
      const k = (current / 1000).toFixed(1);
      el.textContent = k + '만' + suffix;
    } else {
      el.textContent = current.toLocaleString('ko-KR') + suffix;
    }

    if (progress < 1) requestAnimationFrame(tick);
    else {
      if (target >= 10000) {
        el.textContent = (target / 10000).toFixed(1).replace('.0', '') + '만' + suffix;
      } else {
        el.textContent = target.toLocaleString('ko-KR') + suffix;
      }
    }
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* --------------------------------------------------
   NAVIGATION
-------------------------------------------------- */
function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  // Scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navMenu.classList.toggle('mobile-open', open);
    hamburger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });

  // Close on nav link click (mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('mobile-open');
    });
  });
}

/* --------------------------------------------------
   YOUTUBE TABS
-------------------------------------------------- */
function initYtTabs() {
  const tabs = document.querySelectorAll('.yt-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderVideos(tab.dataset.tab);
    });
  });
}

/* --------------------------------------------------
   VIDEO MODAL
-------------------------------------------------- */
function openVideoModal(title) {
  const modal = document.getElementById('videoModal');
  document.getElementById('videoTitle').textContent = title;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('open');
  document.body.style.overflow = '';
}

function initVideoModal() {
  document.getElementById('videoModalClose').addEventListener('click', closeVideoModal);
  document.getElementById('videoModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeVideoModal();
  });
}

/* --------------------------------------------------
   ENROLL MODAL
-------------------------------------------------- */
function openEnrollModal(courseId, courseTitle) {
  const modal = document.getElementById('enrollModal');
  document.getElementById('enrollCourseTitle').textContent = courseTitle;
  const select = document.getElementById('enrollCourse');
  if (courseId) {
    const opt = [...select.options].find(o => o.value === courseId);
    if (opt) select.value = courseId;
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEnrollModal() {
  document.getElementById('enrollModal').classList.remove('open');
  document.body.style.overflow = '';
}

function initEnrollModal() {
  document.getElementById('enrollModalClose').addEventListener('click', closeEnrollModal);
  document.getElementById('enrollModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeEnrollModal();
  });

  document.getElementById('enrollForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('enrollName');
    const email = document.getElementById('enrollEmail');
    const course = document.getElementById('enrollCourse');
    const payment = document.querySelector('input[name="payment"]:checked');

    let valid = true;

    if (!name.value.trim()) {
      showFieldError('enrollNameError', name, '이름을 입력해주세요.');
      valid = false;
    } else {
      clearFieldError('enrollNameError', name);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFieldError('enrollEmailError', email, '올바른 이메일을 입력해주세요.');
      valid = false;
    } else {
      clearFieldError('enrollEmailError', email);
    }

    if (!course.value) {
      showFieldError('enrollCourseError', course, '강의를 선택해주세요.');
      valid = false;
    } else {
      clearFieldError('enrollCourseError', course);
    }

    if (!payment) {
      document.getElementById('enrollPaymentError').textContent = '결제 방법을 선택해주세요.';
      valid = false;
    } else {
      document.getElementById('enrollPaymentError').textContent = '';
    }

    if (!valid) return;

    // Save to localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push({
      name: name.value.trim(),
      email: email.value.trim(),
      course: course.options[course.selectedIndex].text,
      payment: payment.value,
      date: new Date().toISOString(),
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));

    closeEnrollModal();
    e.target.reset();
    showToast('수강 신청이 완료되었습니다! 이메일을 확인해주세요.');
  });
}

/* --------------------------------------------------
   CONTACT FORM
-------------------------------------------------- */
function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    let valid = true;

    const fields = [
      { el: name,    errId: 'contactNameError',    msg: '이름을 입력해주세요.' },
      { el: subject, errId: 'contactSubjectError', msg: '제목을 입력해주세요.' },
      { el: message, errId: 'contactMessageError', msg: '메시지를 입력해주세요.' },
    ];

    fields.forEach(({ el, errId, msg }) => {
      if (!el.value.trim()) {
        showFieldError(errId, el, msg);
        valid = false;
      } else {
        clearFieldError(errId, el);
      }
    });

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFieldError('contactEmailError', email, '올바른 이메일을 입력해주세요.');
      valid = false;
    } else {
      clearFieldError('contactEmailError', email);
    }

    if (!valid) return;

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    e.target.reset();
    showToast('메시지가 전송되었습니다. 빠르게 회신드리겠습니다!');
  });
}

/* --------------------------------------------------
   VALIDATION HELPERS
-------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(errId, inputEl, msg) {
  document.getElementById(errId).textContent = msg;
  inputEl.classList.add('error');
}

function clearFieldError(errId, inputEl) {
  document.getElementById(errId).textContent = '';
  inputEl.classList.remove('error');
}

/* --------------------------------------------------
   TOAST
-------------------------------------------------- */
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

/* --------------------------------------------------
   SMOOTH SCROLL (for nav links)
-------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* --------------------------------------------------
   KEYBOARD ACCESSIBILITY
-------------------------------------------------- */
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeEnrollModal();
    }
  });
}

/* --------------------------------------------------
   INIT
-------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderVideos();
  renderCourses();
  renderBlogs();

  initAOS();
  initCounters();
  initNav();
  initYtTabs();
  initVideoModal();
  initEnrollModal();
  initContactForm();
  initSmoothScroll();
  initKeyboard();
});
