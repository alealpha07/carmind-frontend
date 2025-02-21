<script>
	import AuthService from '$services/AuthService';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	let username = $state();
	let password = $state();
	let confirmPassword = $state();
	let name = $state();
	let surname = $state();
	let birthDate = $state();
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
		AuthService.register(username, password, confirmPassword, name, surname, birthDate)
			.then(() => {
				goto(`/login`, { replaceState: true });
			})
			.catch((err) => error=err.response.data);
	}
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Create a new account!" />
</svelte:head>

<div class="container">
	<div class="row justify-content-center align-content-center">
		<div class="col-12 col-sm-4">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<h1>Register</h1>
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
							<label for="form-username"><b>Username</b></label> <br />
							<input id="form-username" type="text" bind:value={username} placeholder="Username" />
						</div>
						<div class="col-12">
							<label for="form-password"><b>Password</b></label> <br />
							<input
								id="form-password"
								type="password"
								bind:value={password}
								placeholder="Password"
							/>
						</div>
						<div class="col-12">
							<label for="form-password"><b>Confirm Password</b></label> <br />
							<input
								id="form-password"
								type="password"
								bind:value={confirmPassword}
								placeholder="Confirm Password"
							/>
						</div>
						<div class="col-12">
							<label for="form-name"><b>Name</b></label> <br />
							<input id="form-name" type="text" bind:value={name} placeholder="Name" />
						</div>
						<div class="col-12">
							<label for="form-surname"><b>Surname</b></label> <br />
							<input id="form-surname" type="text" bind:value={surname} placeholder="Surname" />
						</div>

						<div class="col-12">
							<label for="form-date"><b>Birthdate</b></label> <br />
							<input id="form-date" type="date" bind:value={birthDate} placeholder="Birthdate" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<button onclick={() => register()}>Register</button>
						<p style="width:100%; text-align:center;">
							Already have an account? <a href="/login">Login</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.col-12 {
		margin-top: 5px;
		padding: 0 !important;
	}

	.row {
		width: 100%;
	}

	input,
	button {
		width: 100%;
	}
</style>
