/* Rithvik City runtime helpers — small, dependency-free utilities shared by main.js. */
(() => {
  "use strict";

  const loadedImages = new Map();

  function frameBlend(rate, delta) {
    return 1 - Math.exp(-Math.max(0, rate) * Math.max(0, delta));
  }

  function preloadImage(src) {
    if (!src) return Promise.resolve(false);
    if (loadedImages.has(src)) return loadedImages.get(src);
    const promise = new Promise(resolve => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
    loadedImages.set(src, promise);
    return promise;
  }

  function preloadImages(sources = []) {
    return Promise.allSettled([...new Set(sources.filter(Boolean))].map(preloadImage));
  }

  function nextPaint() {
    return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  window.RithvikRuntime = Object.freeze({ frameBlend, preloadImage, preloadImages, nextPaint });
})();
