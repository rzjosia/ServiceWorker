const cacheVersion = "v16";

const staticAssets = [
    "./index.html",
    "./main.js",
    "./favicon.ico",
    "./img/icons/logo-192x192.png"
];

self.addEventListener('install', (event) => {
    console.log('[service-worker] installation');
    self.skipWaiting();
    event.waitUntil(
        caches.open(`static-assets-${cacheVersion}`)
        .then((cache) => {
            return cache.addAll(staticAssets);
        })
    )
})

self.addEventListener('activate', (event) => {
    console.log('[service-worker] activation');
    event.waitUntil(
        caches.keys().then((keys) => {
            keys.map(cacheName => {
                if (cacheName.indexOf(cacheVersion) < 0) {
                    return caches.delete(cacheName);
                }
            })
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(`static-assets-${cacheVersion}`).then((cache) => {
            return cache.match(event.request).then((response) => {
                if (response) {
                    console.log(`[service-worker] found ${event.request} in cache`);
                    return response;
                } else {
                    return fetch(event.request);
                }
            })
        })
    )
})