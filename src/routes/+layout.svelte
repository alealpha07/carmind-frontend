<script lang="ts">
	import {localeReady} from '$lib/i18n';
	import Header from './Header.svelte';
	import {locale, locales} from 'svelte-i18n'
	import '../app.css';
	import '../grid.css';
	let currentLocale: string = $state('');
	let loading = $state(true);
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
	localeReady.then(() => {
        loading = false;
    });
	let { children } = $props();
</script>
{#if !loading}
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

{/if}

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
