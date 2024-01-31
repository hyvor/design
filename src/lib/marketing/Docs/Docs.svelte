<script>
	import Sidebar from "./Sidebar/Sidebar.svelte";
</script>
<div class="docs">

    <slot name="nav" />
    <slot name="content" />
    <Sidebar />
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


    @media (max-width: 992px) {
        .docs {
            flex-direction: column;
            width: 100%;
        }
    }

</style>