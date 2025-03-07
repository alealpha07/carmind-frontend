<script>
	import { page } from '$app/state';
	import AuthService from '$services/AuthService';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '../stores/auth';
	import { onMount } from 'svelte';
	import favicon from '$lib/images/favicon.png';
	let loggedIn = false;
	$: isLoggedIn.subscribe((value) => {
		loggedIn = value;
	});
	onMount(() => {
		AuthService.getUser()
			.then(() => {
				isLoggedIn.set(true);
			})
			.catch(() => {
				isLoggedIn.set(false);
			});
	});

	function logout() {
		AuthService.logout().then(() => {
			isLoggedIn.set(false);
			if (page.url.pathname != '/about' && page.url.pathname != '/') {
				goto(`/`, { replaceState: true });
			}
		});
	}
</script>

<header style="max-width: 100%; overflow:hidden;">
	<div class="corner">
		<a href="/">
			<img width="100%" src={favicon} alt="Favicon" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			{#if loggedIn}
				<li aria-current={page.url.pathname.startsWith('/vehicles') ? 'page' : undefined}>
					<a href="/vehicles">
						<p class="nav-text"><b>{$_('vehicles.title')}</b></p>
						<span class="mdi--car nav-icon"></span>
					</a>
				</li>
				<li aria-current={page.url.pathname.startsWith('/profile') ? 'page' : undefined}>
					<a href="/profile">
						<p class="nav-text"><b>{$_('profile.title')}</b></p>
						<span class="mdi--user nav-icon"></span>
					</a>
				</li>
			{/if}
			<li aria-current={page.url.pathname.startsWith('/login') ? 'page' : undefined}>
				{#if loggedIn}
					<button on:click={logout}>{$_('logout')}</button>
				{:else}
					<a href="/login">{$_('login')}</a>
				{/if}
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="/about" style="color: transparent; width: fit-content;">
			<span class="mdi--about-circle-outline">About</span>
		</a>
	</div>
</header>

<style>
	@media only screen and (max-width: 576px) {
		.nav-text {
			display: none;
		}
		.nav-icon {
			display: inline-block !important;
		}

		.corner {
			width: 5em !important;
		}

		.corner img {
			width: 5em !important;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 8em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 8em;
		height: 3em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a,
	button {
		display: flex;
		height: 80%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		transition-property: none;
		border: solid transparent 1px;
		cursor: pointer;
		background-color: transparent;
		margin-top: 5px;
	}

	button:hover {
		color: var(--color-text-light);
		background-color: var(--color-theme-1);
		border-color: var(--color-theme-1);
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.mdi--about-circle-outline {
		display: inline-block;
		margin: 0;
		width: 32px;
		height: 32px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z'/%3E%3C/svg%3E");
		background-color: var(--color-text);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	a:hover .nav-icon,
	a:hover .mdi--about-circle-outline {
		background-color: var(--color-theme-1) !important;
	}

	.mdi--car {
		display: none;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8z'/%3E%3C/svg%3E");
		background-color: var(--color-text);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.mdi--user {
		display: none;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4'/%3E%3C/svg%3E");
		background-color: var(--color-text);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
