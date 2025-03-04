<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import DataForm from '$lib/components/DataForm.svelte';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import AuthService from '$services/AuthService';
	import VehicleService from '$services/VehicleService';
	import type { Vehicle, Field } from '$types';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let vehicles: Array<Vehicle> = $state([]);
	let showDialog = $state(false);
	let showManageFileDialog = $state(false);
	let manageFileDescription = $state("");
	let formId: number = $state(-1);
	let formData: object = $state({});
	let formFields: Array<Field> = $state([]);
	let formClickRight: Function = $state(() => {});
	let formTitle = $state('');
	let formDescription = $state('');
	let formError = $state('');
	let formSuccessMessage: string = $state('');
	let showSuccess = $derived.by(() => {
		let result = formSuccessMessage != '' && formSuccessMessage != null;
		if (result) {
			setTimeout(() => {
				formSuccessMessage = '';
			}, 5000);
		}
		return result;
	});
	const EDIT_ADD_FORM_FIELDS = [
		{ type: 'text', label: $_('vehicle.type'), key: 'type' },
		{ type: 'text', label: $_('vehicle.brand'), key: 'brand' },
		{ type: 'text', label: $_('vehicle.model'), key: 'model' },
		{ type: 'text', label: $_('vehicle.registration_year'), key: 'registrationYear' },
		{ type: 'text', label: $_('vehicle.plate_number'), key: 'plateNumber' },
		{ type: 'boolean', label: $_('vehicle.is_insured'), key: 'isInsured' },
		{ type: 'date', label: $_('vehicle.start_date_insurance'), key: 'startDateInsurance' },
		{ type: 'date', label: $_('vehicle.end_date_insurance'), key: 'endDateInsurance' },
		{ type: 'boolean', label: $_('vehicle.has_bill'), key: 'hasBill' },
		{ type: 'date', label: $_('vehicle.end_date_bill'), key: 'endDateBill' },
		{ type: 'date', label: $_('vehicle.end_date_revision'), key: 'endDateRevision' }
	];

	onMount(() => {
		AuthService.getUser()
			.then(() => {
				isLoggedIn.set(true);
				reloadVehicles();
			})
			.catch(() => {
				goto(`/`, { replaceState: true });
			});
	});

	function showAddVehicle() {
		formData = {
			type: '',
			brand: '',
			model: '',
			registrationYear: '',
			plateNumber: '',
			isInsured: false,
			startDateInsurance: null,
			endDateInsurance: null,
			hasBill: false,
			endDateBill: null,
			endDateRevision: null
		};
		formFields = EDIT_ADD_FORM_FIELDS;
		formClickRight = confirmAddVehicle;
		formTitle = $_('vehicles.add_vehicle');
		showDialog = true;
	}

	function showEditVehicle(vehicle: Vehicle) {
		formData = {
			type: vehicle.type,
			brand: vehicle.brand,
			model: vehicle.model,
			registrationYear: vehicle.registrationYear,
			plateNumber: vehicle.plateNumber,
			isInsured: vehicle.isInsured,
			startDateInsurance: vehicle.startDateInsurance,
			endDateInsurance: vehicle.endDateInsurance,
			hasBill: vehicle.hasBill,
			endDateBill: vehicle.endDateBill,
			endDateRevision: vehicle.endDateRevision
		};
		formFields = EDIT_ADD_FORM_FIELDS;
		formId = vehicle.id;
		formClickRight = confirmEditVehicle;
		formTitle = $_('vehicles.edit_vehicle');
		showDialog = true;
	}

	function showDeleteVehicle(vehicle: Vehicle) {
		formData = {};
		formFields = [];
		formId = vehicle.id;
		formClickRight = confirmDeleteVehicle;
		formTitle = $_('vehicles.delete_vehicle');
		formDescription = `${$_('vehicles.delete_vehicle_message')} ${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber}?`;
		showDialog = true;
	}

	function showManageFiles(vehicle: Vehicle) {
		//TODO handle manage files
		manageFileDescription = vehicle.brand + " " + vehicle.model + " " + vehicle.plateNumber;

		showManageFileDialog = true;
	}

	function resetForm() {
		showDialog = false;
		formData = [];
		formFields = [];
		formId = -1;
		formTitle = '';
		formDescription = '';
		formError = '';
		formClickRight = () => {};
	}

	function resetManageFileDialog() {
		showManageFileDialog = false;
	}

	function confirmAddVehicle(result: Vehicle) {
		VehicleService.addVehicle(
			result.type,
			result.brand,
			result.model,
			Number(result.registrationYear),
			result.plateNumber,
			result.isInsured,
			result.startDateInsurance,
			result.endDateInsurance,
			result.hasBill,
			result.endDateBill,
			result.endDateRevision
		)
			.then((res) => {
				reloadVehicles();
				formSuccessMessage = res as string;
				resetForm();
			})
			.catch((err) => {
				formError = err.response.data;
			});
	}

	function confirmEditVehicle(result: Vehicle) {
		VehicleService.editVehicle(
			result.type,
			result.brand,
			result.model,
			Number(result.registrationYear),
			result.plateNumber,
			result.isInsured,
			result.startDateInsurance,
			result.endDateInsurance,
			result.hasBill,
			result.endDateBill,
			result.endDateRevision,
			formId
		)
			.then((res) => {
				reloadVehicles();
				formSuccessMessage = res as string;
				resetForm();
			})
			.catch((err) => {
				formError = err.response.data;
			});
	}

	function confirmDeleteVehicle(result: Vehicle) {
		VehicleService.deleteVehicle(formId)
			.then((res) => {
				reloadVehicles();
				formSuccessMessage = res as string;
				resetForm();
			})
			.catch((err) => {
				formError = err.response.data;
			});
	}

	function reloadVehicles() {
		VehicleService.getVehicles().then((data) => {
			vehicles = data as Array<Vehicle>;
		});
	}
