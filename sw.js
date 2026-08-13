/* Rithvik City service worker — fast repeat visits without stale HTML. */
const CACHE_VERSION = "rithvik-city-v21";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./assets/css/style.css?v=21",
  "./assets/css/mobile.css?v=21",
  "./assets/js/modules/runtime.js?v=21",
  "./assets/js/modules/world-boundaries.js?v=21",
  "./assets/js/main.js?v=21",
  "./favicon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => !key.startsWith(CACHE_VERSION)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (_error) {
    return (await cache.match(request)) || (await cache.match("./index.html"));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === "opaque")) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (["style", "script", "image", "font", "video"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener("message", event => {
  if (!event.data || event.data.type !== "WARM_CACHE" || !Array.isArray(event.data.urls)) return;
  const urls = [...new Set(event.data.urls)].filter(Boolean);
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then(async cache => {
      for (const url of urls) {
        try {
          const request = new Request(url, { credentials: "same-origin" });
          const existing = await cache.match(request);
          if (existing) continue;
          const response = await fetch(request);
          if (response && (response.ok || response.type === "opaque")) await cache.put(request, response.clone());
        } catch (_error) {}
      }
    })
  );
});
