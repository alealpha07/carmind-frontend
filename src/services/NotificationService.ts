import axios from 'axios';
import { locale } from 'svelte-i18n';
const NOTIFICATION_URL: string = import.meta.env.VITE_NOTIFICATION_URL;
const PUBLIC_VAPID_KEY: string = import.meta.env.VITE_PUBLIC_VAPID_KEY;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class NotificationService {
	static async register() {
		if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
			console.error('Push notifications not supported');
			return;
		}

		const permission = await Notification.requestPermission();
		if (permission !== 'granted') {
			console.warn('Notification permission denied');
			return;
		}

		try {
			const swReg = await navigator.serviceWorker.register('/sw.js');
			const sw = await navigator.serviceWorker.ready;
			sw.active?.postMessage({ notificationUrl: NOTIFICATION_URL });
			//console.log('Service Worker registered:', swReg);

			const subscription = await this.createSubscriptionUser(swReg);
			//console.log("User subscriped", subscription)
			if (subscription) {
				await this.sendSubscriptionToServer(subscription);
			}
		} catch (error) {
			console.error('Error registering Service Worker:', error);
		}
	}

	private static async createSubscriptionUser(swReg: any) {
		const vapidPublicKey = PUBLIC_VAPID_KEY;
		const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

		try {
			const subscription = await swReg.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: convertedVapidKey
			});
			return subscription;
		} catch (error) {
			console.error('Subscription error:', error);
			return null;
		}
	}

	private static async sendSubscriptionToServer(subscription: any) {
		await axios.post(`${BASE_URL}/subscribe`, subscription, { withCredentials: true });
	}

	private static urlBase64ToUint8Array(base64String: any) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
		const rawData = atob(base64);
		return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
	}
}

export default NotificationService;
