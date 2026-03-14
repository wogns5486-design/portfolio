/* =========================================
   WEDDING INVITATION - Script
   김민준 ♥ 이서윤
   ========================================= */

(function () {
  'use strict';

  /* ============================================================
     1. FALLING PETALS
  ============================================================ */
  function initPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;

    const PETAL_COUNT = 22;
    for (let i = 0; i < PETAL_COUNT; i++) {
      createPetal(container, i, PETAL_COUNT);
    }
  }

  function createPetal(container, index, total) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const leftPercent = (index / total) * 105 - 2;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 12;
    const size = 12 + Math.random() * 14;
    const rotation = Math.random() * 360;
    const hue = Math.random() > 0.5;

    petal.style.cssText = `
      left: ${leftPercent}%;
      width: ${size}px;
      height: ${size * 1.25}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      animation-name: petalFall;
      opacity: 0;
      background: radial-gradient(ellipse at 40% 35%, ${
        hue ? '#FDDECF, #EBB09A' : '#FAC9B2, #E59E84'
      });
      transform: rotate(${rotation}deg);
    `;

    container.appendChild(petal);
  }

  /* ============================================================
     2. SCROLL REVEAL
  ============================================================ */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      elements.forEach((el) => observer.observe(el));
    } else {
      elements.forEach((el) => el.classList.add('visible'));
    }
  }

  /* ============================================================
     3. CALENDAR — Render correct May 2025
  ============================================================ */
  function renderCalendar() {
    const grid = document.querySelector('.calendar-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const WEDDING_DAY = 24;
    const MONTH = 4;
    const YEAR = 2025;

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    dayNames.forEach((name, i) => {
      const el = document.createElement('div');
      el.className = 'cal-day-name';
      el.textContent = name;
      if (i === 0) el.style.color = '#E07070';
      if (i === 6) el.style.color = '#5B8FD4';
      grid.appendChild(el);
    });

    const firstDay = new Date(YEAR, MONTH, 1).getDay();
    const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-empty';
      grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (firstDay + day - 1) % 7;
      const el = document.createElement('div');
      el.className = 'cal-day';

      if (dayOfWeek === 0) el.classList.add('sun');
      if (dayOfWeek === 6) el.classList.add('sat');

      if (day === WEDDING_DAY) {
        el.classList.add('highlight');
        el.setAttribute('aria-label', '결혼식 날짜 5월 24일');
        const span = document.createElement('span');
        span.textContent = day;
        el.appendChild(span);
      } else {
        el.textContent = day;
      }

      grid.appendChild(el);
    }
  }

  /* ============================================================
     4. COUNTDOWN TIMER
  ============================================================ */
  function initCountdown() {
    const weddingDate = new Date('2025-05-24T14:00:00');
    const daysEl    = document.getElementById('ddayDays');
    const hoursEl   = document.getElementById('ddayHours');
    const minutesEl = document.getElementById('ddayMinutes');
    const secondsEl = document.getElementById('ddaySeconds');

    if (!daysEl) return;

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function update() {
      const now  = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00';
        const label = document.querySelector('.dday-label');
        if (label) label.textContent = '행복한 결혼을 축하합니다! ♥';
        return;
      }

      const totalSec = Math.floor(diff / 1000);
      daysEl.textContent    = pad(Math.floor(totalSec / 86400));
      hoursEl.textContent   = pad(Math.floor((totalSec % 86400) / 3600));
      minutesEl.textContent = pad(Math.floor((totalSec % 3600) / 60));
      secondsEl.textContent = pad(totalSec % 60);
    }

    update();
    setInterval(update, 1000);
  }

  /* ============================================================
     5. GALLERY LIGHTBOX
  ============================================================ */
  function initGallery() {
    const items       = document.querySelectorAll('.gallery-item img');
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn    = document.getElementById('lightboxClose');
    const prevBtn     = document.getElementById('lightboxPrev');
    const nextBtn     = document.getElementById('lightboxNext');

    if (!lightbox || !items.length) return;

    let currentIndex = 0;
    const srcs = Array.from(items).map((img) => ({ src: img.src, alt: img.alt }));

    function openAt(index) {
      currentIndex = (index + srcs.length) % srcs.length;
      lightboxImg.src = srcs[currentIndex].src;
      lightboxImg.alt = srcs[currentIndex].alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    items.forEach((img, i) => {
      img.parentElement.addEventListener('click', () => openAt(i));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => openAt(currentIndex - 1));
    nextBtn.addEventListener('click', () => openAt(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  openAt(currentIndex - 1);
      if (e.key === 'ArrowRight') openAt(currentIndex + 1);
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? openAt(currentIndex + 1) : openAt(currentIndex - 1);
      }
    }, { passive: true });
  }

  /* ============================================================
     6. ACCOUNT COPY
  ============================================================ */
  function initAccountCopy() {
    const buttons = document.querySelectorAll('.btn-copy');
    const toast   = document.getElementById('copyToast');
    let toastTimeout = null;

    buttons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const account = btn.dataset.account;
        const name    = btn.dataset.name;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(account);
          } else {
            const el = document.createElement('textarea');
            el.value = account;
            el.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }

          const original = btn.textContent;
          btn.textContent = '복사됨 ✓';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);

          showToast(`${name} 계좌번호가 복사되었습니다`);
        } catch (err) {
          showToast('복사에 실패했습니다. 직접 입력해 주세요.');
        }
      });
    });

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
    }
  }

  /* ============================================================
     7. GUESTBOOK — localStorage 연동
  ============================================================ */
  const GUESTBOOK_KEY = 'wedding_guestbook_messages';

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(GUESTBOOK_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(messages));
  }

  function formatTime(isoString) {
    const date = new Date(isoString);
    const now  = new Date();
    const diffMs  = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr  = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1)  return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHr  < 24) return `${diffHr}시간 전`;
    if (diffDay < 7)  return `${diffDay}일 전`;

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderMessageCard(msg, prepend) {
    const list = document.getElementById('messagesList');
    if (!list) return;

    const card = document.createElement('div');
    card.className = 'message-card' + (prepend ? ' new-message' : '');
    card.dataset.id = msg.id;
    card.innerHTML = `
      <div class="message-header">
        <span class="message-name">${escapeHtml(msg.name)}</span>
        <span class="message-relation">${escapeHtml(msg.relation)}</span>
        <span class="message-time">${formatTime(msg.createdAt)}</span>
        <button class="message-delete" data-id="${msg.id}" aria-label="삭제">✕</button>
      </div>
      <p class="message-text">${escapeHtml(msg.message)}</p>
    `;

    card.querySelector('.message-delete').addEventListener('click', () => {
      deleteMessage(msg.id);
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateX(20px)';
      setTimeout(() => card.remove(), 300);
    });

    if (prepend) {
      list.insertBefore(card, list.firstChild);
    } else {
      list.appendChild(card);
    }
  }

  function deleteMessage(id) {
    const messages = loadMessages().filter(m => m.id !== id);
    saveMessages(messages);
  }

  function initGuestbook() {
    const form      = document.getElementById('guestbookForm');
    const textarea  = document.getElementById('guestMessage');
    const charCount = document.getElementById('charCount');
    const list      = document.getElementById('messagesList');

    if (!form) return;

    // Clear static placeholder messages and load from localStorage
    if (list) {
      list.innerHTML = '';
      const stored = loadMessages();
      if (stored.length === 0) {
        // Seed with initial sample messages so it doesn't look empty
        const samples = [
          { id: 'seed1', name: '박지현', relation: '친구', message: '민준이 서윤이 결혼 너무 축하해! 두 사람 정말 잘 어울려. 앞으로도 행복하게 살아~ ❤️', createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
          { id: 'seed2', name: '최승현', relation: '직장동료', message: '두 분의 결혼을 진심으로 축하드립니다. 언제나 건강하고 행복한 가정 이루시길 바랍니다.', createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
          { id: 'seed3', name: '김예린', relation: '친구', message: '서윤아 드디어 결혼하는구나! 꽃길만 걸어! 결혼 정말 축하해 💐', createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
        ];
        saveMessages(samples);
        samples.forEach(msg => renderMessageCard(msg, false));
      } else {
        stored.forEach(msg => renderMessageCard(msg, false));
      }
    }

    // Character counter
    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        charCount.textContent = textarea.value.length;
      });
    }

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name     = document.getElementById('guestName').value.trim();
      const relation = document.getElementById('guestRelation').value;
      const message  = textarea.value.trim();

      if (!name) {
        alert('이름을 입력해 주세요.');
        document.getElementById('guestName').focus();
        return;
      }
      if (!message) {
        alert('메시지를 입력해 주세요.');
        textarea.focus();
        return;
      }

      const msg = {
        id: Date.now().toString(),
        name,
        relation,
        message,
        createdAt: new Date().toISOString(),
      };

      const messages = loadMessages();
      messages.unshift(msg);
      saveMessages(messages);

      renderMessageCard(msg, true);

      form.reset();
      if (charCount) charCount.textContent = '0';

      const firstCard = list.querySelector('.message-card');
      if (firstCard) firstCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ============================================================
     8. KAKAO SHARE (클립보드 복사 + 토스트)
  ============================================================ */
  function initKakaoShare() {
    const btn = document.getElementById('kakaoShareBtn');
    if (!btn) return;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = window.location.href;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          const el = document.createElement('textarea');
          el.value = url;
          el.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }
        showShareToast('링크가 복사되었습니다 🔗');
      } catch (err) {
        showShareToast('링크 복사에 실패했습니다.');
      }
    });
  }

  function showShareToast(message) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ============================================================
     9. SMOOTH SCROLL for anchor links
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    initPetals();
    initScrollReveal();
    renderCalendar();
    initCountdown();
    initGallery();
    initAccountCopy();
    initGuestbook();
    initKakaoShare();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
