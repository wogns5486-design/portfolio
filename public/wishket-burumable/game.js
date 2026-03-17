// ===== 설정 객체 =====
const GAME_CONFIG = {
  diceRollDuration: 900,
  moveStepDelay: 200,
  startBonus: 50,
  particleCount: 15,
  maxParticles: 50,
};

const BRAND = {
  name: 'POPUP MARBLE',
  logoTop: 'POPUP',
  logoBottom: 'MARBLE',
  primaryColor: '#FF6B35',
  secondaryColor: '#004E89',
  couponPrefix: 'POPUP',
};

// ===== 부루마블 보드 데이터 (9x9, 테두리 32칸, 시계방향) =====
const CELLS = [
  // ── 하단 (좌→우) 0~8 ──
  { name: '출발', icon: '🚀', type: 'corner', side: 'bottom', colorGroup: -1,
    event: { msg: '출발! 여행을 시작합니다! +50점', points: 50 } },
  { name: '제주도', icon: '🏝️', type: 'property', side: 'bottom', colorGroup: 0, price: '5만',
    event: { msg: '🏝️ 제주도 올레길 산책! +10점', points: 10 } },
  { name: '황금열쇠', icon: '🔑', type: 'golden', side: 'bottom', colorGroup: -1, event: null },
  { name: '부산', icon: '🌊', type: 'property', side: 'bottom', colorGroup: 0, price: '8만',
    event: { msg: '🌊 해운대 파도소리! +15점', points: 15 } },
  { name: '세금', icon: '💰', type: 'tax', side: 'bottom', colorGroup: -1,
    event: { msg: '💰 여행세 납부! -20점', points: -20 } },
  { name: '서울', icon: '🏙️', type: 'property', side: 'bottom', colorGroup: 1, price: '10만',
    event: { msg: '🏙️ 남산타워 야경! +20점', points: 20 } },
  { name: '찬스', icon: '❓', type: 'chance', side: 'bottom', colorGroup: -1, event: null },
  { name: '도쿄', icon: '🗼', type: 'property', side: 'bottom', colorGroup: 1, price: '12만',
    event: { msg: '🗼 시부야 스크램블! +20점', points: 20 } },
  { name: '무인도', icon: '🏖️', type: 'corner', side: 'corner', colorGroup: -1,
    event: { msg: '🏖️ 무인도에 표류... 1턴 쉼!', points: 0, skip: true } },

  // ── 우측 (아래→위) 9~15 ──
  { name: '베이징', icon: '🏯', type: 'property', side: 'right', colorGroup: 2, price: '14만',
    event: { msg: '🏯 만리장성 등반! +15점', points: 15 } },
  { name: '황금열쇠', icon: '🔑', type: 'golden', side: 'right', colorGroup: -1, event: null },
  { name: '마닐라', icon: '🌴', type: 'property', side: 'right', colorGroup: 2, price: '10만',
    event: { msg: '🌴 열대 과일 파티! +10점', points: 10 } },
  { name: '싱가포르', icon: '🦁', type: 'property', side: 'right', colorGroup: 3, price: '16만',
    event: { msg: '🦁 마리나베이 야경! +25점', points: 25 } },
  { name: '찬스', icon: '❓', type: 'chance', side: 'right', colorGroup: -1, event: null },
  { name: '카이로', icon: '🔺', type: 'property', side: 'right', colorGroup: 3, price: '15만',
    event: { msg: '🔺 피라미드 발굴! +20점', points: 20 } },
  { name: '이스탄불', icon: '🕌', type: 'property', side: 'right', colorGroup: 4, price: '18만',
    event: { msg: '🕌 그랜드 바자르! +20점', points: 20 } },

  // ── 우상 코너 ──
  { name: '우주여행', icon: '🚀', type: 'corner', side: 'corner', colorGroup: -1,
    event: { msg: '🚀 우주여행 보너스! +30점', points: 30 } },

  // ── 상단 (우→좌) 17~23 ──
  { name: '아테네', icon: '🏛️', type: 'property', side: 'top', colorGroup: 4, price: '16만',
    event: { msg: '🏛️ 파르테논 신전! +15점', points: 15 } },
  { name: '황금열쇠', icon: '🔑', type: 'golden', side: 'top', colorGroup: -1, event: null },
  { name: '코펜하겐', icon: '🧜', type: 'property', side: 'top', colorGroup: 5, price: '20만',
    event: { msg: '🧜 인어공주의 축복! +25점', points: 25 } },
  { name: '세금', icon: '💰', type: 'tax', side: 'top', colorGroup: -1,
    event: { msg: '💰 관광세! -15점', points: -15 } },
  { name: '스톡홀름', icon: '👑', type: 'property', side: 'top', colorGroup: 5, price: '22만',
    event: { msg: '👑 노벨상 시상식! +30점', points: 30 } },
  { name: '찬스', icon: '❓', type: 'chance', side: 'top', colorGroup: -1, event: null },
  { name: '베른', icon: '⛰️', type: 'property', side: 'top', colorGroup: 6, price: '25만',
    event: { msg: '⛰️ 알프스 정상! +25점', points: 25 } },

  // ── 좌상 코너 ──
  { name: '사회기금', icon: '🏦', type: 'corner', side: 'corner', colorGroup: -1,
    event: { msg: '🏦 기부는 아름다워! -10점', points: -10 } },

  // ── 좌측 (위→아래) 25~31 ──
  { name: '베를린', icon: '🧱', type: 'property', side: 'left', colorGroup: 6, price: '24만',
    event: { msg: '🧱 역사의 현장! +20점', points: 20 } },
  { name: '찬스', icon: '❓', type: 'chance', side: 'left', colorGroup: -1, event: null },
  { name: '마드리드', icon: '💃', type: 'property', side: 'left', colorGroup: 7, price: '28만',
    event: { msg: '💃 플라멩코의 열정! +25점', points: 25 } },
  { name: '황금열쇠', icon: '🔑', type: 'golden', side: 'left', colorGroup: -1, event: null },
  { name: '파리', icon: '🗼', type: 'property', side: 'left', colorGroup: 7, price: '35만',
    event: { msg: '🗼 에펠탑 꼭대기! +35점', points: 35 } },
  { name: '런던', icon: '🎡', type: 'property', side: 'left', colorGroup: 7, price: '40만',
    event: { msg: '🎡 런던아이에서 야경! +40점', points: 40 } },
  { name: '뉴욕', icon: '🗽', type: 'property', side: 'left', colorGroup: 7, price: '50만',
    event: { msg: '🗽 자유의 여신상! +50점', points: 50 } },
];

