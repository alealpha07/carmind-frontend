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

self.addEventListener('fetch', async (event) => {
    const { request } = event;

    if (request.url.includes('/vehicle')) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            event.respondWith(cachedResponse);
        }
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open('vehicles-cache');
            cache.put(request, networkResponse.clone());
            event.respondWith(networkResponse);
        } catch (error) {
            console.error('Network request failed, and no cache is available:', error);
            event.respondWith(new Response('Network error and no cache available', { status: 503 }));
        }
    }

    if (request.url.includes('/auth/user')) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            event.respondWith(cachedResponse);
        }
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open('user-cache');
            cache.put(request, networkResponse.clone());
            event.respondWith(networkResponse);
        } catch (error) {
            console.error('Network request failed, and no cache is available:', error);
            event.respondWith(new Response('Network error and no cache available', { status: 503 }));
        }
    }

    if (request.url.includes('/upload/available')) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            event.respondWith(cachedResponse);
        }
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open('image-available-cache');
            cache.put(request, networkResponse.clone());
            event.respondWith(networkResponse);
        } catch (error) {
            console.error('Network request failed, and no cache is available:', error);
            event.respondWith(new Response('Network error and no cache available', { status: 503 }));
        }
    }

    /*if (request.url.includes('/upload')) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            event.respondWith(cachedResponse);
        }
        try {
            console.log(request)
            const networkResponse = await fetch(request);
            console.log(networkResponse)
            if (networkResponse.ok && networkResponse.headers.get('Content-Type').startsWith('image')) {
                const clonedResponse = networkResponse.clone();
                const responseBlob = await clonedResponse.blob();
                const cache = await caches.open('images-cache');
                cache.put(request, new Response(responseBlob, { status: 200, statusText: 'OK' }));
                event.respondWith(networkResponse);
            } else {
                console.log("error")
                event.respondWith(new Response('Not an image', { status: 404 }));
            }
        } catch (error) {
            console.error('Network request failed for image and no cache available:', error);
            event.respondWith(new Response('Network error and no cache available', { status: 503 }));
        }
    }*/
});
