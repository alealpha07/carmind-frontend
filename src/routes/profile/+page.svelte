<script lang="ts">
	import AuthService from '$services/AuthService';
	import type { User, Field } from '$types';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import DataForm from '$lib/components/DataForm.svelte';
	import { _, getLocaleFromNavigator } from 'svelte-i18n';

	let user: User = $state({
		id: 0,
		email: '',
		name: '',
		surname: '',
		birthDate: new Date(),
		password: '',
		confirmNewPassword: '',
		newPassword: ''
	});
	let showDialog = $state(false);
	let formData: object = $state({});
	let formFields: Array<Field> = $state([]);
	let formClickRight: Function = $state(() => {});
	let formTitle = $state('');
	let formError = $state('');
	let formSuccessMessage: string = $state('');
	let showSuccess = $derived.by(() => {
		let result = formSuccessMessage != '' && formSuccessMessage != null;
		if (result) {
			setTimeout(() => {
				formSuccessMessage = '';
			}, 5000);
		}
		return result;
	});

	onMount(() => {
		reloadUser();
	});

	async function reloadUser() {
		try {
			user = (await AuthService.getUser()) as User;
			isLoggedIn.set(true);
		} catch {
			goto(`/`, { replaceState: true });
		}
	}

	function formatDate(date: Date) {
		date = new Date(date);
		return date.toLocaleDateString(getLocaleFromNavigator() as string);
	}

	function showResetPasswordDialog() {
		formData = { password: '', newPassword: '', confirmNewPassword: '' };
		formFields = [
			{ type: 'password', label: $_('profile.old_password'), key: 'password' },
			{ type: 'password', label: $_('profile.new_password'), key: 'newPassword' },
			{ type: 'password', label: $_('profile.confirm_new_password'), key: 'confirmNewPassword' }
		];
		formClickRight = confirmResetPassword;
		formTitle = $_('profile.reset_password');
		showDialog = true;
	}

	function showEditProfileDialog() {
		formData = { name: user.name, surname: user.surname, birthDate: user.birthDate };
		formFields = [
			{ type: 'text', label: $_('profile.name'), key: 'name' },
			{ type: 'text', label: $_('profile.surname'), key: 'surname' },
			{ type: 'date', label: $_('profile.birth_date'), key: 'birthDate' }
		];
		formClickRight = confirmEditProfile;
		formTitle = $_('profile.edit');
		showDialog = true;
	}

	function resetForm() {
		showDialog = false;
		formData = [];
		formFields = [];
		formTitle = '';
		formError = '';
		formClickRight = () => {};
	}

	async function confirmResetPassword(result: User) {
		try {
			const res = await AuthService.resetPassword(result.password, result.newPassword, result.confirmNewPassword);
			formSuccessMessage = res as string;
			resetForm();
		} catch (err: any) {
			formError = err.response.data;
		}
	}

	async function confirmEditProfile(result: User) {
		try {
			const res = await AuthService.editProfile(result.name, result.surname, result.birthDate);
			await reloadUser();
			formSuccessMessage = res as string;
			resetForm();
		} catch (err: any) {
			formError = err.response.data;
		}
	}
</script>

<svelte:head>
	<title>{$_('profile.title')}</title>
</svelte:head>

<Dialog show={showDialog} style="top: 20vh;">
	<h1>{formTitle}</h1>
	<DataForm
		data={formData}
		fields={formFields}
		bind:error={formError}
		buttonLeft={{ label: $_('buttons.cancel') }}
		buttonRight={{ label: $_('buttons.confirm') }}
		clickLeft={resetForm}
		clickRight={formClickRight}
	></DataForm>
</Dialog>
<Dialog unpersistent show={showSuccess} style="background-color: transparent; border: none; box-shadow: none; bottom: 10px; margin-right: 30px;">
	<p class="success-box"><b>{formSuccessMessage}</b></p>
