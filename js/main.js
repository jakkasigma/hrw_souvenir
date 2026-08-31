/**
 * HRW Souvenir — Main Scripts v2.3
 * Nav overlay + smooth scroll + footer year
 */
(function () {
  'use strict';

  /* NAV OVERLAY */
  function initNav() {
    const toggle  = document.getElementById('nav-toggle');
    const overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    let isOpen = false;

    const open = () => {
      isOpen = true;
      overlay.classList.add('is-open');
      toggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      isOpen = false;
      overlay.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => (isOpen ? close() : open()));
    overlay.querySelectorAll('[data-close]').forEach((l) => l.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) close(); });
  }

  /* SMOOTH SCROLL */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')
        ) || 64;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth',
        });
      });
    });
  }

  /* FOOTER YEAR */
  function initYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* STICKY PIN SCROLL FOR 4 PRODUCTS (MOBILE ONLY <= 768px) */
  function initProductPinScroll() {
    const pinWrapper = document.getElementById('products-pin');
    if (!pinWrapper) return;

    const products = pinWrapper.querySelectorAll('.hg-product');
    if (!products.length) return;

    // Titik threshold scroll untuk 4 produk dari kiri ke kanan (0.0 - 1.0)
    const thresholds = [0.15, 0.35, 0.55, 0.75];

    function handleScroll() {
      // Jalankan efek pinning hanya di layar mobile / tablet <= 768px
      if (window.innerWidth > 768) {
        products.forEach((product) => product.classList.remove('is-revealed'));
        return;
      }

      const rect = pinWrapper.getBoundingClientRect();
      const navbarH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')
      ) || 56;

      // Jarak scroll yang telah dilewati di dalam wrapper pin
      const scrolled = navbarH + 16 - rect.top;
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Terapkan transisi pergantian foto dari kiri ke kanan secara bertahap di mobile
      products.forEach((product, index) => {
        const threshold = thresholds[index] || 0.5;
        if (progress >= threshold) {
          product.classList.add('is-revealed');
        } else {
          product.classList.remove('is-revealed');
        }
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
  }

  function init() {
    initNav();
    initSmoothScroll();
    initYear();
    initProductPinScroll();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
