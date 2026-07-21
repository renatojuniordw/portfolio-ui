const CACHE_NAME = "portfolio-v1";
const STATIC_ASSETS = [
  "/",
  "/offline.html",
  "/RenatoBezerra.png",
  "/Profile.pdf",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache, then offline
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET and browser extension requests
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  // HTML navigation requests: Network First
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline.html")),
        ),
    );
    return;
  }

  // Static assets: Cache First
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    }),
  );
});