</Dialog>
<div class="container" style="padding-top: 25px;">
	<div class="row">
		<h1><b>{user.name} {user.surname}</b></h1>
	</div>
	<div class="row justify-content-center align-content-center">
		<div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
			<div id="main-card" class="container justify-content-center">
				<div id="user-icon-container">
					<span class="mdi mdi--account"></span>
				</div>
				<div class="row">
					<div class="align-container">
						<span style="margin-right: 50px;" class="mdi mdi--user-outline"></span>
						<article>{user.name} {user.surname}</article>
					</div>
				</div>
				<div class="row">
					<div class="align-container">
						<span style="margin-right: 50px;" class="mdi mdi--email-outline"></span>
						<article data-fulltext={user.email}>{user.email}</article>
					</div>
				</div>
				<div class="row">
					<div class="align-container">
						<span style="margin-right: 50px;" class="mdi mdi--cake-variant-outline"></span>
						<article>{formatDate(user.birthDate)}</article>
					</div>
				</div>
				<div class="row">
					<div class="align-container">
						<span style="margin-right: 50px;" class="mdi mdi--lock-outline"></span>
						<article style="width: 70% !important;">{$_('profile.reset_password')}</article>
						<button id="reset-password-btn" aria-label={$_('profile.reset_password')} onclick={showResetPasswordDialog}>
							<span style="margin-left: 5px;" class="mdi mdi--reload"></span>
						</button>
					</div>
				</div>
				<div class="row">
					<button style="width: 85%; margin: auto; margin-top: 30px; margin-bottom: 20px;" onclick={showEditProfileDialog}>
						{$_('profile.edit')}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#main-card {
		position: relative;
		border: none;
		background-color: var(--color-bg-3);
		border-radius: 15px;
		box-shadow: 10px 10px 10px var(--color-bg-5);
		padding: 15px;
		padding-top: 70px;
		margin: auto;
		margin-top: 50px;
		width: calc(100% - 30px);
		box-shadow: 0 0 5px 4px var(--color-bg-5);
	}

	#user-icon-container {
		position: absolute;
		top: -50px;
		width: fit-content;
		height: fit-content;
		border-radius: 50%;
		padding: 15px;
		background-color: var(--color-bg-3);
		box-shadow: 0px -5px 3px var(--color-bg-5);
		left: calc(50% - 47px);
	}

	.row article {
		font-size: 18px;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		white-space: normal;
	}

	.mdi--account {
		width: 65px;
		height: 65px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4'/%3E%3C/svg%3E");
		background-color: var(--color-theme-1);
	}

	.mdi--user-outline {
		width: 40px;
		height: 40px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1'/%3E%3C/svg%3E");
		background-color: var(--color-text);
	}

	.mdi--email-outline {
		width: 36px;
		height: 36px;
		margin-left: 2px;
		margin-right: 2px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z'/%3E%3C/svg%3E");
		background-color: var(--color-text);
	}

	.mdi--cake-variant-outline {
		width: 36px;
		height: 36px;
		margin-left: 2px;
		margin-right: 2px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 6a2 2 0 0 0 2-2c0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03c0 1.1.9 2 2 2m6 3h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9c0-1.66-1.34-3-3-3m1 11H5v-3c.9 0 1.76-.37 2.4-1l1.1-1.08L9.56 16c1.31 1.3 3.59 1.29 4.89 0l1.08-1.08L16.6 16c.64.63 1.5 1 2.4 1zm0-4.5c-.5 0-1-.2-1.35-.57L15.5 12.8l-2.12 2.13c-.74.74-2.03.74-2.77 0L8.5 12.8l-2.16 2.13c-.34.36-.84.57-1.34.57V12c0-.55.45-1 1-1h12c.55 0 1 .45 1 1z'/%3E%3C/svg%3E");
		background-color: var(--color-text);
	}

	.mdi--lock-outline {
		width: 36px;
		height: 36px;
		margin-left: 2px;
		margin-right: 2px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3'/%3E%3C/svg%3E");
		background-color: var(--color-text);
	}

	.mdi--reload {
		width: 32px;
		height: 32px;
		margin-left: 2px;
		margin-right: 2px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.7 6.7 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95S18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0'/%3E%3C/svg%3E");
		background-color: var(--color-text);
	}
	.mdi--reload:hover {
		background-color: var(--color-theme-1);
		cursor: pointer;
	}

	#reset-password-btn {
		width: fit-content;
		height: fit-content;
		background-color: transparent;
		color: transparent;
		border: none;
	}

	#reset-password-btn:hover .mdi--reload {
		background-color: var(--color-theme-1);
		cursor: pointer;
	}
</style>
