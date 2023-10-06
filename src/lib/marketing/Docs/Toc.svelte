<script lang="ts">
    import Box from "$lib/components/Box/Box.svelte";
</script>

<div class="toc-wrap">

    <Box style="padding: 15px 20px">
        Table of Contents
    </Box>

</div>

<style>

    .toc-wrap {
        width: 220px;
        top: var(--header-height);
        padding: 25px 0;
        position: sticky;
        flex-shrink: 0;
        align-self: flex-start;
    }

</style>