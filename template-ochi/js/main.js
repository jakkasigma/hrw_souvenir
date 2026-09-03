/**
 * OCHI-STYLE TEMPLATE MOTION
 * Original implementation: Lenis smooth scroll, GSAP reveals, stacking, eyes, hover split text.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  document.body.classList.add('is-loading');

  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
    });

    const raf = (time) => {
      if (!window.gsap) lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    gsap.set('.ochi-header', { y: -24, autoAlpha: 0 });
    gsap.set('.ochi-hero__badge', { width: 0, scaleX: 0.2, transformOrigin: 'left center' });

    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    intro
      .to('.ochi-title__inner', {
        y: 0,
        duration: 1.35,
        stagger: 0.12,
      })
      .to('.ochi-hero__badge', {
        width: 'clamp(5.5rem, 10vw, 10.5rem)',
        scaleX: 1,
        duration: 1.1,
      }, '-=1.05')
      .to('.ochi-header', {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
      }, '-=0.75')
      .to('.ochi-hero__bottom', {
        y: 0,
        opacity: 1,
        duration: 0.9,
      }, '-=0.6')
      .call(() => document.body.classList.remove('is-loading'));

    gsap.utils.toArray('.ochi-marquee, .ochi-statement, .ochi-projects, .ochi-cta, .ochi-footer').forEach((section, index) => {
      gsap.fromTo(section,
        { y: index === 0 ? 80 : 140, borderTopLeftRadius: 64, borderTopRightRadius: 64 },
        {
          y: 0,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        }
      );
    });

    ScrollTrigger.create({
      trigger: '.ochi-hero',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: '.ochi-eyes',
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: false,
    });

    gsap.to('.ochi-eyes__bg', {
      scale: 1.15,
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ochi-eyes',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.from('.ochi-statement__headline', {
      y: 60,
      opacity: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ochi-statement',
        start: 'top 70%',
        end: 'top 30%',
        scrub: true,
      }
    });

    gsap.utils.toArray('.ochi-card').forEach((card) => {
      gsap.from(card, {
        y: 70,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scrub: true,
        }
      });
    });
  }

  const track = document.querySelector('.ochi-marquee__track');
  let marqueeX = 0;
  let scrollVelocity = 0;
  let lastY = window.scrollY;

  function moveMarquee() {
    if (track) {
      const currentY = window.scrollY;
      scrollVelocity += (currentY - lastY) * 0.012;
      scrollVelocity *= 0.92;
      lastY = currentY;
      marqueeX -= 1.45 + scrollVelocity;
      track.style.transform = `translate3d(${marqueeX}px,0,0)`;
      if (Math.abs(marqueeX) > track.scrollWidth / 2) marqueeX = 0;
    }
    requestAnimationFrame(moveMarquee);
  }
  moveMarquee();

  const eyes = [document.getElementById('eye-left'), document.getElementById('eye-right')].filter(Boolean);
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const smooth = { x: mouse.x, y: mouse.y };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  function animateEyes() {
    smooth.x += (mouse.x - smooth.x) * 0.11;
    smooth.y += (mouse.y - smooth.y) * 0.11;

    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(smooth.y - cy, smooth.x - cx);
      const deg = angle * 180 / Math.PI;
      const dist = Math.min(Math.hypot(smooth.x - cx, smooth.y - cy) / 16, 18);
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;

      const line = eye.querySelector('.ochi-eye__line');
      if (line) line.style.transform = `rotate(${deg - 180}deg)`;
      eye.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(animateEyes);
  }
  animateEyes();

  document.querySelectorAll('.ochi-card__hover-text').forEach((label) => {
    const text = label.textContent.trim();
    label.innerHTML = text.split('').map((char) => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');
  });

  document.querySelectorAll('.ochi-card').forEach((card) => {
    const label = card.querySelector('.ochi-card__hover-text');
    const chars = label ? label.querySelectorAll('span') : [];
    const img = card.querySelector('.ochi-card__media img');

    card.addEventListener('mouseenter', () => {
      if (!label || typeof gsap === 'undefined') return;
      gsap.to(label, { opacity: 1, duration: 0.15 });
      gsap.to(chars, { y: 0, duration: 0.55, stagger: 0.035, ease: 'expo.out' });
      if (img) gsap.to(img, { scale: 1.07, duration: 0.7, ease: 'power3.out' });
    });

    card.addEventListener('mouseleave', () => {
      if (!label || typeof gsap === 'undefined') return;
      gsap.to(chars, { y: '110%', duration: 0.4, stagger: 0.02, ease: 'power3.in' });
      gsap.to(label, { opacity: 0, duration: 0.2, delay: 0.18 });
      if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: 'power3.out' });
    });
  });

  const header = document.getElementById('header');
  let prevScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      header.style.transform = y > 120 && y > prevScroll ? 'translateY(-100%)' : 'translateY(0)';
      header.style.backgroundColor = y > 60 ? 'rgba(241,241,241,0.82)' : 'transparent';
    }
    prevScroll = y;
  }, { passive: true });
});
