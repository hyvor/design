<script lang="ts">
    export let as : string = 'div';
</script>

<svelte:element 
    this={as}
    style:box-shadow="var(--box-shadow)"
    style:border-radius="var(--box-radius)"
    style:background-color="var(--box-background)"
    {...$$restProps}
>
    <slot />
</svelte:element>

<style>
    :global(.hds-box) {
        box-shadow: var(--box-shadow);
        border-radius: var(--box-radius);
        background-color: var(--box-background);
    }
</style>