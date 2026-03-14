/* ─── FlowPanel Dashboard Script ─────────────────────────────── */

/* ── Sidebar Toggle ─────────────────────────────────────────── */
const sidebar  = document.getElementById('sidebar');
const overlay  = document.getElementById('sidebarOverlay');
const menuBtn  = document.getElementById('menuToggle');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

/* ── Nav active state ───────────────────────────────────────── */
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    if (window.innerWidth < 900) closeSidebar();
  });
});

/* ── Counter Animation ──────────────────────────────────────── */
function animateCounter(el, target, prefix = '', suffix = '', duration = 1600) {
  const startTime = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-expo
    const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current  = target * eased;

    if (isDecimal) {
      el.textContent = prefix + current.toFixed(1) + suffix;
    } else if (target >= 1_000_000) {
      el.textContent = prefix + (current / 1_000_000).toFixed(2) + suffix;
    } else if (target >= 1_000) {
      el.textContent = prefix + Math.floor(current).toLocaleString('ko-KR') + suffix;
    } else {
      el.textContent = prefix + Math.floor(current) + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ── Bar Chart ──────────────────────────────────────────────── */
const chartData = {
  labels:  ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  revenue: [68, 82, 74, 91, 78, 95, 88, 102, 115, 98, 123, 138],
  orders:  [42, 55, 48, 62, 51, 70, 60, 75,  80, 68,  90, 105],
};

function buildBarChart() {
  const container = document.getElementById('barChart');
  const max = Math.max(...chartData.revenue, ...chartData.orders);

  chartData.labels.forEach((label, i) => {
    const revH    = Math.round((chartData.revenue[i] / max) * 100);
    const ordH    = Math.round((chartData.orders[i]  / max) * 100);
    const revVal  = (chartData.revenue[i] * 13.7).toFixed(0);
    const ordVal  = chartData.orders[i];

    const group = document.createElement('div');
    group.className = 'bar-group';
    group.innerHTML = `
      <div class="bar-bars">
        <div class="bar revenue" style="height:0%" data-h="${revH}">
          <div class="bar-tooltip">₩${Number(revVal).toLocaleString('ko-KR')}만</div>
        </div>
        <div class="bar orders" style="height:0%" data-h="${ordH}">
          <div class="bar-tooltip">${ordVal}건</div>
        </div>
      </div>
      <div class="bar-label">${label}</div>
    `;
    container.appendChild(group);
  });
}

function animateBars() {
  document.querySelectorAll('.bar').forEach((bar, idx) => {
    const targetH = bar.dataset.h;
    setTimeout(() => {
      bar.style.height = targetH + '%';
    }, idx * 25);
  });
}

/* ── SVG Sparkline ──────────────────────────────────────────── */
function buildSparkline() {
  const svg  = document.getElementById('sparkline');
  const W    = svg.clientWidth  || 300;
  const H    = svg.clientHeight || 80;
  const data = [30,45,28,60,50,72,65,80,70,88,75,95];
  const min  = Math.min(...data);
  const max  = Math.max(...data);

  const xs = data.map((_,i) => (i / (data.length - 1)) * W);
  const ys = data.map(d  => H - ((d - min) / (max - min)) * (H - 12) - 6);

  const d = xs.map((x,i) => `${i===0?'M':'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const area = d + ` L${W},${H} L0,${H} Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#6C5CE7" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#6C5CE7" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#sparkGrad)"/>
    <path d="${d}" fill="none" stroke="#8b7cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${xs.map((x,i) => `<circle cx="${x.toFixed(1)}" cy="${ys[i].toFixed(1)}" r="3" fill="#8b7cf8" opacity="0"/>`).join('')}
  `;

  // Animate path draw
  const path = svg.querySelector('path:last-of-type');
  const len  = path.getTotalLength ? path.getTotalLength() : 400;
  path.style.strokeDasharray  = len;
  path.style.strokeDashoffset = len;
  path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)';
  setTimeout(() => { path.style.strokeDashoffset = 0; }, 200);

  // Show dots on hover
  svg.querySelectorAll('circle').forEach((c,i) => {
    c.addEventListener('mouseenter', () => { c.setAttribute('opacity','1'); });
    c.addEventListener('mouseleave', () => { c.setAttribute('opacity','0'); });
  });
}

/* ── Intersection Observer to trigger animations ────────────── */
function setupObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      if (el.id === 'statCards') {
        // Counter animation
        animateCounter(document.getElementById('cntRevenue'),   48730000, '₩', '', 1800);
        animateCounter(document.getElementById('cntOrders'),    3847,     '',  '건', 1600);
        animateCounter(document.getElementById('cntMembers'),   128400,   '',  '명', 1700);
        animateCounter(document.getElementById('cntVisitors'),  924100,   '',  '', 1900);
      }

      if (el.id === 'barChart') {
        animateBars();
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.15 });

  const statCards  = document.getElementById('statCards');
  const barChart   = document.getElementById('barChart');
  if (statCards) observer.observe(statCards);
  if (barChart)  observer.observe(barChart);
}

/* ── Chart period chips ─────────────────────────────────────── */
function setupChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
      const group = this.closest('.card-actions');
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* ── Product bar widths ─────────────────────────────────────── */
function animateProductBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.product-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  const list = document.getElementById('productList');
  if (list) observer.observe(list);
}

/* ── Notification bell ──────────────────────────────────────── */
function setupNotifBell() {
  const bell = document.getElementById('notifBtn');
  if (!bell) return;
  bell.addEventListener('click', () => {
    const dot = bell.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
  });
}

/* ── Search keyboard shortcut ───────────────────────────────── */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const input = document.querySelector('.header-search input');
    if (input) input.focus();
  }
  if (e.key === 'Escape') {
    closeSidebar();
    const input = document.querySelector('.header-search input');
    if (input) input.blur();
  }
});

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildBarChart();
  buildSparkline();
  setupObserver();
  setupChips();
  animateProductBars();
  setupNotifBell();

  // Resize: rebuild sparkline
  window.addEventListener('resize', () => {
    buildSparkline();
  });
});
