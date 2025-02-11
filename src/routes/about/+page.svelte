<script lang="ts">
    import DataForm from '$lib/components/DataForm.svelte';
    import Dialog from '$lib/components/Dialog.svelte';

    let showDialog = $state(false);

    function toggleDialog(){
        showDialog = !showDialog;
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<DataForm></DataForm>
<button onclick={toggleDialog}>toggle</button>
<Dialog bind:show={showDialog}><p>prova</p></Dialog>
