/* Rithvik City service worker — V30 lean first-visit cache + fast repeats. */
const CACHE_VERSION = "rithvik-city-v30";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => !key.startsWith(CACHE_VERSION)).map(key => caches.delete(key)));
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (_error) {}
    }
    await self.clients.claim();
  })());
});

async function networkFirst(request, event) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const preload = event?.preloadResponse ? await event.preloadResponse : null;
    const response = preload || await fetch(request);
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  } catch (_error) {
    return (await cache.match(request)) || (await cache.match("./index.html")) || Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    return cached || Response.error();
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request, event));
    return;
  }

  if (["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener("message", event => {
  if (!event.data || event.data.type !== "WARM_CACHE" || !Array.isArray(event.data.urls)) return;
  const urls = [...new Set(event.data.urls)].filter(Boolean);

  event.waitUntil((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const batchSize = 2;
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await Promise.allSettled(batch.map(async url => {
        try {
          const request = new Request(url, { credentials: "same-origin", cache: "default" });
          if (await cache.match(request)) return;
          const response = await fetch(request);
          if (response && response.ok) await cache.put(request, response.clone());
        } catch (_error) {}
      }));
      await new Promise(resolve => setTimeout(resolve, 40));
    }
  })());
});
