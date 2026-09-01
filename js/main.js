/**
 * HRW Souvenir — Main Scripts v3.0
 * Nav overlay + scroll progress + reveal animation + hero parallax + product pin
 */
(function () {
  'use strict';

  /* ============================================
     NAV OVERLAY
     ============================================ */
  function initNav() {
    var toggle  = document.getElementById('nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    var isOpen = false;

    var open = function() {
      isOpen = true;
      overlay.classList.add('is-open');
      toggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    var close = function() {
      isOpen = false;
      overlay.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', function() { isOpen ? close() : open(); });
    overlay.querySelectorAll('[data-close]').forEach(function(l) {
      l.addEventListener('click', close);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  /* ============================================
     SCROLL PROGRESS INDICATOR
     ============================================ */
  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.height = progress + '%';
    }, { passive: true });
  }

  /* ============================================
     REVEAL ANIMATION — Fade Up on Scroll
     ============================================ */
  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length || !('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      elements.forEach(function(el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function(el) { observer.observe(el); });
  }

  /* ============================================
     HERO PARALLAX — subtle image shift on scroll
     ============================================ */
  function initHeroParallax() {
    var img = document.getElementById('hero-img');
    if (!img) return;

    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;
      // Shift image up at 20% of scroll speed — batas 180px max
      var shift = Math.min(scrollY * 0.18, 180);
      img.style.transform = 'translateY(' + shift + 'px)';
    }, { passive: true });
  }

  /* ============================================
     FOOTER YEAR
     ============================================ */
  function initYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================
     PRODUCT PIN SCROLL — Mobile image swap
     ============================================ */
  function initProductPinScroll() {
    var pinWrapper = document.getElementById('products-pin');
    if (!pinWrapper) return;

    var products = pinWrapper.querySelectorAll('.hg-product');
    if (!products.length) return;

    var thresholds = [0.08, 0.2, 0.32, 0.44];

    function handleScroll() {
      if (window.innerWidth > 768) {
        products.forEach(function(p) { p.classList.remove('is-revealed'); });
        return;
      }

      var rect      = pinWrapper.getBoundingClientRect();
      var navbarH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 56;
      var scrolled  = navbarH + 16 - rect.top;
      var totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      var progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      products.forEach(function(product, index) {
        var threshold = thresholds[index] || 0.5;
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


  /* ============================================
     WELCOME FULL — border radius hilang saat full layar
     ============================================ */
  function initWelcomeBorderRadius() {
    var welcomePin = document.getElementById('welcome-pin');
    var welcomeEl  = welcomePin ? welcomePin.querySelector('.hg-welcome') : null;
    if (!welcomePin || !welcomeEl) return;

    // Transisi CSS untuk smooth snap
    welcomeEl.style.transition = 'border-top-left-radius 0.35s ease, border-top-right-radius 0.35s ease';

    function handleScroll() {
      var rect = welcomeEl.getBoundingClientRect();

      // Welcome dianggap "full" saat top-nya sudah menyentuh atau melewati 0
      // (sudah naik sampai tepi atas viewport)
      if (rect.top <= 1) {
        welcomeEl.style.borderTopLeftRadius  = '0px';
        welcomeEl.style.borderTopRightRadius = '0px';
      } else {
        welcomeEl.style.borderTopLeftRadius  = '';
        welcomeEl.style.borderTopRightRadius = '';
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ============================================
     SMOOTH SCROLL — anchor links
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var id = link.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 64;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ============================================
     INIT
     ============================================ */
  function init() {
    initNav();
    initScrollProgress();
    initReveal();
    initHeroParallax();
    initYear();
    initProductPinScroll();
    initSmoothScroll();
    initWelcomeBorderRadius();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();