// Offline shell for Canopy: Bud Empire. Hashed assets are cached first; the page itself is network-first so deploys land.
const CACHE = 'canopy-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/assets/') || /\.(png|svg|webmanifest)$/.test(url.pathname)) {
    event.respondWith(caches.open(CACHE).then(async cache => {
      const hit = await cache.match(request);
      if (hit) return hit;
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    }));
    return;
  }
  event.respondWith(fetch(request).then(response => {
    if (response.ok && request.mode === 'navigate') caches.open(CACHE).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(() => caches.match(request).then(hit => hit || caches.match('./'))));
});
