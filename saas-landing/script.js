// ===== Navigation Scroll =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
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

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked (if it wasn't already open)
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ===== Pricing Toggle =====
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');
let isYearly = false;

pricingToggle.addEventListener('click', () => {
  isYearly = !isYearly;
  pricingToggle.classList.toggle('yearly', isYearly);
  monthlyLabel.classList.toggle('active', !isYearly);
  yearlyLabel.classList.toggle('active', isYearly);

  document.querySelectorAll('.price-amount').forEach(el => {
    const monthly = el.dataset.monthly;
    const yearly = el.dataset.yearly;

    if (monthly === undefined || yearly === undefined) return;

    const price = isYearly ? yearly : monthly;
    if (Number(price) === 0) {
      el.textContent = '₩0';
    } else {
      el.textContent = '₩' + Number(price).toLocaleString();
    }
  });
});

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }

    requestAnimationFrame(update);
  });
}

// ===== Scroll Fade Animations =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
}

// Counter observer - animate when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== Add fade-up class to elements =====
const fadeSelectors = [
  '.section-header',
  '.feature-card',
  '.step',
  '.step-connector',
  '.pricing-card',
  '.testimonial-card',
  '.faq-item',
  '.cta-content',
  '.hero-badge',
  '.hero-title',
  '.hero-desc',
  '.hero-actions',
  '.hero-preview',
  '.logos',
  '.location-grid > *'
];

document.querySelectorAll(fadeSelectors.join(', ')).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

// ===== Init =====
setupScrollAnimations();
