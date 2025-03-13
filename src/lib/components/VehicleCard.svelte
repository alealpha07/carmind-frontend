<script lang="ts">
	import image from '$lib/images/mdi--car.png';
	import { _, getLocaleFromNavigator } from 'svelte-i18n';
	import FileService from '$services/FileService';

	let {
		data = {
			id: -1,
			type: '',
			brand: '',
			model: '',
			registrationYear: 0,
			plateNumber: '',
			isInsured: false,
			startDateInsurance: new Date(),
			endDateInsurance: new Date(),
			hasBill: false,
			endDateBill: new Date(),
			endDateRevision: new Date()
		},
		clickDelete,
		clickEdit,
		clickManageFiles,
		clickAddImage,
		clickEditImage,
		...others
	} = $props();

	let vehicleImageUrl = $state('');
	let loaded = $derived.by(() => {
		let result = !!data.id && data.id != -1;
		if (result && !!data.vehicleImageFileExtension) {
			FileService.get(data.id, FileService.FileTypes.vehicleImage).then((res: any) => {
				vehicleImageUrl = res;
			});
		}
		return result;
	});
	let currentDate = new Date();
	let insuranceIcon = $state(
		currentDate > new Date(data.endDateInsurance) ? '-remove' : isWithin30Days(data.endDateInsurance, currentDate) ? '-alert' : ''
	);
	let billIcon = $state(currentDate > new Date(data.endDateBill) ? '-remove' : isWithin30Days(data.endDateBill, currentDate) ? '-alert' : '');
	let revisionIcon = $state(
		currentDate > new Date(data.endDateRevision) ? '-remove' : isWithin30Days(data.endDateRevision, currentDate) ? '-alert' : ''
	);

	function formatDate(date: Date) {
		date = new Date(date);
		return date.toLocaleDateString(getLocaleFromNavigator() as string);
	}

	function isWithin30Days(date: Date, currentDate: Date): boolean {
		date = new Date(date);
		const differenceInMs = date.getTime() - currentDate.getTime();
		const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
		return differenceInDays <= 30 && differenceInDays >= 0;
	}
</script>

