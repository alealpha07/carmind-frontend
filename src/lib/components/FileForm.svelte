<script lang="ts">
	let { label= 'test' } = $props();
</script>

<div id="form-container">
	<div class="row">
		<div class="col-12" style="margin-top: 5px;">
			<label for="form-element-file"><b>{label}</b></label> <br />
			<input type="file" id="form-element-file" />
		</div>
	</div>
</div>

<style>
	#form-container {
		width: 30vw;
		margin: auto;
		margin-top: 50px;
	}

	input {
		width: 100%;
	}

</style>