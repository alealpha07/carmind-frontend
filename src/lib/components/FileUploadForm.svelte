<script lang="ts">
	import FileService from '$services/FileService';
	import { _ } from 'svelte-i18n';
	let { label, fileType, vehicleId, error = $bindable(), successCallback, clickClose } = $props();

	let file: any;

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
			error = 'Error, select a file!';
			return;
		}
		const formData = new FormData();
		formData.append('file', file);
		FileService.upload(formData, vehicleId, fileType)
			.then(() => {
				successCallback();
			})
			.catch((err) => {
				error = err.response.data;
			});
	}
</script>

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
