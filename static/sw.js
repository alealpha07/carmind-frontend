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

    console.log("Push data:", data);

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