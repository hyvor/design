<script>
	import Toc from "./Toc.svelte";

</script>
<div class="docs">

    <slot name="nav" />
    <slot name="content" />
    <Toc />

</div>

<style>

    .docs {
        display: flex;
        flex-direction: row;
        margin: auto;
        width: 1150px;
        max-width: 100%;
        padding-bottom: 100px;
        /* min-height: calc(100vh - var(--header-height)); */
    }

</style>