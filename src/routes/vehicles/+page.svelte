<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import DataForm from '$lib/components/DataForm.svelte';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import FileManageForm from '$lib/components/FileManageForm.svelte';
	import AuthService from '$services/AuthService';
	import VehicleService from '$services/VehicleService';
	import type { Vehicle, Field } from '$types';
	import { isLoggedIn } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let vehicles: Array<Vehicle> = $state([]);
	let showVehicleFormDialog = $state(false);
	let showManageFileDialog = $state(false);

	let manageFileVehicle: Vehicle | null = $state(null);

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
		showVehicleFormDialog = true;
	}

	function showEditVehicle(vehicle: Vehicle) {
		formData = vehicle;
		formFields = EDIT_ADD_FORM_FIELDS;
		formId = vehicle.id;
		formClickRight = confirmEditVehicle;
		formTitle = $_('vehicles.edit_vehicle');
		showVehicleFormDialog = true;
	}

	function showDeleteVehicle(vehicle: Vehicle) {
		formData = {};
		formFields = [];
		formId = vehicle.id;
		formClickRight = confirmDeleteVehicle;
		formTitle = $_('vehicles.delete_vehicle');
		formDescription = `${$_('vehicles.delete_vehicle_message')} ${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber}?`;
		showVehicleFormDialog = true;
	}

	function showManageFiles(vehicle: Vehicle) {
		manageFileVehicle = vehicle;
	}

	function displayManageFiles() {
		showManageFileDialog = true;
	}

	function resetForm() {
		showVehicleFormDialog = false;
		formData = [];
		formFields = [];
		formId = -1;
		formTitle = '';
		formDescription = '';
		formError = '';
		formClickRight = () => {};
	}

	function resetManageFileDialog() {
		manageFileVehicle = null;
		showManageFileDialog = false;
	}

	function confirmAddVehicle(result: Vehicle) {
		result.registrationYear = Number(result.registrationYear);
		VehicleService.addVehicle(result)
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
		result.registrationYear = Number(result.registrationYear);
		VehicleService.editVehicle(result, formId)
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

<Dialog show={showVehicleFormDialog} style="top: 1vh; margin-bottom: 5vh !important;">
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
	<FileManageForm
		vehicle={manageFileVehicle}
		clickClose={() => {
			resetManageFileDialog();
		}}
		loadedCallback={() => {
			displayManageFiles();
		}}
	></FileManageForm>
</Dialog>
<Dialog unpersistent show={showSuccess} style="background-color: transparent; border: none; box-shadow: none; bottom: 10px; margin-right: 30px;">
	<p class="success-box"><b>{formSuccessMessage}</b></p>
</Dialog>
<div class="container">
	<div class="row">
		<div class="col">
			<h1>{$_('vehicles.title')}</h1>
			<button style="margin: auto; display: block;" onclick={showAddVehicle}>{$_('vehicles.add_vehicle')}</button>
		</div>
	</div>
	<div id="vehicle-card-row" class="row justify-content-start">
		{#each vehicles as vehicle (vehicle.id)}
			<div style="margin: 15px 0 45px 15px; max-width: fit-content !important; padding: 0;" class="col">
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
	@media only screen and (max-width: 767px) {
		#vehicle-card-row {
			gap: 0%;
			justify-content: center !important;
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
</style>
