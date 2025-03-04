<script lang="ts">
	import type { Field } from '$types';
	let {
		data = {},
		fields = [],
		buttonLeft = { label: 'buttonLeft' },
		buttonRight = { label: 'buttonRight' },
		error = $bindable(),
		clickLeft,
		clickRight
	}: {
		data: any;
		fields: Array<Field>;
		buttonLeft: { label: string };
		buttonRight: { label: string };
		error: string;
		clickLeft: Function;
		clickRight: Function;
	} = $props();

	//data = {txt: '',num: 0, bool: false, dte: '2024-01-31'},
	//fields = [{ type: 'text', label: 'label', key: 'txt' }, {type: 'number', label: 'label2', placeholder: '0', min: 0, step: 0.5, key: 'num' }, {type: 'boolean', label: 'test', key: 'bool' }, {type: 'date', min: '2024-01-30', key: 'dte' }]

	let errorShow = $derived.by(() => {
		let result = error != '' && error != null;
		if (result) {
			setTimeout(() => {
				error = '';
			}, 7500);
		}
		return result;
	});

	let tempData = $derived.by(() => {
		let tmp = JSON.parse(JSON.stringify(data));
		fields.forEach((field) => {
			if (field.type == 'date') {
				tmp[field.key] = new Date(tmp[field.key]).toISOString().split('T')[0];
			}
		});
		return tmp;
	});

	function getSanitizedData() {
		fields.forEach((field) => {
			if (field.type == 'date') {
				tempData[field.key] = new Date(tempData[field.key]);
			}
		});
		return tempData;
	}
</script>

<div class="container" style="position: relative; width: 95%; margin: auto;">
	<div class="row">
		{#if errorShow}
			<p class="error-box"><b>{error}</b></p>
		{/if}
	</div>
	<div class="row">
		{#each fields as field}
			{#if field.type == 'text'}
				<div class="col-12">
					<label for="form-element-{field.key}"><b>{field.label}</b></label> <br />
					<input type="text" id="form-element-{field.key}" placeholder={field.label} bind:value={tempData[field.key]} />
				</div>
			{:else if field.type == 'password'}
				<div class="col-12">
					<label for="form-element-{field.key}"><b>{field.label}</b></label> <br />
					<input type="password" id="form-element-{field.key}" placeholder={field.label} bind:value={tempData[field.key]} />
				</div>
			{:else if field.type == 'date'}
				<div class="col-12">
					<label for="form-element-{field.key}"><b>{field.label}</b></label> <br />
					<input
						type="date"
						id="form-element-{field.key}"
						bind:value={tempData[field.key]}
						min={!field.min ? null : (field.min as Date).toISOString().split('T')[0]}
						max={!field.max ? null : (field.max as Date).toISOString().split('T')[0]}
					/>
				</div>
			{:else if field.type == 'number'}
				<div class="col-12">
					<label for="form-element-{field.key}"><b>{field.label}</b></label> <br />
					<input
						type="number"
						id="form-element-{field.key}"
						bind:value={tempData[field.key]}
						placeholder={field.placeholder}
						min={field.min as number}
						max={field.max as number}
						step={field.step}
					/>
				</div>
			{:else if field.type == 'boolean'}
				<div class="col-12 align-content-end">
					<div class="align-container">
						<b>{field.label}</b>
						<label style="display: inline-block;" class="switch" for="form-element-{field.key}">
							<input type="checkbox" id="form-element-{field.key}" bind:checked={tempData[field.key]} />
							<div class="slider round"></div>
						</label>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="row">
		<div class="col-12" style="height: 42px;">
			<div style="width: 100%; display:flex; flex-direction:row-reverse;">
				<button
					style="width: fit-content; margin:0; margin-left:5px;"
					onclick={() => {
						clickRight(getSanitizedData());
					}}
					>{buttonRight.label}
				</button>
				<button
					style="width: fit-content; margin:0;"
					onclick={() => {
						clickLeft();
					}}
					class="button-secondary">{buttonLeft.label}</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.col-12 {
		margin-top: 15px;
	}

	input,
	button {
		width: calc(100% - 22px);
		margin: auto;
		display: inline-block;
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
