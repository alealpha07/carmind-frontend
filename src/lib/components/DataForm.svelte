<script lang="ts">
	let {} = $props();
</script>

<div id="form-container">
	<div class="row">
    <label for="dateElement">DateField</label>
	<input
		type="date"
		id="start"
		name="trip-start"
		value="2018-07-22"
		min="2018-01-01"
		max="2018-12-31"
	/>
	<br />
	<label for="textElement">TextField</label>
	<input type="text" id="textElement" placeholder="test" />
	<br />
	<label for="numberElement">NumberField</label>
	<input type="number" id="numberElement" placeholder="test" />
	<br />
	<div class="align-container">
    <label style="display: inline-block;">BoolField</label>
    <label style="display: inline-block;" class="switch" for="boolElement">
      <input type="checkbox" id="boolElement" />
      <div class="slider round"></div>
    </label>
  </div>
	<label for="fileElement">FileField</label>
	<input type="file" id="fileElement" />
	<br />
  </div>
</div>

<style>

  #form-container {
    width: 50vw;
    margin: auto;
    margin-top: 50px;
  }

  .align-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

	input {
		font-size: inherit;
		font-family: inherit;
		border: solid var(--color-theme-1) 1px;
		background-color: transparent;
		border-radius: 11px;
		padding: 11px;
		cursor: pointer;
		color: var(--color-text);
		transition-duration: 300ms;
	}

  input:focus{
    outline: solid var(--color-theme-1-darker) 1px;
  }
	input[type='file'] {
		border: none;
		cursor: default;
	}
  input[type='file']:focus {
    outline: none;
		border: none;
		cursor: default;
	}
	input::file-selector-button {
		font-size: inherit;
		font-family: inherit;
		border: solid var(--color-theme-1) 1px;
		background-color: transparent;
		border-radius: 11px;
		padding: 11px;
		cursor: pointer;
		color: var(--color-theme-1);
		transition-duration: 300ms;
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
		background-color: #ccc;
		bottom: 0;
		cursor: pointer;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.4s;
	}
	.slider:before {
		background-color: #fff;
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
