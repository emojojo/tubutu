const CACHE_NAME = 'tubutu-garden-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app_v2.js',
  './data.js',
  './weather_data.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Use Stale-While-Revalidate strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, networkResponse.clone());
            }
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if network fails
      });
      return cachedResponse || fetchPromise;
    })
  );
});
