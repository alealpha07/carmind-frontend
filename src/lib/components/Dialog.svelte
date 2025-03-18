<script lang="ts">
	let { show = $bindable(), unpersistent = false, children, ...others } = $props();
</script>

{#if unpersistent}
	<dialog open={show} {...others}>
		{@render children()}
	</dialog>
{:else}
	<div id="dialog-container" style="display: {show ? 'block' : 'none'}">
		<dialog open={show} {...others}>
			{@render children()}
		</dialog>
	</div>
{/if}

<style>
	@media only screen and (max-width: 575px) {
		dialog {
			width: 80% !important;
		}
	}

	@media only screen and (min-width: 576px) {
		dialog {
			width: 60% !important;
		}
	}

	@media only screen and (min-width: 768px) {
		dialog {
			width: 50% !important;
		}
	}

	@media only screen and (min-width: 992px) {
		dialog {
			width: 40% !important;
		}
	}

	@media only screen and (min-width: 1200px) {
		dialog {
			width: 30% !important;
		}
	}

	@media only screen and (min-width: 1400px) {
		dialog {
			width: 20% !important;
		}
	}

	#dialog-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999998;
		backdrop-filter: blur(1px);
	}

	dialog {
		position: absolute;
		border: none;
		background-color: #e3ebf2;
		border-radius: 15px;
		box-shadow: 10px 10px 10px var(--color-bg-5);
		padding: 15px;
		margin: auto;
		width: fit-content;
		height: fit-content;
		z-index: 999999;
	}
</style>