<div id="vehicle-container" {...others}>
	<div class="row">
		<div class="col-6">
			{#if (!vehicleImageUrl || vehicleImageUrl == '') && loaded}
				<div style="width: 100%; position:relative;">
					<img id="vehicle-image" width="100%" src={image} alt="Vehicle" />
					<button
						style="position: absolute; bottom:0; right: 0; padding: 5px; border-radius: 50%; width: 34px; height: 34px; "
						aria-label="Upload Image"
						onclick={clickAddImage}><span class="mdi--image-plus"></span></button
					>
				</div>
			{:else}
				<div style="width: 100%; position:relative;">
					<img style="max-height: 135px;" id="vehicle-image" width="100%" src={vehicleImageUrl} alt="Vehicle" />
					<button
						style="position: absolute; bottom:0; right: -3px; padding: 5px; border-radius: 50%; width: 34px; height: 34px; "
						aria-label="Edit Image"
						onclick={clickEditImage}><span class="mdi--image-edit"></span></button
					>
				</div>
			{/if}
			<p>{data.type}</p>
			<p>{data.brand} - {data.model}</p>
			<p>{data.registrationYear}</p>
			<p><b>{data.plateNumber}</b></p>
		</div>
		<div class="col-6 right-col">
			<div class="row">
				<p><b>{$_('vehicle.expire_dates')}</b></p>
			</div>
			<div class="row">
				<p><b>{$_('vehicle.insurance')}</b></p>
			</div>
			<div class="row">
				{#if data.isInsured}<p>{formatDate(data.endDateInsurance)}</p>
					<span class="mdi--stopwatch{insuranceIcon}"></span>{:else}
					<p>{$_('vehicle.no_insurance')}</p>
				{/if}
			</div>
			<div class="row">
				<p><b>{$_('vehicle.bill')}</b></p>
			</div>
			<div class="row">
				{#if data.hasBill}<p>{formatDate(data.endDateBill)}</p>
					<span class="mdi--stopwatch{billIcon}"></span>{:else}
					<p>{$_('vehicle.no_bill')}</p>
				{/if}
			</div>
			<div class="row">
				<p><b>{$_('vehicle.revision')}</b></p>
			</div>
			<div class="row">
				<p>{formatDate(data.endDateRevision)}</p>
				<span class="mdi--stopwatch{revisionIcon}"></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-6">
			<button onclick={clickManageFiles} class="button-minor" id="manage-btn">{$_('buttons.manage_file')}</button>
		</div>
		<div class="col-6">
			<button onclick={clickDelete} class="button-secondary" id="delete-btn" aria-label="delete" style="padding-left: 15px; padding-right: 15px;">
				<span class="mdi--bin"></span>
			</button>
			<button onclick={clickEdit} id="edit-btn" aria-label="edit" style="padding-left: 15px; padding-right: 15px;">
				<span class="mdi--pencil"></span>
			</button>
		</div>
	</div>
</div>

<style>
	p {
		margin-top: 0;
		margin-bottom: 3px;
		margin-top: 0;
	}
	div.right-col p {
		text-align: center;
	}
	div.right-col div.row {
		position: relative;
	}
	div.right-col div.row span {
		position: absolute;
		right: 0px;
	}
	#vehicle-container {
		width: 300px;
		height: 300px;
		background-color: var(--color-bg-3);
		border-radius: 15px;
		box-shadow: 10px 10px 10px var(--color-bg-5);
		padding: 15px;
		position: relative;
	}
	#manage-btn {
		position: absolute;
		bottom: 15px;
		left: 15px;
	}
	#edit-btn {
		position: absolute;
		bottom: 15px;
		right: 15px;
	}
	#delete-btn {
		position: absolute;
		bottom: 15px;
		right: 75px;
	}
	#vehicle-image {
		border-radius: 10px;
	}
	.mdi--stopwatch {
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m19.03 7.39l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V7h2zm2-13H9v2h6z'/%3E%3C/svg%3E");
		background-color: var(--color-success);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
		display: inline-block;
	}
	.mdi--stopwatch-alert {
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M18.45 5.97c-.45-.51-.9-.97-1.41-1.41L15.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM11 14H9V7h2zm2-11H7V1h6zm10 4v6h-2V7zm-2 8h2v2h-2z'/%3E%3C/svg%3E");
		background-color: var(--color-alert);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
	.mdi--stopwatch-remove {
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15 3H9V1h6zm-2 16c0 1.03.26 2 .71 2.83c-.55.11-1.12.17-1.71.17a9 9 0 0 1 0-18c2.12 0 4.07.74 5.62 2l1.42-1.44c.51.44.96.9 1.41 1.41l-1.42 1.42A8.96 8.96 0 0 1 21 13v.35c-.64-.22-1.3-.35-2-.35c-3.31 0-6 2.69-6 6m0-12h-2v7h2zm9.54 9.88l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19z'/%3E%3C/svg%3E");
		background-color: var(--color-error);
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.mdi--image-plus {
		display: inline-block;
		width: 20px;
		height: 20px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M18 15v3h-3v2h3v3h2v-3h3v-2h-3v-3zm-4.7 6H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v8.3c-.6-.2-1.3-.3-2-.3c-1.1 0-2.2.3-3.1.9L14.5 12L11 16.5l-2.5-3L5 18h8.1c-.1.3-.1.7-.1 1c0 .7.1 1.4.3 2'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.mdi--image-edit {
		display: inline-block;
		width: 20px;
		height: 20px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m22.7 14.3l-1 1l-2-2l1-1c.1-.1.2-.2.4-.2c.1 0 .3.1.4.2l1.3 1.3c.1.2.1.5-.1.7M13 19.9V22h2.1l6.1-6.1l-2-2zM21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-1.9l1.1-1.1H5l3.5-4.5l2.5 3l3.5-4.5l1.6 2.1l4.9-5z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
