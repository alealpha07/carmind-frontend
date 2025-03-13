<script lang="ts">
	import AuthService from '$services/AuthService';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	let username = $state("");
	let password = $state("");
	let error = $state("");

	let errorShow = $derived.by(() => {
		let result = error != '' && error != null;
		if (result) {
			setTimeout(() => {
				error = '';
			}, 7500);
		}
		return result;
	});

	async function login() {
		try{
			await AuthService.login(username, password)
			isLoggedIn.set(true);
			goto(`/vehicles`, { replaceState: true });
		}
		catch{(err:any) => (error = err.response.data)};
	}
</script>

<svelte:head>
	<title>{$_('login')}</title>
</svelte:head>
<div class="container">
	<div class="row align-content-center justify-content-center">
		<div class="col-12 col-sm-8 col-md-6 col-lg-4">
			<div class="row">
				<div class="col-12">
					<h1>{$_('login')}</h1>
				</div>
			</div>
			<div class="row">
				{#if errorShow}
					<p class="error-box"><b>{error}</b></p>
				{/if}
			</div>
			<div class="row">
				<div class="row">
					<div class="col-12">
						<label for="form-username"><b>{$_('profile.email')}</b></label> <br />
						<input id="form-username" type="text" bind:value={username} placeholder={$_('profile.email')} />
					</div>
					<div class="col-12">
						<label for="form-password"><b>{$_('profile.password')}</b></label> <br />
						<input id="form-password" type="password" bind:value={password} placeholder={$_('profile.password')} />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 align-content-center">
					<button onclick={() => login()}>{$_('login')}</button>
					<p style="width:100%; text-align:center;">
						{$_('login.message')} <a href="/register">{$_('register')}</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.col-12 {
		margin-top: 5px;
	}

	input,
	button {
		width: calc(100% - 22px);
		margin: auto;
		display: block;
	}
</style>
