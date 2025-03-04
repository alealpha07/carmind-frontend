<script lang="ts" module>
	import { browser } from '$app/environment';
	import '$lib/i18n';
	import { locale, waitLocale, getLocaleFromNavigator } from 'svelte-i18n';

	if (browser) {
		locale.set(getLocaleFromNavigator()?.split('-')[0]);
	}
	await waitLocale();
</script>

<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import '../grid.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		min-height: fit-content;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
