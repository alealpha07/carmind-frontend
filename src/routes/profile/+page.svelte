<script lang="ts">
	import AuthService from '../../services/AuthService';
	import type {User} from '$types';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let user: User = $state({email: "", name: "", surname: "", birthDate: new Date()});

	onMount(() => {
		AuthService.getUser()
			.then((result) => {
				isLoggedIn.set(true);
				user = (result as User);
				//user is logged in
			})
			.catch(() => {
				goto(`/`, { replaceState: true });
			});
	});

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('it-IT');
	}
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="Only logged in users page" />
</svelte:head>

<div class="text-column">
	<h1>Profile</h1>
	<p>Email: {user.email}</p>
	<p>Name: {user.name}</p>
	<p>Surname: {user.surname}</p>
	<p>Birthdate: {formatDate(user.birthDate)}</p>
</div>
