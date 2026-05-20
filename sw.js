// ══════════════════════════════════════════
//  Chef Santosh — Service Worker  v02.05
// ══════════════════════════════════════════

const CACHE_NAME   = 'chef-santosh-v2';
const STATIC_CACHE = 'chef-santosh-static-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// ── Install: pre-cache core assets ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS.map(url => {
        // Use no-cors for cross-origin resources
        if (url.startsWith('http')) return new Request(url, { mode: 'no-cors' });
        return url;
      })))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Pre-cache partial failure:', err))
  );
});

// ── Activate: clean old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  const allowedCaches = [CACHE_NAME, STATIC_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !allowedCaches.includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for static, network-first for API ─────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache Anthropic API calls
  if (url.hostname === 'api.anthropic.com') return;

  // Network-first for navigation (always get fresh HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (!response || response.status !== 200 && response.type !== 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return response;
        });
      })
      .catch(() => {
        // Offline fallback for images
        if (request.destination === 'image') return caches.match('./icons/icon-192.png');
      })
  );
});

// ── Background Sync placeholder ──────────────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-recipes') {
    console.log('[SW] Background sync: sync-recipes');
  }
});

// ── Push notifications placeholder ──────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'Chef Santosh', body: 'You have a new notification' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Chef Santosh', {
      body: data.body || '',
      icon: './icons/icon-192.png',
      badge: './icons/icon-96.png'
    })
  );
});
