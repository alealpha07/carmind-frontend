<script lang="ts">
	import { _ } from 'svelte-i18n';
	import FileForm from '$lib/components/FileUploadForm.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import DataForm from './DataForm.svelte';
	import FileService from '$services/FileService';
	import type { Vehicle } from '$types';
	import VehicleService from '$services/VehicleService';
	let { vehicle = null, clickClose }: { vehicle: Vehicle | null; clickClose: Function } = $props();

	let loaded = $derived.by(() => {
		let result = vehicle != null && vehicle.id != -1;
		if (result) {
			refreshData();
		}
		return result;
	});

	let formDialog = $state(false);
	let formLabel = $state('');
	let formFileType = $state('');
	let formError = $state('');
	let formDeleteType = $state('');
	let deleteFormDialog = $state(false);
	let registrationCardUrl = $state('');
	let maintenanceManualUrl = $state('');
	let insuranceUrl = $state('');

	function showForm(label: string, fileType: string) {
		formLabel = label;
		formFileType = fileType;
		formDialog = true;
	}

	function resetForm() {
		formDialog = false;
		formLabel = '';
		formFileType = '';
	}

	function resetDeleteForm() {
		resetForm();
		deleteFormDialog = false;
		formDeleteType = '';
		formError = '';
	}

	async function confirmDelete() {
		try {
			await FileService.delete((vehicle as Vehicle).id, formDeleteType);
			resetDeleteForm();
			refreshData();
		} catch (err: any) {
			formError = err.response.data;
		}
	}

	function showDeleteDialog(typeText: string, type: string) {
		formLabel = $_('vehicle.delete_file_message') + typeText + '?';
		formDeleteType = type;
		deleteFormDialog = true;
	}

	function formSuccessCallback() {
		refreshData();
		resetForm();
	}

	async function refreshData() {
		try {
			const res = (await VehicleService.getVehicle((vehicle as Vehicle).id)) as Vehicle;
			registrationCardUrl = res.registrationCardFileExtension
				? ((await FileService.get((vehicle as Vehicle).id, FileService.FileTypes.registrationCard)) as string)
				: '';
			maintenanceManualUrl = res.maintenanceFileExtension
				? ((await FileService.get((vehicle as Vehicle).id, FileService.FileTypes.maintenance)) as string)
				: '';
			insuranceUrl = res.insuranceFileExtension ? ((await FileService.get((vehicle as Vehicle).id, FileService.FileTypes.insurance)) as string) : '';
		} catch {}
	}
</script>

