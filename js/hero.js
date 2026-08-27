/**
 * HRW Souvenir — Hero Video v2.0
 * Hanya dipakai di index.html.
 */
(function () {
  'use strict';
  const video = document.getElementById('hero-video');
  if (!video) return;
  const tryPlay = () => {
    const p = video.play();
    if (p !== undefined) p.catch(() => {});
  };
  video.readyState >= 3 ? tryPlay() : video.addEventListener('canplay', tryPlay, { once: true });
})();
