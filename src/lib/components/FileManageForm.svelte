<script lang="ts">
	import { _ } from 'svelte-i18n';
	import FileForm from '$lib/components/FileUploadForm.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import FileService from '$services/FileService';
	let {description = "", vehicleId = -1, registrationCardUrl = null, maintenanceManualUrl = null, insuranceUrl = null , clickClose} = $props();

    let formDialog = $state(false);
    let formLabel = $state("");
    let formFileType = $state("");

    function showForm(label: string, fileType: string){
        formLabel = label;
        formFileType = fileType;
        formDialog = true;
    }

    function resetForm(){
        formDialog = false;
        formLabel = "";
        formFileType = "";
    }
</script>

<Dialog show={formDialog} style="margin-top: 10vh; margin-left: 0; background-color: var(--color-dialog-darker)">
	<FileForm
    label={formLabel}
	fileType={formFileType}
	vehicleId={vehicleId}
	successCallback={() => {
        //TODO refresh manage form => callback 
		console.log('success');
	}}
    clickClose={resetForm}
    ></FileForm>
</Dialog>
<div class="container">
    <div class="row">
        <h1 style="margin-bottom: 0;">{$_('vehicles.manage_files')}</h1>
        <p style="width: fit-content; margin: auto; margin-top: 0;">{description}</p>
    </div>

    <div class="row manage-file">
        {#if !registrationCardUrl}
            <p><b>{$_('vehicles.no_registration_card_file')}</b></p>
            <div>
                <button onclick={() => {showForm($_('vehicle.registration_card'), FileService.FileTypes.registrationCard)}} aria-label="Add"><span class="mdi--add"></span></button>
            </div>
        {:else}
            <p><b>{$_('vehicles.view_registration_card')}</b></p>
            <div>
                <button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
                <button aria-label="Edit"><span class="mdi--pencil"></span></button>
            </div>
        {/if}
    </div>
    <div class="row manage-file">
        {#if !maintenanceManualUrl}
            <p><b>{$_('vehicles.no_maintenance_file')}</b></p>
            <div>
                <button onclick={() => {showForm($_('vehicle.maintenance_manual'), FileService.FileTypes.maintenance)}} aria-label="Add"><span class="mdi--add"></span></button>
            </div>
        {:else}
            <p><b>{$_('vehicles.view_maintenance_manual')}</b></p>
            <div>
                <button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
                <button aria-label="Edit"><span class="mdi--pencil"></span></button>
            </div>
        {/if}
    </div>
    <div class="row manage-file align-content-center">
        {#if !insuranceUrl}
            <p><b>{$_('vehicles.no_insurance_file')}</b></p>
            <div>
                <button onclick={() => {showForm($_('vehicle.insurance'), FileService.FileTypes.insurance)}}  aria-label="Add"><span class="mdi--add"></span></button>
            </div>
        {:else}
            <p><b>{$_('vehicles.view_insurance')}</b></p>
            <div>
                <button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
                <button aria-label="Edit"><span class="mdi--pencil"></span></button>
            </div>
        {/if}
    </div>
    <div class="row" style="margin-top:8px !important;">
        <button onclick={clickClose} class="button-minor">{$_('buttons.close')}</button>
    </div>
</div>

<style>
    
	.row.manage-file {
		position: relative;
		margin-top: 8px !important;
	}
	.row.manage-file button {
		width: fit-content;
	}

	.row.manage-file div {
		position: absolute;
		right: 0;
		width: fit-content;
		z-index: 1;
		background-color: var(--color-dialog);
	}

	.row.manage-file p {
		margin-top: 9px;
		/*cursor: pointer;*/
	}

	.row.manage-file p:hover {
		/*color: var(--color-theme-1);*/
	}
</style>