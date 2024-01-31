<script>
	import Toc from "./Toc.svelte";

</script>
<div class="docs">

    <slot name="nav" />
    <slot name="content" />

    <div class="right">
        <Toc />
    </div>
</div>

<style>

    .docs {
        display: flex;
        flex-direction: row;
        margin: auto;
        width: 1150px;
        max-width: 100%;
        padding-bottom: 40px;
        /* min-height: calc(100vh - var(--header-height)); */
    }

    .right {
        width: 220px;
        top: var(--header-height);
        padding: 25px 0;
        position: sticky;
        flex-shrink: 0;
    }

    @media (max-width: 992px) {
        .docs {
            flex-direction: column;
            width: 100%;
        }
        .right {
            order: 1;
        }
    }

</style>