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

  function init() {
    initNav();
    initSmoothScroll();
    initYear();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
