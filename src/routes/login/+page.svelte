<script>
    import AuthService from "../../services/AuthService";
    import { isLoggedIn } from '../../stores/auth';
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    async function login() {
        AuthService.login(username, password).then(() => {
            //login successful
            isLoggedIn.set(true);
            goto(`/dashboard`, {replaceState:true}); 
        }).catch((error) => console.log(error));
    }
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Log in to your account!" />
</svelte:head>

<div class="text-column">
    <h1>Login</h1>
    <input type="text" bind:value={username} placeholder="Username">
    <input type="password" bind:value={password} placeholder="Password">
    <button on:click={() => login()}>Login</button>
</div>

<style>
    input {
        margin: 2px; 
        padding: 10px 5px;
        border-radius: 15px;
        background-color: white;    
    }
    button{
        border-color: #ff3e00;
        margin: 2px;
        padding: 10px 0px;
        border-radius: 15px;
        background-color: white;    
        cursor: pointer;
    }
    button:hover{
        color: #ff3e00;
    }
</style>