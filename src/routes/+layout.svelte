<script lang="ts" module>
	import { browser } from '$app/environment';
	import '$lib/i18n';
	import { locale, locales, waitLocale, getLocaleFromNavigator } from 'svelte-i18n';

	if (browser) {
		locale.set(getLocaleFromNavigator()?.split('-')[0]);
		locale.set(!!localStorage.getItem('lang') ? localStorage.getItem('lang') : getLocaleFromNavigator()?.split('-')[0]);
	}
	await waitLocale();
</script>

<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import '../grid.css';
	let currentLocale: string = $state('');
	let currentLocales: Array<string> = $state([]);
	locale.subscribe((value) => {
		currentLocale = value as string;
	});
	locales.subscribe((value) => {
		currentLocales = value;
	});
	function updateLocale(event: any) {
		locale.set(event.target.value);
		localStorage.setItem('lang', event.target.value);
	}
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			® {new Date().getFullYear()} <b>Alessandro Prati & Armando Scuotto</b>
		</p>
		<select onchange={updateLocale}>
			{#each currentLocales as lang}
				<option selected={currentLocale == lang} value={lang}>{lang}</option>
			{/each}
		</select>
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
		position: relative;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
