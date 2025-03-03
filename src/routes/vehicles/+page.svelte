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
	import { json } from '@sveltejs/kit';
	import { resolveRoute } from '$app/paths';

	let vehicles: Array<Vehicle> = $state([]);
	let showDialog = $state(false);
	let formId: number = $state(-1);
	let formData: object = $state({});
	let formFields: Array<Field> = $state([]);
	let formClickRight: Function = $state(() => {});
	let formTitle = $state('');
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
		{ type: 'text', label: 'Type', key: 'type' },
		{ type: 'text', label: 'Brand', key: 'brand' },
		{ type: 'text', label: 'Model', key: 'model' },
		{ type: 'text', label: 'Registration Year', key: 'registrationYear' },
		{ type: 'text', label: 'Plate Number', key: 'plateNumber' },
		{ type: 'boolean', label: 'Is Insured?', key: 'isInsured' },
		{ type: 'date', label: 'Start Date Insurance', key: 'startDateInsurance' },
		{ type: 'date', label: 'End Date Insurance', key: 'endDateInsurance' },
		{ type: 'boolean', label: 'Has Bill?', key: 'hasBill' },
		{ type: 'date', label: 'End Date Bill', key: 'endDateBill' },
		{ type: 'date', label: 'End Date Revision', key: 'endDateRevision' }
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
		formTitle = 'Add Vehicle';
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
		formTitle = 'Edit Vehicle';
		showDialog = true;
	}

	function showDeleteVehicle(vehicle: Vehicle) {
		formData = {};
		formFields = [];
		formId = vehicle.id;
		formClickRight = confirmDeleteVehicle;
		formTitle = 'Do you really want to delete the vehicle';
		showDialog = true;
	}

	function resetForm() {
		showDialog = false;
		formData = [];
		formFields = [];
		formId = -1;
		formTitle = '';
		formError = '';
		formClickRight = () => {};
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
	<meta name="description" content="Only logged in users page" />
</svelte:head>

<Dialog show={showDialog} style="top: 10vh; margin-bottom: 5vh !important;">
	<h1>{formTitle}</h1>
	<DataForm
		data={formData}
		fields={formFields}
		bind:error={formError}
		buttonLeft={{ label: 'Cancel' }}
		buttonRight={{ label: 'Confirm' }}
		clickLeft={resetForm}
		clickRight={formClickRight}
	></DataForm>
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
			<h1>Vehicles</h1>
			<button style="margin: auto; display: block;" onclick={showAddVehicle}>Add Vehicle</button>
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
						//TODO Handle files
					}}
				></VehicleCard>
			</div>
		{/each}
	</div>
</div>

<style>

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
			padding: 0;
			gap: 10%;
		}
	}

	#vehicle-card-container{
		margin-left: 15px; 
		margin-top: 15px; 
		margin-bottom: 45px; 
		max-width: fit-content !important;
		padding:0;
	}
</style>
