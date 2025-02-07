<script lang="ts">
	let {} = $props();
</script>

<div id="form-container">
	<div class="row">
    <div class="col-12" style="margin-top: 5px;">
      <label for="dateElement"><b>DateField</b></label> <br>
      <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31"/>
    </div>
    <div class="col-12" style="margin-top: 5px;">
      <label for="textElement"><b>TextField</b></label> <br>
      <input type="text" id="textElement" placeholder="test" />
    </div>
    <div class="col-12" style="margin-top: 5px;">
      <label for="numberElement"><b>NumberField</b></label> <br>
      <input type="number" id="numberElement" placeholder="test" />
    </div>
    <div class="col-12" style="margin-top: 5px;">
      <div class="align-container">
        <b>BoolField</b>
        <label style="display: inline-block;" class="switch" for="boolElement">
          <input type="checkbox" id="boolElement" />
          <div class="slider round"></div>
        </label>
      </div>
    </div>
    <div class="col-12" style="margin-top: 5px;">
      <label for="fileElement"><b>FileField</b></label> <br>
      <input type="file" id="fileElement" />
    </div>
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

  input{
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