const TOTAL = CELLS.length;

// ===== 랜덤 이벤트 =====
const GOLDEN_EVENTS = [
  { msg: '🔑 복권 당첨! +40점', points: 40 },
  { msg: '🔑 길에서 돈 발견! +20점', points: 20 },
  { msg: '🔑 은행 이자! +15점', points: 15 },
  { msg: '🔑 생일 축하금! +30점', points: 30 },
  { msg: '🔑 교통비 환급! +10점', points: 10 },
  { msg: '🔑 갑작스런 세금! -25점', points: -25 },
  { msg: '🔑 병원비 지출! -15점', points: -15 },
];

const CHANCE_EVENTS = [
  { msg: '❓ 횡재! +35점', points: 35 },
  { msg: '❓ 행운의 별! +20점', points: 20 },
  { msg: '❓ 주식 대박! +45점', points: 45 },
  { msg: '❓ 과속 딱지! -20점', points: -20 },
  { msg: '❓ 기부 요청! -10점', points: -10 },
  { msg: '❓ 보너스 지급! +25점', points: 25 },
];

// ===== 상태 =====
const GameState = {
  playerPos: 0,
  moveCount: 0,
  totalPoints: 0,
  isRolling: false,
  gameComplete: false,
  skipNextTurn: false,
};

// ===== DOM 캐싱 =====
const DOM = {};
function cacheDom() {
  DOM.board = document.getElementById('board');
  DOM.rollBtn = document.getElementById('roll-btn');
  DOM.resetBtn = document.getElementById('reset-btn');
  DOM.dice1 = document.getElementById('dice1');
  DOM.dice2 = document.getElementById('dice2');
  DOM.diceResult = document.getElementById('dice-result');
  DOM.diceContainer = document.getElementById('dice-container');
  DOM.moveCount = document.getElementById('move-count');
  DOM.points = document.getElementById('points');
  DOM.currentPos = document.getElementById('current-pos');
  DOM.eventCard = document.getElementById('event-card');
  DOM.eventText = document.getElementById('event-text');
  DOM.particles = document.getElementById('particles');
  DOM.boardCenter = document.getElementById('board-center');
  DOM.introModal = document.getElementById('intro-modal');
  DOM.introStartBtn = document.getElementById('intro-start-btn');
  DOM.introLogoTop = document.getElementById('intro-logo-top');
  DOM.introLogoBottom = document.getElementById('intro-logo-bottom');
}