</script>

<svelte:head>
	<title>Vehicles</title>
</svelte:head>

<Dialog show={showDialog} style="top: 1vh; margin-bottom: 5vh !important;">
	<h1>{formTitle}</h1>
	<p style="padding-left: 10%; padding-right: 10%;">{formDescription}</p>
	<DataForm
		data={formData}
		fields={formFields}
		bind:error={formError}
		buttonLeft={{ label: $_('buttons.cancel') }}
		buttonRight={{ label: $_('buttons.confirm') }}
		clickLeft={resetForm}
		clickRight={formClickRight}
	></DataForm>
</Dialog>
<Dialog show={showManageFileDialog} style="margin-top: 1vh;">
	<div class="container">
		<div class="row">
			<h1 style="margin-bottom: 0;">{$_('vehicles.manage_files')}</h1>
			<p style="width: fit-content; margin: auto; margin-top: 0;">{manageFileDescription}</p>
		</div>

		<div class="row manage-file">
			<p><b>{$_('vehicles.view_registration_card')}</b></p>
			<div>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
			</div>
		</div>
		<div class="row manage-file">
			<p><b>{$_('vehicles.view_maintenance_manual')}</b></p>
			<div>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
			</div>
		</div>
		<div class="row manage-file align-content-center">
			<p><b>{$_('vehicles.view_insurance')}</b></p>
			<div>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
			</div>
		</div>
		<div class="row" style="margin-top:8px !important;">
			<button onclick={resetManageFileDialog} class="button-minor">{$_('buttons.close')}</button>
		</div>
	</div>
</Dialog>
<Dialog
	unpersistent
	show={showSuccess}
	style="background-color: transparent; border: none; box-shadow: none; bottom: 10px; margin-right: 30px;"
>
	<p class="success-box"><b>{formSuccessMessage}</b></p>
</Dialog>
<div class="container">
	<div class="row">
		<div class="col">
			<h1>{$_('vehicles.title')}</h1>
			<button style="margin: auto; display: block;" onclick={showAddVehicle}
				>{$_('vehicles.add_vehicle')}</button
			>
		</div>
	</div>
	<div id="vehicle-card-row" class="row justify-content-start">
		{#each vehicles as vehicle (vehicle.id)}
			<div id="vehicle-card-container" class="col">
				<VehicleCard
					data={vehicle}
					clickDelete={() => {
						showDeleteVehicle(vehicle);
					}}
					clickEdit={() => {
						showEditVehicle(vehicle);
					}}
					clickManageFiles={() => {
						showManageFiles(vehicle);
					}}
				></VehicleCard>
			</div>
		{/each}
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
		cursor: pointer;
	}

	.row.manage-file p:hover {
		color: var(--color-theme-1);
	}

	@media only screen and (max-width: 575px) {
		#vehicle-card-row {
			gap: 0%;
			justify-content: center !important;
		}
	}

	@media only screen and (min-width: 576px) {
		#vehicle-card-row {
			justify-content: center !important;
			gap: 0%;
		}
	}

	@media only screen and (min-width: 768px) {
		#vehicle-card-row {
			gap: 1%;
			justify-content: start !important;
		}
	}

	@media only screen and (min-width: 992px) {
		#vehicle-card-row {
			padding-left: 8%;
			padding-right: 8%;
			gap: 6%;
		}
	}

	@media only screen and (min-width: 1200px) {
		#vehicle-card-row {
			padding: 0;
			gap: 3%;
		}
	}

	@media only screen and (min-width: 1400px) {
		#vehicle-card-row {
			padding-left: 6%;
			padding-right: 6%;
			gap: 4%;
		}
	}

	#vehicle-card-container {
		margin-left: 15px;
		margin-top: 15px;
		margin-bottom: 45px;
		max-width: fit-content !important;
		padding: 0;
	}

	.mdi--pencil {
		display: inline-block;
		width: 16px;
		height: 16px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.mdi--bin {
		display: inline-block;
		width: 16px;
		height: 16px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
