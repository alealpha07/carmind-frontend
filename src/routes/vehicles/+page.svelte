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
	const EDIT_ADD_FORM_FIELDS =
	[
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
				VehicleService.getVehicles().then((data) =>{
					vehicles = data as Array<Vehicle>;
				})
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

	function showEditVehicle(vehicle:Vehicle) {
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
				//TODO RELOAD VEHICLE
				formSuccessMessage = res as string;
				resetForm();
			})
			.catch((err) => {
				formError = err.response.data;
			});
	}

	function confirmEditVehicle(result:Vehicle){
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
				//TODO RELOAD VEHICLE
				formSuccessMessage = res as string;
				resetForm();
			})
			.catch((err) => {
				formError = err.response.data;
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
<div class="text-column">
	<h1>Vehicles</h1>
	<button onclick={showAddVehicle}>Add Vehicle</button>
	<p>This is a protected page!</p>
	{#each vehicles as vehicle (vehicle.id)}
		<VehicleCard data={vehicle} clickDelete={()=>{}} clickEdit={() => {showEditVehicle(vehicle)}}></VehicleCard>
	{/each}
</div>
