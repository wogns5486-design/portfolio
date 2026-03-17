import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (prefersReducedMotion) return;

  // Hero entrance
  const heroLabel = document.querySelector('.hero-label');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-desc');
  const heroTags = document.querySelector('.hero-tags');
  const heroCta = document.querySelector('.hero-cta');

  if (heroLabel) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(heroLabel, { y: 30, opacity: 0, duration: 0.6 })
      .from(heroTitle, { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(heroDesc, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(heroTags, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(heroCta, { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');
  }

  // Scroll reveal for sections
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  });

  // Stagger cards
  gsap.utils.toArray<HTMLElement>('[data-stagger-parent]').forEach((parent) => {
    const children = parent.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });

  // Stats count-up enhanced with GSAP
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count!);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.val));
      },
    });
  });

  // Parallax orbs
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.3');
    gsap.to(el, {
      y: () => -ScrollTrigger.maxScroll(window) * speed * 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  });
}
