<script lang="ts">
    let {show = $bindable(), children, ...others} = $props();

</script>

<div id="dialog-container" style="display: {show ? 'block':'none'}">
    <dialog open={show} {...others}>
        {@render children()}
    </dialog>
</div>

<style>
    #dialog-container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999998;
    }

    dialog {
        position: absolute;
        border: none;
        background-color: var(--color-bg-3);
        border-radius: 15px;
        box-shadow: 10px 10px 10px var(--color-bg-5);
        padding: 15px;
        margin: auto;
        width: fit-content;
        height: fit-content;
        z-index: 999999;
    }
</style>
