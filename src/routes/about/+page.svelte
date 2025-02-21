<script lang="ts">
    import FileForm from '$lib/components/FileUploadForm.svelte';
	import FileService from '$services/FileService';
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<FileForm label="Assicurazione" fileType={FileService.FileTypes.insurance} vehicleId={1} successCallback={() => {console.log('success')}}></FileForm>
