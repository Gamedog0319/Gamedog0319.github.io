/* Rithvik Portfolio runtime helpers — preload, scheduling and frame utilities. */
(() => {
  "use strict";

  const loadedImages = new Map();
  const retainedImages = new Map();

  function frameBlend(rate, delta) {
    return 1 - Math.exp(-Math.max(0, rate) * Math.max(0, delta));
  }

  function afterPaint() {
    if (document.hidden) return Promise.resolve();
    return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function nextPaint() {
    return afterPaint();
  }

  function idle(timeout = 1200) {
    return new Promise(resolve => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => resolve(), { timeout });
      } else {
        setTimeout(resolve, Math.min(timeout, 60));
      }
    });
  }

  async function preloadImage(src, { retain = true, priority = "low" } = {}) {
    if (!src) return false;
    if (loadedImages.has(src)) return loadedImages.get(src);

    const promise = new Promise(resolve => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.fetchPriority = priority;
      let settled = false;

      const complete = async ok => {
        if (settled) return;
        settled = true;
        if (ok && typeof img.decode === "function") {
          try { await img.decode(); } catch (_error) {}
        }
        if (ok && retain) retainedImages.set(src, img);
        if (!ok) loadedImages.delete(src); // allow a later retry after a transient failure
        resolve(ok);
      };

      img.onload = () => complete(true);
      img.onerror = () => complete(false);
      img.src = src;

      if (img.complete && img.naturalWidth > 0) complete(true);
    });

    loadedImages.set(src, promise);
    return promise;
  }

  async function preloadImages(sources = [], options = {}) {
    const unique = [...new Set(sources.filter(Boolean))];
    const batchSize = Math.max(1, options.batchSize || 2);
    const results = [];

    for (let i = 0; i < unique.length; i += batchSize) {
      const batch = unique.slice(i, i + batchSize);
      const settled = await Promise.allSettled(batch.map(src => preloadImage(src, options)));
      results.push(...settled);
      if (i + batchSize < unique.length) await idle(options.idleTimeout || 900);
    }
    return results;
  }

  function releaseRetainedImages() {
    retainedImages.clear();
  }

  async function runIdleQueue(tasks = [], { timeout = 1300, pauseEvery = 1 } = {}) {
    let completed = 0;
    for (let i = 0; i < tasks.length; i++) {
      await idle(timeout);
      try {
        await tasks[i]();
      } catch (error) {
        console.warn("Background warm-up task failed", error);
      }
      completed++;
      if (pauseEvery > 0 && completed % pauseEvery === 0) await afterPaint();
    }
    return completed;
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return null;
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=33", { scope: "./", updateViaCache: "none" });
      return registration;
    } catch (error) {
      console.warn("Service worker registration skipped", error);
      return null;
    }
  }

  async function warmServiceWorkerCache(urls = []) {
    if (!("serviceWorker" in navigator)) return false;
    const unique = [...new Set(urls.filter(Boolean))];
    if (!unique.length) return false;
    try {
      const registration = await navigator.serviceWorker.ready;
      const worker = registration.active || registration.waiting || registration.installing;
      if (!worker) return false;
      worker.postMessage({ type: "WARM_CACHE", urls: unique });
      return true;
    } catch (_error) {
      return false;
    }
  }

  window.RithvikRuntime = Object.freeze({
    frameBlend,
    preloadImage,
    preloadImages,
    releaseRetainedImages,
    nextPaint,
    afterPaint,
    idle,
    runIdleQueue,
    registerServiceWorker,
    warmServiceWorkerCache
  });
})();
