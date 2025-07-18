const CACHE_NAME = 'vvv-store-cache-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/app-utilities.js',
    '/images/logo.png',
    '/offline.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(function() {
                    return caches.match('/offline.html');
                });
            })
    );
});
