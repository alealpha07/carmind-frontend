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

<div class="container" id="data-form">
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
					<input
						type="text"
						id="form-element-{field.key}"
						placeholder={field.label}
						bind:value={tempData[field.key]}
						list="form-datalist-{field.key}"
					/>
					<datalist id="form-datalist-{field.key}">
						{#if !!field.suggestions}
							{#each field.suggestions as suggestion}
								<option value={suggestion}>{suggestion}</option>
							{/each}
						{/if}
					</datalist>
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
						<label class="switch" for="form-element-{field.key}">
							<input type="checkbox" id="form-element-{field.key}" bind:checked={tempData[field.key]} />
							<div class="slider round"></div>
						</label>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="row" id="data-form-controls">
		<div class="col-12">
			<div>
				<button
					id="data-form-btn-left"
					onclick={() => {
						clickRight(getSanitizedData());
					}}
					>{buttonRight.label}
				</button>
				<button
					id="data-form-btn-right"
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
	.container#data-form {
		position: relative;
		width: 95%;
		margin: auto;
	}
	#data-form-controls div.col-12 {
		height: 42px;
	}
	#data-form-controls div.col-12 div {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
	}
	#data-form-btn-left,
	#data-form-btn-right {
		width: fit-content;
		margin: 0;
	}
	#data-form-btn-left {
		margin-left: 5px;
	}
	.col-12 {
		margin-top: 15px;
	}
	input,
	button {
		width: calc(100% - 22px);
		margin: auto;
		display: inline-block;
	}
</style>
