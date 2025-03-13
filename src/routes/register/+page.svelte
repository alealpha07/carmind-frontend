<script lang="ts">
	import AuthService from '$services/AuthService';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let name = $state('');
	let surname = $state('');
	let birthDate = $state(new Date());
	let error = $state();

	let errorShow = $derived.by(() => {
		let result = error != '' && error != null;
		if (result) {
			setTimeout(() => {
				error = '';
			}, 75500);
		}
		return result;
	});

	async function register() {
		try {
			await AuthService.register(username, password, confirmPassword, name, surname, birthDate);
			goto(`/login`, { replaceState: true });
		} catch (err: any) {
			error = err.response.data;
		}
	}
</script>

<svelte:head>
	<title>{$_('register')}</title>
</svelte:head>

<div class="container">
	<div class="row justify-content-center align-content-center">
		<div class="col-12 col-sm-8 col-md-6 col-lg-4">
			<div class="row">
				<div class="col-12">
					<h1>{$_('register')}</h1>
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
					<div class="col-12">
						<label for="form-password"><b>{$_('profile.confirm_password')}</b></label> <br />
						<input id="form-password" type="password" bind:value={confirmPassword} placeholder={$_('profile.confirm_password')} />
					</div>
					<div class="col-12">
						<label for="form-name"><b>{$_('profile.name')}</b></label> <br />
						<input id="form-name" type="text" bind:value={name} placeholder={$_('profile.name')} />
					</div>
					<div class="col-12">
						<label for="form-surname"><b>{$_('profile.surname')}</b></label> <br />
						<input id="form-surname" type="text" bind:value={surname} placeholder={$_('profile.surname')} />
					</div>

					<div class="col-12">
						<label for="form-date"><b>{$_('profile.birth_date')}</b></label> <br />
						<input id="form-date" type="date" bind:value={birthDate} placeholder={$_('profile.birth_date')} />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<button onclick={() => register()}>{$_('register')}</button>
					<p style="width:100%; text-align:center;">
						{$_('register.message')} <a href="/login">{$_('login')}</a>
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
