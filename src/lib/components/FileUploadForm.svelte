<script lang="ts">
	import FileService from '$services/FileService';
	import Dialog from './Dialog.svelte';
	import DataForm from './DataForm.svelte';
	import { _ } from 'svelte-i18n';
	let { label, fileType, vehicleId, error = $bindable(), deleteButton = false, successCallback, clickClose } = $props();

	let file: any;
	let deleteFormDialog = $state(false);

	let errorShow = $derived.by(() => {
		let result = error != '' && error != null;
		if (result) {
			setTimeout(() => {
				error = '';
			}, 7500);
		}
		return result;
	});

	/*
    let myfile = $state("");
    FileService.get(1, FileService.FileTypes.insurance).then((result) => {
		myfile = (result as string);
		console.log(myfile)
    }).catch((error) => console.log(error));*/

	async function uploadFile() {
	if (!file) {
		error = $_("Delete.file.message");
		return;
	}

	const formData = new FormData();
	formData.append("file", file);

	try {
		await FileService.upload(formData, vehicleId, fileType);
		file = undefined;
		successCallback();
	} catch (err:any) {
		error = err.response?.data || "An unexpected error occurred";
	}
}

async function deleteFile() {
		try {
			await FileService.delete(vehicleId, fileType)
			resetDeleteForm()
			successCallback();
		} catch {(err:any) =>{
			error = err.response.data;
		}}
	}
	
	function resetDeleteForm() {
		deleteFormDialog = false;
	}
</script>

<Dialog show={deleteFormDialog} style="margin-top: 10vh; margin-left: 0; background-color: var(--color-dialog-darker)">
	<h1>{$_('vehicle.delete_file')}</h1>
	<p style="padding-left: 10%; padding-right: 10%;">{$_('vehicle.delete_file_message')}?</p>
	<DataForm
		data={[]}
		fields={[]}
		bind:error
		buttonLeft={{ label: $_('buttons.cancel') }}
		buttonRight={{ label: $_('buttons.confirm') }}
		clickLeft={resetDeleteForm}
		clickRight={() => {
			deleteFile();
		}}
	></DataForm>
</Dialog>
<div id="container">
	<div class="row">
		{#if errorShow}
			<p class="error-box"><b>{error}</b></p>
		{/if}
	</div>
	<div class="row">
		<div class="col-12" style="margin-top: 5px;">
			<label for="form-element-file"><b>{label}</b></label> <br />
			<input type="file" id="form-element-file" onchange={(e: any) => (file = e?.target?.files?.[0])} />
			<button onclick={uploadFile} aria-label="Upload"><span class="mdi--upload"></span></button>
		</div>
	</div>
	{#if deleteButton}
		<div class="row">
			<div class="row" style="margin-top:8px !important;">
				<button
					onclick={() => {
						deleteFormDialog = true;
					}}
					class="button-secondary">{$_('vehicle.delete_file')}</button
				>
			</div>
		</div>
	{/if}
	<div class="row">
		<div class="row" style="margin-top:8px !important;">
			<button onclick={clickClose} class="button-minor">{$_('buttons.cancel')}</button>
		</div>
	</div>
</div>

<style>
	input {
		width: 80%;
	}

	.mdi--upload {
		display: inline-block;
		width: 20px;
		height: 20px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9 16v-6H5l7-7l7 7h-4v6zm-4 4v-2h14v2z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