// ===== 그리드 좌표 (9x9) =====
function getGridPositions() {
  const p = [];
  for (let c = 0; c <= 8; c++) p.push({ row: 8, col: c });       // 하단
  for (let r = 7; r >= 1; r--) p.push({ row: r, col: 8 });        // 우측
  for (let c = 8; c >= 0; c--) p.push({ row: 0, col: c });        // 상단
  for (let r = 1; r <= 7; r++) p.push({ row: r, col: 0 });        // 좌측
  return p;
}
const GRID = getGridPositions();

// ===== 보드 생성 =====
function buildBoard() {
  DOM.board.innerHTML = '';
  const gridMap = Array.from({ length: 9 }, () => Array(9).fill(-1));
  GRID.forEach((pos, idx) => { gridMap[pos.row][pos.col] = idx; });

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const idx = gridMap[r][c];
      const div = document.createElement('div');

      if (idx >= 0) {
        const cell = CELLS[idx];
        const isCorner = (r === 0 || r === 8) && (c === 0 || c === 8);
        div.className = `cell type-${cell.type}`;
        if (isCorner) div.classList.add('corner');
        if (r === 8 && !isCorner) div.classList.add('side-bottom');
        else if (r === 0 && !isCorner) div.classList.add('side-top');
        else if (c === 0 && !isCorner) div.classList.add('side-left');
        else if (c === 8 && !isCorner) div.classList.add('side-right');
        div.id = `cell-${idx}`;

        if (cell.type === 'property' && cell.colorGroup >= 0) {
          const bar = document.createElement('div');
          bar.className = `cell-color-bar color-group-${cell.colorGroup}`;
          div.appendChild(bar);
        }

        const content = document.createElement('div');
        content.className = 'cell-content';
        content.innerHTML = `
          <span class="cell-icon">${cell.icon}</span>
          <span class="cell-name">${cell.name}</span>
          ${cell.price ? `<span class="cell-price">${cell.price}</span>` : ''}
        `;
        div.appendChild(content);

        if (idx === GameState.playerPos) {
          div.classList.add('active');
          const token = document.createElement('div');
          token.className = 'player-token';
          div.appendChild(token);
        }
      } else {
        div.className = 'cell inner';
      }
      DOM.board.appendChild(div);
    }
  }
}

// ===== 3D 주사위 생성 =====
const DICE_DOTS = {
  1: [0,0,0, 0,1,0, 0,0,0],
  2: [0,0,1, 0,0,0, 1,0,0],
  3: [0,0,1, 0,1,0, 1,0,0],
  4: [1,0,1, 0,0,0, 1,0,1],
  5: [1,0,1, 0,1,0, 1,0,1],
  6: [1,0,1, 1,0,1, 1,0,1],
};

// 3D 주사위의 각 면에 대한 회전값 (해당 면이 정면을 보도록)
const FACE_ROTATIONS = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateX(0deg) rotateY(-90deg)',
  3: 'rotateX(90deg) rotateY(0deg)',
  4: 'rotateX(-90deg) rotateY(0deg)',
  5: 'rotateX(0deg) rotateY(90deg)',
  6: 'rotateX(0deg) rotateY(180deg)',
};

function buildDiceFace(value) {
  const dots = DICE_DOTS[value];
  let html = '';
  for (let i = 0; i < 9; i++) {
    html += dots[i] ? '<div class="dice-dot"></div>' : '<div class="dice-dot hidden"></div>';
  }
  return html;
}

function initDice3D(diceEl) {
  const cube = diceEl.querySelector('.dice-cube');
  cube.innerHTML = '';
  for (let f = 1; f <= 6; f++) {
    const face = document.createElement('div');
    face.className = `dice-face face-${f}`;
    face.innerHTML = buildDiceFace(f);
    cube.appendChild(face);
  }
}

function setDiceValue(diceEl, value) {
  const cube = diceEl.querySelector('.dice-cube');
  cube.style.transform = FACE_ROTATIONS[value];
}

