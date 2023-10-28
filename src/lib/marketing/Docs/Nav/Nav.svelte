<script lang="ts">
    import Box from "$lib/components/Box/Box.svelte";
</script>

<div class="docs-nav">

    <Box as="nav" class="nav-inner">
        <slot />
    </Box>

</div>

<style>

    .docs-nav {
        width: 220px;
        top: var(--header-height, 0);
        padding: 25px 0;
        position: sticky;
        flex-shrink: 0;
        align-self: flex-start;
        max-height: calc(100vh - var(--header-height));
    }

    .docs-nav :global(.nav-inner) {
        padding: 15px 0;
        overflow-y: auto;
        max-height: calc(100vh - var(--header-height) - 50px);
    }

</style>