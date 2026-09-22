// Offline shell for Canopy: Bud Empire. Hashed assets are cached first; the page itself is network-first so deploys land.
// The build stamps CACHE with the script hash (scripts/make-classic.mjs) so old asset caches are dropped on activate.
const CACHE = 'canopy-Co7g2I-B';
const FONT_CACHE = 'canopy-fonts';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Google Fonts: the CSS is keyed by user agent, the woff2 files are immutable. Serve both from a separate cache
  // that survives deploys, refreshing in the background, so an installed shop keeps its typography offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(FONT_CACHE).then(async cache => {
      const hit = await cache.match(request);
      const refresh = fetch(request).then(response => {
        // The @import stylesheet comes back opaque (no-cors); the woff2 files come back with CORS and a status.
        if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
        return response;
      }).catch(() => hit);
      return hit || refresh;
    }));
    return;
  }
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
