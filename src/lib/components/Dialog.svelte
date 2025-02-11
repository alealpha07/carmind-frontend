<script lang="ts">
    let {show = $bindable(), children, ...others} = $props();

</script>

<dialog open={show} {...others}>
    {@render children()};
</dialog>


<style>
    dialog {
        position: absolute;
        border: none;
        background-color: var(--color-bg-3);
        border-radius: 15px;
        box-shadow: 10px 10px 10px var(--color-bg-5);
        padding: 15px;
        margin: auto;
        width: 50%;
        height: 50%;
    }
</style>
