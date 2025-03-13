import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Carmind',
				short_name: 'Carmind',
				start_url: '/vehicles',
				display: 'standalone',
				background_color: '#eaeaea',
				theme_color: '#3498db',
				icons: [
					{
						src: '/icons/icon-48x48.png',
						sizes: '48x48',
						type: 'image/png'
					},
					{
						src: '/icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png'
					},
					{
						src: '/icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png'
					},
					{
						src: '/icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: '/icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png'
					},
					{
						src: '/icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png'
					},
					{
						src: '/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png'
					},
					{
						src: '/icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				navigateFallback: '/vehicles'
			}
		})
	]
});