// ===== 파티클 이펙트 =====
function spawnParticles(x, y, count, colors) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const dist = Math.random() * 120 + 40;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 30;
    const dur = Math.random() * 0.6 + 0.4;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: ${color};
      --tx: ${tx}px; --ty: ${ty}px;
      --rot: ${Math.random() * 720 - 360}deg;
      --duration: ${dur}s;
    `;
    DOM.particles.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000);
  }
}

function getCellCenter(idx) {
  const el = document.getElementById(`cell-${idx}`);
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

// ===== 화면 흔들림 =====
function screenShake() {
  DOM.boardCenter.classList.add('screen-shake');
  setTimeout(() => DOM.boardCenter.classList.remove('screen-shake'), 400);
}

// ===== 이벤트 카드 애니메이션 =====
function showEventCard(msg, type) {
  DOM.eventCard.className = 'event-card';
  // 잠깐 리플로우 강제
  void DOM.eventCard.offsetWidth;
  DOM.eventCard.classList.add('flip');
  DOM.eventCard.classList.add(type); // positive, negative, special

  setTimeout(() => {
    DOM.eventText.textContent = msg;
  }, 250); // 플립 중간에 텍스트 교체
}

// ===== 주사위 굴리기 =====
async function rollDice() {
  if (GameState.isRolling || GameState.gameComplete) return;
  if (navigator.vibrate) navigator.vibrate(50);

  if (GameState.skipNextTurn) {
    GameState.skipNextTurn = false;
    GameState.moveCount++;
    DOM.moveCount.textContent = GameState.moveCount;
    showEventCard('무인도에서 탈출! 다음 턴에 이동하세요.', 'special');
    return;
  }

  Sound.init();
  Sound.diceRoll();
  GameState.isRolling = true;
  DOM.rollBtn.disabled = true;

  const cube1 = DOM.dice1.querySelector('.dice-cube');
  const cube2 = DOM.dice2.querySelector('.dice-cube');

  // 3D 롤링 애니메이션
  cube1.classList.add('rolling');
  cube2.classList.add('rolling');

  await sleep(GAME_CONFIG.diceRollDuration);

  // 최종 결과
  const v1 = Math.ceil(Math.random() * 6);
  const v2 = Math.ceil(Math.random() * 6);
  cube1.classList.remove('rolling');
  cube2.classList.remove('rolling');
  setDiceValue(DOM.dice1, v1);
  setDiceValue(DOM.dice2, v2);

  const total = v1 + v2;
  const isDouble = v1 === v2;

  DOM.diceResult.innerHTML = `${v1} + ${v2} = <strong>${total}</strong>`;
  if (isDouble) {
    DOM.diceResult.innerHTML += ' <span class="double-badge">DOUBLE!</span>';
    screenShake();
    // 더블 파티클
    const diceRect = DOM.diceContainer.getBoundingClientRect();
    spawnParticles(
      diceRect.left + diceRect.width / 2,
      diceRect.top + diceRect.height / 2,
      20,
      ['#FF6B35', '#FCBF49', '#FF6B9D', '#4D96FF']
    );
  }

  GameState.moveCount++;
  DOM.moveCount.textContent = GameState.moveCount;

  // 말 이동
  await movePlayer(total);

  // 이벤트 처리
  handleCellEvent();

  // 도착 파티클
  const pos = getCellCenter(GameState.playerPos);
  const cell = CELLS[GameState.playerPos];
  const pColors = cell.event && cell.event.points > 0
    ? ['#6BCB77', '#2ecc71', '#FCBF49']
    : cell.event && cell.event.points < 0
      ? ['#FF6B6B', '#e74c3c', '#FFA06B']
      : ['#4D96FF', '#9B72CF', '#2EC4B6'];
  spawnParticles(pos.x, pos.y, GAME_CONFIG.particleCount, pColors);

  // 완주 체크
  if (GameState.playerPos === 0 && GameState.moveCount > 1) {
    GameState.gameComplete = true;
    GameState.isRolling = false;
    await sleep(600);
    showCompleteModal();
  } else {
    GameState.isRolling = false;
    DOM.rollBtn.disabled = false;
    if (isDouble && !GameState.gameComplete && !GameState.skipNextTurn) {
      showEventCard(DOM.eventText.textContent + ' 🎯 더블! 한 번 더!', 'special');
    }
  }
}

// ===== 말 이동 (통통 바운스) =====
async function movePlayer(steps) {
  for (let i = 0; i < steps; i++) {
    // 이전 위치
    const prevCell = document.getElementById(`cell-${GameState.playerPos}`);
    if (prevCell) {
      prevCell.classList.remove('active');
      const tok = prevCell.querySelector('.player-token');
      if (tok) tok.remove();
    }

    GameState.playerPos = (GameState.playerPos + 1) % TOTAL;

    // 출발 통과 보너스
    if (GameState.playerPos === 0 && i < steps - 1) {
      GameState.totalPoints += GAME_CONFIG.startBonus;
      DOM.points.textContent = GameState.totalPoints;
    }

    // 새 위치
    const newCell = document.getElementById(`cell-${GameState.playerPos}`);
    if (newCell) {
      newCell.classList.add('active');
      const token = document.createElement('div');
      token.className = 'player-token bounce';
      newCell.appendChild(token);

      // 바운스 끝나면 클래스 제거
      token.addEventListener('animationend', () => token.classList.remove('bounce'));
    }

    Sound.step();
    await sleep(GAME_CONFIG.moveStepDelay);
  }

  DOM.currentPos.textContent = CELLS[GameState.playerPos].name;
}

// ===== 이벤트 처리 =====
function handleCellEvent() {
  const cell = CELLS[GameState.playerPos];
  let ev = cell.event;

  if (cell.type === 'golden') {
    ev = GOLDEN_EVENTS[Math.floor(Math.random() * GOLDEN_EVENTS.length)];
  }
  if (cell.type === 'chance') {
    ev = CHANCE_EVENTS[Math.floor(Math.random() * CHANCE_EVENTS.length)];
  }

  if (ev) {
    GameState.totalPoints = Math.max(0, GameState.totalPoints + ev.points);
    DOM.points.textContent = GameState.totalPoints;

    const cardType = ev.points > 0 ? 'positive' : ev.points < 0 ? 'negative' : 'special';
    if (ev.points > 0) Sound.positive();
    else if (ev.points < 0) Sound.negative();
    showEventCard(ev.msg, cardType);

    if (ev.skip) GameState.skipNextTurn = true;
  } else {
    showEventCard(`${cell.icon} ${cell.name}에 도착!`, 'special');
  }
}

// ===== 등급 판정 =====
function getGrade(points) {
  if (points >= 300) return { label: 'S', color: '#FFD700' };
  if (points >= 200) return { label: 'A', color: '#9B72CF' };
  if (points >= 100) return { label: 'B', color: '#4D96FF' };
  return { label: 'C', color: '#999' };
}

// ===== 쿠폰 코드 생성 =====
function generateCouponCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return BRAND.couponPrefix + '-' + suffix;
}

// ===== 결과 localStorage 저장 =====
function saveResult(score, turns, grade, couponCode) {
  const key = 'popup-marble-results';
  let results = [];
  try {
    results = JSON.parse(localStorage.getItem(key) || '[]');
  } catch (_) {
    results = [];
  }
  results.push({ score, turns, grade, couponCode, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(results));
}

// ===== 클립보드 복사 유틸 =====
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;opacity:0;';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
  return Promise.resolve();
}

// ===== 완주 모달 =====
function showCompleteModal() {
  Sound.complete();
  // 축하 파티클 폭발
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      spawnParticles(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6,
        25,
        ['#FF6B35', '#FCBF49', '#FF6B9D', '#4D96FF', '#6BCB77', '#9B72CF']
      );
    }, i * 200);
  }

  const grade = getGrade(GameState.totalPoints);
  const couponCode = generateCouponCode();
  saveResult(GameState.totalPoints, GameState.moveCount, grade.label, couponCode);

  const modal = document.createElement('div');
  modal.id = 'complete-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>🎉 세계 일주 완료!</h2>
      <p style="color:#666; margin-top:4px;">축하합니다!</p>
      <div class="final-score">${GameState.totalPoints}<span class="score-unit">점</span></div>
      <div class="grade-badge" style="color:${grade.color}; border-color:${grade.color};">${grade.label}</div>
      <p class="modal-info">${GameState.moveCount}턴 만에 완주!</p>
      <div class="coupon-section">
        <p class="coupon-label">🎟️ 쿠폰이 발급되었습니다!</p>
        <div class="coupon-code" id="coupon-code-box" title="클릭하여 복사">${couponCode}</div>
        <p class="coupon-hint">클릭하면 복사됩니다</p>
      </div>
      <div class="modal-actions">
        <button id="modal-share-btn" class="btn-share">📤 결과 공유하기</button>
        <button id="modal-reset-btn">🔄 다시 도전</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // 쿠폰 코드 클릭 복사
  document.getElementById('coupon-code-box').addEventListener('click', function () {
    copyToClipboard(couponCode).then(() => {
      this.textContent = '✅ 복사됨!';
      setTimeout(() => { this.textContent = couponCode; }, 1500);
    });
  });

  // 공유 버튼
  document.getElementById('modal-share-btn').addEventListener('click', () => {
    const shareText = `🎲 ${BRAND.name}에서 ${GameState.totalPoints}점으로 ${grade.label}등급 달성! 쿠폰코드: ${couponCode}`;
    if (navigator.share) {
      navigator.share({ title: BRAND.name, text: shareText }).catch(() => {});
    } else {
      copyToClipboard(shareText).then(() => {
        const btn = document.getElementById('modal-share-btn');
        if (btn) {
          btn.textContent = '✅ 클립보드에 복사됨!';
          setTimeout(() => { btn.textContent = '📤 결과 공유하기'; }, 2000);
        }
      });
    }
  });

  // 리셋 버튼
  document.getElementById('modal-reset-btn').addEventListener('click', resetGame);
}
// ===== 리셋 =====
function resetGame() {
  GameState.playerPos = 0;
  GameState.moveCount = 0;
  GameState.totalPoints = 0;
  GameState.isRolling = false;
  GameState.gameComplete = false;
  GameState.skipNextTurn = false;

  DOM.currentPos.textContent = '출발';
  DOM.moveCount.textContent = '0';
  DOM.points.textContent = '0';
  DOM.diceResult.textContent = '';
  DOM.rollBtn.disabled = false;

  DOM.eventCard.className = 'event-card';
  DOM.eventText.textContent = '주사위를 굴려 게임을 시작하세요!';

  const modal = document.getElementById('complete-modal');
  if (modal) modal.remove();

  // 파티클 정리
  DOM.particles.innerHTML = '';

  setDiceValue(DOM.dice1, 1);
  setDiceValue(DOM.dice2, 1);

  buildBoard();
}

// ===== 사운드 =====
const Sound = {
  ctx: null,
  enabled: true,

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },

  play(freq, duration, type = 'sine', gainVal = 0.3) {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  },

  diceRoll() {
    if (!this.enabled || !this.ctx) return;
    const freqs = [300, 250, 320, 270, 310, 260, 290];
    freqs.forEach((f, i) => {
      setTimeout(() => this.play(f, 0.07, 'square', 0.15), i * 80);
    });
  },

  step() {
    this.play(520, 0.06, 'sine', 0.2);
  },

  positive() {
    if (!this.enabled || !this.ctx) return;
    [440, 554, 659].forEach((f, i) => {
      setTimeout(() => this.play(f, 0.15, 'sine', 0.25), i * 80);
    });
  },

  negative() {
    if (!this.enabled || !this.ctx) return;
    [330, 277, 220].forEach((f, i) => {
      setTimeout(() => this.play(f, 0.15, 'sawtooth', 0.2), i * 90);
    });
  },

  complete() {
    if (!this.enabled || !this.ctx) return;
    const melody = [
      { f: 523, t: 0 },
      { f: 659, t: 150 },
      { f: 784, t: 300 },
      { f: 1047, t: 450 },
      { f: 784, t: 600 },
      { f: 1047, t: 750 },
    ];
    melody.forEach(({ f, t }) => {
      setTimeout(() => this.play(f, 0.25, 'sine', 0.3), t);
    });
  },

  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) btn.textContent = this.enabled ? '🔊' : '🔇';
  },
};

// ===== 유틸 =====
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== 인트로 모달 =====
function showIntroModal() {
  DOM.introLogoTop.textContent = BRAND.logoTop;
  DOM.introLogoBottom.textContent = BRAND.logoBottom;
  DOM.introStartBtn.addEventListener('click', () => {
    DOM.introModal.remove();
    DOM.introModal = null;
  });
}

// ===== 초기화 =====
cacheDom();

DOM.rollBtn.addEventListener('click', rollDice);
DOM.resetBtn.addEventListener('click', resetGame);

const soundToggleBtn = document.getElementById('sound-toggle-btn');
if (soundToggleBtn) soundToggleBtn.addEventListener('click', () => Sound.toggle());

document.addEventListener('keydown', (e) => {
  if (e.key !== ' ' && e.key !== 'Enter') return;
  e.preventDefault();
  // 인트로 모달이 열려 있으면 게임 시작
  if (DOM.introModal) {
    DOM.introModal.remove();
    return;
  }
  rollDice();
});

initDice3D(DOM.dice1);
initDice3D(DOM.dice2);
setDiceValue(DOM.dice1, 1);
setDiceValue(DOM.dice2, 1);
buildBoard();
showIntroModal();