{#if loaded}
	<Dialog
		show={formDialog}
		style="margin-top: 10vh; margin-left: 0; background-color: var(--color-dialog-darker); width: calc(100% - 30px) !important;"
	>
		<FileForm
			label={formLabel}
			fileType={formFileType}
			vehicleId={(vehicle as Vehicle).id}
			successCallback={formSuccessCallback}
			clickClose={resetForm}
		></FileForm>
	</Dialog>
	<Dialog
		show={deleteFormDialog}
		style="margin-top: 10vh; margin-left: 0; background-color: var(--color-dialog-darker); width: calc(100% - 30px) !important;"
	>
		<h1>{$_('vehicle.delete_file')}</h1>
		<p id="delete-form-text">{formLabel}</p>
		<DataForm
			data={[]}
			fields={[]}
			bind:error={formError}
			buttonLeft={{ label: $_('buttons.cancel') }}
			buttonRight={{ label: $_('buttons.confirm') }}
			clickLeft={resetDeleteForm}
			clickRight={confirmDelete}
		></DataForm>
	</Dialog>
	<div class="container">
		<div class="row">
			<h1>{$_('vehicles.manage_files')}</h1>
			<p class="vehicle-details">
				{(vehicle as Vehicle).brand}
				{(vehicle as Vehicle).model}
				{(vehicle as Vehicle).plateNumber}
			</p>
		</div>

		<div class="row file-management">
			{#if !registrationCardUrl}
				<p><b>{$_('vehicles.no_registration_card_file')}</b></p>
				<div class="actions">
					<button
						onclick={() => {
							showForm($_('vehicle.registration_card'), FileService.FileTypes.registrationCard);
						}}
						aria-label="Add"><span class="mdi mdi--add"></span></button
					>
				</div>
			{:else}
				<p><a target="_blank" href={registrationCardUrl}><b>{$_('vehicles.view_registration_card')}</b></a></p>
				<div class="actions">
					<button
						onclick={() => {
							showDeleteDialog($_('vehicle.registration_card'), FileService.FileTypes.registrationCard);
						}}
						aria-label="Delete"
						class="button-secondary"><span class="mdi mdi--bin"></span></button
					>
					<button
						onclick={() => {
							showForm($_('vehicle.registration_card'), FileService.FileTypes.registrationCard);
						}}
						aria-label="Edit"><span class="mdi mdi--pencil"></span></button
					>
				</div>
			{/if}
		</div>
		<div class="row file-management">
			{#if !maintenanceManualUrl}
				<p><b>{$_('vehicles.no_maintenance_file')}</b></p>
				<div class="actions">
					<button
						onclick={() => {
							showForm($_('vehicle.maintenance_manual'), FileService.FileTypes.maintenance);
						}}
						aria-label="Add"><span class="mdi mdi--add"></span></button
					>
				</div>
			{:else}
				<p><a target="_blank" href={maintenanceManualUrl}><b>{$_('vehicles.view_maintenance_manual')}</b></a></p>
				<div class="actions">
					<button
						onclick={() => {
							showDeleteDialog($_('vehicle.maintenance_manual'), FileService.FileTypes.maintenance);
						}}
						aria-label="Delete"
						class="button-secondary"><span class="mdi mdi--bin"></span></button
					>
					<button
						onclick={() => {
							showForm($_('vehicle.maintenance_manual'), FileService.FileTypes.maintenance);
						}}
						aria-label="Edit"><span class="mdi mdi--pencil"></span></button
					>
				</div>
			{/if}
		</div>
		<div class="row file-management align-content-center">
			{#if !insuranceUrl}
				<p><b>{$_('vehicles.no_insurance_file')}</b></p>
				<div class="actions">
					<button
						onclick={() => {
							showForm($_('vehicle.insurance'), FileService.FileTypes.insurance);
						}}
						aria-label="Add"><span class="mdi mdi--add"></span></button
					>
				</div>
			{:else}
				<p><a target="_blank" href={insuranceUrl}><b>{$_('vehicles.view_insurance')}</b></a></p>
				<div class="actions">
					<button
						onclick={() => {
							showDeleteDialog($_('vehicle.insurance'), FileService.FileTypes.insurance);
						}}
						aria-label="Delete"
						class="button-secondary"><span class="mdi mdi--bin"></span></button
					>
					<button
						onclick={() => {
							showForm($_('vehicle.insurance'), FileService.FileTypes.insurance);
						}}
						aria-label="Edit"><span class="mdi mdi--pencil"></span></button
					>
				</div>
			{/if}
		</div>
		<div class="row form-controls">
			<button
				onclick={() => {
					clickClose();
				}}
				class="button-minor">{$_('buttons.close')}</button
			>
		</div>
	</div>
{/if}

<style>
	.container .row h1 {
		margin-bottom: 0;
	}

	.container .row {
		margin-top: 8px !important;
	}

	.vehicle-details {
		width: fit-content;
		margin: auto;
		margin-top: 0;
	}

	.file-management {
		position: relative;
	}

	.file-management p {
		margin-top: 9px;
		color: var(--color-text);
	}

	.file-management a {
		cursor: pointer;
		color: var(--color-text);
		text-decoration: none;
	}

	.file-management a:hover {
		color: var(--color-theme-1);
	}

	.file-management .actions {
		position: absolute;
		right: 0;
		width: fit-content;
		z-index: 1;
		background-color: var(--color-dialog);
	}

	.file-management button {
		width: fit-content;
	}

	#delete-form-text {
		padding-left: 10%;
		padding-right: 10%;
	}

	.form-controls {
		margin-top: 8px !important;
	}
</style>
