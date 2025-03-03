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
	let showManageFileDialog = $state(true);
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

	function showManageFiles(vehicle: Vehicle) {}

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
<Dialog show={showManageFileDialog}>
	<div class="container">
		<div class="row">
			<h1>Manage Files</h1>
		</div>
		<div class="row manage-file align-content-center">
			<p><b>View Insurance</b></p>
			<div>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
			</div>
		</div>
		<div class="row manage-file">
			<p><b>View Revision</b></p>
			<div>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
			</div>
		</div>
		<div class="row manage-file">
			<p><b>View Bill</b></p>
			<div>
				<button aria-label="Edit"><span class="mdi--pencil"></span></button>
				<button aria-label="Delete" class="button-secondary"><span class="mdi--bin"></span></button>
			</div>
		</div>
		<div class="row" style="margin-top:8px !important;">
			<button class="button-minor">Close</button>
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
			padding: 0;
			gap: 10%;
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
