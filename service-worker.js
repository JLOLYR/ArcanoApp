// service-worker.js (Versión Corregida con tu estructura de carpetas)

const CACHE_NAME = 'arcano-app-cache-v3'; // Incrementamos la versión otra vez
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './Iconos/sun.png',              /* Ruta correcta */
    './Iconos/icon-192x192.png',    /* Ruta correcta */
    './Iconos/icon-512x512.png'     /* Ruta correcta */
];

// Evento de Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto, guardando archivos principales.');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de Activación: Limpia cachés antiguas.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});