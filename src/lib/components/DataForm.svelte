<script lang="ts">
	let { 
    data = [], 
    fields = [], 
    buttonLeft = {label: 'buttonLeft'},
    buttonRight = {label: 'buttonRight'},
    error = $bindable(),
    clickLeft, clickRight
  } = $props();

  //data = ['test', 0, false, '2024-01-31'], 
  //fields = [{ type: 'text', label: 'label' }, {type: 'number', label: 'label2', placeholder: '0', min: 0, step: 0.5}, {type: 'boolean', label: 'test'}, {type: 'date', min: '2024-01-30'}]

  let errorShow = $derived.by(() => {
    let result = error != "" && error != null;
    if(result){
      setTimeout(() => {
        error = ""
      }, 7500);
    }
		return result;
	});

  let tempData = JSON.parse(JSON.stringify(data));
  
</script>

<div class="container" style="position: relative;">
  <div class="row">
    {#if errorShow}
    <p class="error-box"><b>{error}</b></p>
    {/if}
  </div>
	<div class="row">
		{#each fields as field, index}
      {#if field.type == 'text'}
			<div class="col-12">
				<label for="form-element-{index}"><b>{field.label}</b></label> <br />
				<input type="text" id="form-element-{index}" placeholder="{field.label}" bind:value="{tempData[index]}" />
			</div>
      {:else if field.type == 'date'}
			<div class="col-12">
				<label for="form-element-{index}"><b>{field.label}</b></label> <br />
				<input type="date" id="form-element-{index}" bind:value="{tempData[index]}" min="{field.min}" max="{field.max}" />
			</div>
      {:else if field.type == 'number'}
			<div class="col-12">
				<label for="form-element-{index}"><b>{field.label}</b></label> <br />
				<input type="number" id="form-element-{index}" bind:value={tempData[index]} placeholder="{field.placeholder}" 
        min={field.min} max={field.max} step={field.step}/>
			</div>
      {:else if field.type == 'boolean'}
			<div class="col-12">
				<div class="align-container">
					<b>{field.label}</b>
					<label style="display: inline-block;" class="switch" for="form-element-{index}">
						<input type="checkbox" id="form-element-{index}" bind:checked={tempData[index]} />
						<div class="slider round"></div>
					</label>
				</div>
			</div>
      {/if}
		{/each}
	</div>
  <div class="row">
    <div class="col-12" style="height: 42px;">
      <div style="width: fit-content; position: absolute; right: 0;">
        <button onclick={clickLeft}  class="button-secondary">{buttonLeft.label}</button>
        <button onclick={() => {clickRight(tempData)}} >{buttonRight.label}</button>
      </div>
    </div>
  </div>
</div>

<style>

  .col-12{
    margin-top: 5px;
  }

  .row {
    width: 100%;
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
