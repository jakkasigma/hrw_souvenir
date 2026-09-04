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
    var elements = document.querySelectorAll('.reveal, .about-slide, .about-panel');
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
      // Nonaktif di mobile — mencegah gambar terlihat lebih kecil saat scroll
      if (window.innerWidth <= 768) {
        img.style.transform = '';
        return;
      }
      var scrollY = window.scrollY;
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
     PRODUCTS DIMMER — gelap saat welcome naik
     ============================================ */
  function initProductsDimmer() {
    var dimmer    = document.getElementById('products-dimmer');
    var welcomeEl = document.querySelector('.hg-welcome');
    if (!dimmer || !welcomeEl) return;

    function handleScroll() {
      var rect = welcomeEl.getBoundingClientRect();
      var vh   = window.innerHeight;

      // welcomeEl.top = vh    → belum masuk (opacity 0)
      // welcomeEl.top = 0     → sudah full layar (opacity max)
      // Range: dari vh sampai 0
      var progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      var opacity  = Math.min(progress * 0.75, 0.65);

      dimmer.style.background = 'rgba(20,19,17,' + opacity + ')';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }


  /* ============================================
     WELCOME DIMMER — gelap saat feature naik
     ============================================ */
  function initWelcomeDimmer() {
    var dimmer    = document.getElementById('welcome-dimmer');
    var featureEl = document.querySelector('.hg-feature-pin .hg-feature');
    if (!dimmer || !featureEl) return;

    function handleScroll() {
      var rect = featureEl.getBoundingClientRect();
      var vh   = window.innerHeight;

      // featureEl.top = vh  → belum masuk (opacity 0)
      // featureEl.top = 0   → sudah full layar (opacity max)
      var progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      var opacity  = Math.min(progress * 0.75, 0.65);

      dimmer.style.background = 'rgba(20,19,17,' + opacity + ')';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }


  /* ============================================
     ABOUT SCROLL CINEMA
     Panel berganti saat scroll, stage tetap diam
     ============================================ */
  function initAboutCinema() {
    var wrap   = document.getElementById('asc-wrap');
    var panels = document.querySelectorAll('.asc-panel');
    var dots   = document.querySelectorAll('.asc-dot');
    if (!wrap || !panels.length) return;

    var totalPanels  = panels.length;
    var currentPanel = 0;
    var isMobile     = window.innerWidth <= 768;
    var isAnimating  = false;

    function showPanel(index) {
      panels.forEach(function(p, i) {
        p.classList.remove('is-active', 'is-leaving');
        if (i === index) {
          p.classList.add('is-active');
        } else if (i < index) {
          p.classList.add('is-leaving');
        }
      });
      dots.forEach(function(d, i) {
        d.classList.toggle('is-active', i === index);
      });
      currentPanel = index;
    }

    /* === DESKTOP — scroll progress biasa === */
    function handleScroll() {
      if (window.innerWidth <= 768) return;
      var rect     = wrap.getBoundingClientRect();
      var scrolled = -rect.top;
      var total    = wrap.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      var progress = Math.min(Math.max(scrolled / total, 0), 1);
      var index    = Math.min(Math.floor(progress * totalPanels), totalPanels - 1);
      if (index !== currentPanel) showPanel(index);
    }

    /* === MOBILE — swipe / wheel per panel === */
    function goNext() {
      if (isAnimating) return;
      if (currentPanel < totalPanels - 1) {
        isAnimating = true;
        showPanel(currentPanel + 1);
        setTimeout(function() { isAnimating = false; }, 600);
      }
    }

    function goPrev() {
      if (isAnimating) return;
      if (currentPanel > 0) {
        isAnimating = true;
        showPanel(currentPanel - 1);
        setTimeout(function() { isAnimating = false; }, 600);
      }
    }

    function initMobileSwipe() {
      var touchStartY  = 0;
      var touchStartX  = 0;
      var minSwipeDist = 50;

      // Touch swipe
      wrap.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      wrap.addEventListener('touchend', function(e) {
        var dy = touchStartY - e.changedTouches[0].clientY;
        var dx = Math.abs(touchStartX - e.changedTouches[0].clientX);
        // Hanya trigger kalau gerak vertikal lebih dominan
        if (Math.abs(dy) < minSwipeDist || dx > Math.abs(dy)) return;
        if (dy > 0) goNext(); else goPrev();
      }, { passive: true });

      // Wheel scroll di mobile (trackpad/mouse pada tablet)
      wrap.addEventListener('wheel', function(e) {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        if (e.deltaY > 30) goNext();
        else if (e.deltaY < -30) goPrev();
      }, { passive: false });

      // Keyboard arrow
      document.addEventListener('keydown', function(e) {
        if (window.innerWidth > 768) return;
        if (!wrap.getBoundingClientRect) return;
        var r = wrap.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goPrev();
      });
    }

    function setMobileHeight() {
      // Mobile: wrap cukup 100vh, tidak perlu ruang scroll panjang
      if (window.innerWidth <= 768) {
        wrap.style.height = '100vh';
        wrap.style.overflow = 'hidden';
      } else {
        wrap.style.height = '';
        wrap.style.overflow = '';
      }
    }

    // Klik dot
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          showPanel(i);
        } else {
          var total  = wrap.offsetHeight - window.innerHeight;
          var target = wrap.offsetTop + (i / totalPanels) * total;
          window.scrollTo({ top: target, behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', function() {
      setMobileHeight();
    });

    setMobileHeight();
    initMobileSwipe();
    showPanel(0);
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
    initYear();
    initProductPinScroll();
    initSmoothScroll();
    initWelcomeBorderRadius();
    initProductsDimmer();
    initWelcomeDimmer();
    initAboutCinema();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();