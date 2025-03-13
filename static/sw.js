let NOTIFICATION_URL = "";

self.addEventListener("message", (event) => {
    if (event.data) {
        NOTIFICATION_URL = event.data.notificationUrl || NOTIFICATION_URL;
    }
});

self.addEventListener("push", async (event) => {
    //console.log("Push event received:", event);

    if (!event.data) {
        console.error("Push event has no data");
        return;
    }

    let data;
    try {
        data = event.data.json();
    } catch (error) {
        console.error("Failed to parse push data:", error);
        return;
    }

    // console.log("Push data:", data);

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/favicon.png",
        badge: "/favicon.png",
        requireInteraction: true,
    }).catch(err => console.error("Error displaying notification:", err));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(NOTIFICATION_URL));
});

const CACHE_LIMIT = 50;

self.addEventListener('fetch', async (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    let cacheName = null;
    if (request.url.includes('/vehicle')) cacheName = 'vehicles-cache';
    else if (request.url.includes('/auth/user')) cacheName = 'user-cache';
    else if (request.url.includes('/upload/available')) cacheName = 'image-available-cache';

    if (!cacheName) return;

    event.respondWith(handleRequest(request, cacheName));
});

async function handleRequest(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) return cachedResponse;

    try {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());

        limitCacheSize(cacheName);

        return networkResponse;
    } catch (error) {
        console.error(`Network request failed for ${request.url}:`, error);
        return new Response('Network error and no cache available', { status: 503 });
    }
}

async function limitCacheSize(cacheName) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > CACHE_LIMIT) {
        await cache.delete(keys[0]);
    }
}
