<script lang="ts">
    import DataForm from '$lib/components/DataForm.svelte';
    import Dialog from '$lib/components/Dialog.svelte';

    let showDialog = $state(false);

    let fromData = ['test1', 1, true];
    let errorData = $state("prova errore");
    function toggleDialog(){
        showDialog = !showDialog;
    }

    function showData(){
        errorData = "prova diocane";
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<button onclick={showData}>Change data</button>

<DataForm bind:error={errorData} data={fromData} clickLeft={()=>console.log('left')} clickRight={(data: any)=>console.log(data)}></DataForm>
<button onclick={toggleDialog}>toggle</button>
<Dialog bind:show={showDialog}><p>prova</p></Dialog>
