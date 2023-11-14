<script lang="ts">
    export let small = false;
    export let light = false;
    export let normal = false; // weight
    export let bold = false;
</script>

<span
    class:light
    class:small
    class:normal
    class:bold

    {...$$restProps}
>
    <slot />
</span>

<style>
    span.light {
        color: var(--text-light);
    }
    span.small {
        font-size: 0.8em;
    }
    span.normal {
        font-weight: 400;
    }
    span.bold {
        font-weight: 600;
    }
</style>