// var CACHE_NAME = 'pwa-todo-app';
var CACHE_NAME = 'pwa-todo-app-v2';

var urlsToCache = [
    '/'
];

// Install a service worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installed')
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }
//                 return fetch(event.request);
//             }
//             )
//     );
// });


// ============ NEW ===============
// On fetch, use cache but update the entry with the latest contents from the server.
self.addEventListener('fetch', e => {
    e.respondWith(fromCache(e.request));
    e.waitUntil(
        update(e.request)
            .then(refresh)
    )
})

const fromCache = request => {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request);
    })
}

const update = request => {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone().then(function () {
                return response;
            }))
        })
    })
}

function refresh(response) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            var message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            }
            client.postMessage(JSON.stringify(message))
        })
    })
}

// ===========================


// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-todo-app'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});