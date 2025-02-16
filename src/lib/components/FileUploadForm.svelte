<script lang="ts">
	import FileService from '../../services/FileService';
	let { label, fileType, vehicleId, error = $bindable(), successCallback } = $props();

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
			<input
				type="file"
				id="form-element-file"
				onchange={(e: any) => (file = e?.target?.files?.[0])}
			/>
			<button onclick={uploadFile}>Upload</button>
		</div>
	</div>
</div>

<style>
	input {
		width: 80%;
	}
</style>
