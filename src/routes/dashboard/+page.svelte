<script>
    import AuthService from "../../services/AuthService";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    onMount(() => {
        AuthService.getUser().then(() => {
            //user is logged in
        }).catch(() => {
            goto(`/`, {replaceState:true}); 
        })
    });
</script>

<svelte:head>
    <title>Dashboard</title>
    <meta name="description" content="Only logged in users page" />
</svelte:head>

<div class="text-column">
    <h1>Dashboard</h1>
    <p>
        This is a protected page!
    </p>
</div>