<script lang="ts">
	let { data = ['test', '2024-02-22'], fields = [{ type: 'text', label: 'label' }, {type: 'date', label: 'label2', min: '2023-01-01', max: '2025-12-31'}] } = $props();
</script>

<div id="form-container">
	<div class="row">
		{#each fields as field, index}
      {#if field.type == 'text'}
			<div class="col-12" style="margin-top: 5px;">
				<label for="form-element-{index}"><b>{field.label}</b></label> <br />
				<input type="text" id="form-element-{index}" placeholder="{field.label}" value="{data[index]}" />
			</div>
      {:else if field.type == 'date'}
			<div class="col-12" style="margin-top: 5px;">
				<label for="form-element-{index}"><b>{field.label}</b></label> <br />
				<input type="date" id="form-element-{index}" value="{data[index]}" min="{field.min}" max="{field.max}" />
			</div>
      {:else if field.type == 'number'}
			<div class="col-12" style="margin-top: 5px;">
				<label for="numberElement"><b>NumberField</b></label> <br />
				<input type="number" id="numberElement" placeholder="test" />
			</div>
      {:else if field.type == 'boolean'}
			<div class="col-12" style="margin-top: 5px;">
				<div class="align-container">
					<b>BoolField</b>
					<label style="display: inline-block;" class="switch" for="boolElement">
						<input type="checkbox" id="boolElement" />
						<div class="slider round"></div>
					</label>
				</div>
			</div>
      {:else if field.type == 'file'}
			<div class="col-12" style="margin-top: 5px;">
				<label for="fileElement"><b>FileField</b></label> <br />
				<input type="file" id="fileElement" />
			</div>
      {/if}
		{/each}
	</div>
</div>

<style>
	#form-container {
		width: 30vw;
		margin: auto;
		margin-top: 50px;
	}

	.align-container {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	input {
		width: 100%;
	}

	.switch {
		display: inline-block;
		height: 25px;
		position: relative;
		width: 50px;
	}
	.switch input {
		display: none;
	}
	.slider {
		background-color: var(--color-bg-4);
		bottom: 0;
		cursor: pointer;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.4s;
	}
	.slider:before {
		background-color: var(--color-text-light);
		bottom: 4px;
		content: '';
		height: 18px;
		left: 4px;
		position: absolute;
		transition: 0.4s;
		width: 18px;
	}
	input:checked + .slider {
		background-color: var(--color-theme-1);
	}
	input:checked + .slider:before {
		transform: translateX(24px);
	}
	.slider.round {
		border-radius: 34px;
	}
	.slider.round:before {
		border-radius: 50%;
	}
</style>
