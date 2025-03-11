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
	import FileService from '$services/FileService';
	import FileForm from '$lib/components/FileUploadForm.svelte';

	let vehicles: Array<Vehicle> = $state([]);
	let showVehicleFormDialog = $state(false);
	let showManageFileDialog = $state(false);
	let showImageFormDialog = $state(false);
	let showImageDeleteButton = $state(false);
	let manageFileVehicle: Vehicle | null = $state(null);
	let formId: number = $state(-1);
	let formData: object = $state({});
	let formFields: Array<Field> = $state([]);
	let formClickRight: Function = $state(() => {});
	let formTitle = $state('');
	let formDescription = $state('');
	let formVehicle: Vehicle | null = $state(null);
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

	const VEHICLE_FORM_FIELDS = [
		{ type: 'text', label: $_('vehicle.type'), key: 'type', suggestions:['Car', 'Motorcycle']},
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

	const EMPTY_VEHICLE = {
		id: -1,
		idUser: -1,
		type: '',
		brand: '',
		model: '',
		registrationYear: new Date().getFullYear(),
		plateNumber: '',
		isInsured: false,
		startDateInsurance: new Date(),
		endDateInsurance: new Date(),
		hasBill: false,
		endDateBill: new Date(),
		endDateRevision: new Date(),
		insuranceFileExtension: null,
		maintenanceFileExtension: null,
		registrationCardFileExtension: null,
		vehicleImageFileExtension: null
	};

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

	function showForm(data: any, fields: Array<Field>, clickRight: Function, title: string, description: string = '', id = -1) {
		document.body.scrollIntoView();
		formData = data;
		formFields = fields;
		formClickRight = clickRight;
		formTitle = title;
		formDescription = description;
		formId = id;
		showVehicleFormDialog = true;
	}

	function showManageFiles(vehicle: Vehicle) {
		document.body.scrollIntoView();
		manageFileVehicle = vehicle;
		showManageFileDialog = true;
	}

	function showManageImageForm(vehicle: Vehicle, description: string, showDeleteButton = false) {
		document.body.scrollIntoView();
		formVehicle = vehicle;
		formDescription = description;
		showImageFormDialog = true;
		showImageDeleteButton = showDeleteButton;
	}

	function resetManageImageForm() {
		resetForm();
		formDescription = '';
		formVehicle = null;
		showImageDeleteButton = false;
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
		showImageFormDialog = false;
	}

	function resetManageFileDialog() {
		manageFileVehicle = null;
		showManageFileDialog = false;
	}

	function addVehicle(result: Vehicle) {
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

	function editVehicle(result: Vehicle) {
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

	function deleteVehicle(result: Vehicle) {
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
		vehicles = [];
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
	></FileManageForm>
</Dialog>
<Dialog show={showImageFormDialog} style="margin-top: 1vh;">
	<FileForm
		label={formDescription}
		fileType={FileService.FileTypes.vehicleImage}
		vehicleId={formVehicle?.id}
		successCallback={() => {
			reloadVehicles();
			resetManageImageForm();
		}}
		clickClose={resetManageImageForm}
		deleteButton={showImageDeleteButton}
	></FileForm>
</Dialog>
<Dialog unpersistent show={showSuccess} style="background-color: transparent; border: none; box-shadow: none; bottom: 10px; margin-right: 30px;">
	<p class="success-box"><b>{formSuccessMessage}</b></p>
</Dialog>
<div class="container">
	<div class="row">
		<div class="col">
			<h1>{$_('vehicles.title')}</h1>
			<button
				style="margin: auto; display: block;"
				onclick={() => {
					showForm(EMPTY_VEHICLE, VEHICLE_FORM_FIELDS, addVehicle, $_('vehicles.add_vehicle'));
				}}>{$_('vehicles.add_vehicle')}</button
			>
		</div>
	</div>
	<div id="vehicle-card-row" class="row justify-content-start">
		{#each vehicles as vehicle (vehicle.id)}
			<div style="margin: 15px 0 45px 15px; max-width: fit-content !important; padding: 0;" class="col">
				<VehicleCard
					data={vehicle}
					clickDelete={() => {
						showForm(
							{},
							[],
							deleteVehicle,
							$_('vehicles.delete_vehicle'),
							`${$_('vehicles.delete_vehicle_message')} ${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber}?`,
							vehicle.id
						);
					}}
					clickEdit={() => {
						showForm(vehicle, VEHICLE_FORM_FIELDS, editVehicle, $_('vehicles.edit_vehicle'), '', vehicle.id);
					}}
					clickManageFiles={() => {
						showManageFiles(vehicle);
					}}
					clickAddImage={() => {
						showManageImageForm(vehicle, $_('vehicle.image') + ` ${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber}`);
					}}
					clickEditImage={() => {
						showManageImageForm(vehicle, $_('vehicle.image_edit') + ` ${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber}`, true);
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
			width: 84%;
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
			width: 88%;
			padding-left: 6%;
			padding-right: 6%;
			gap: 4%;
		}
	}
</style>
