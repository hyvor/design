<script lang="ts">
    import ToastMessage from "./ToastMessage.svelte";
    import { toastStore } from "./toast.js";
    import { useCleaner } from "./cleaner.js";

    useCleaner();
</script>

<div id="toasts-wrap">
    {#each $toastStore as toast (toast.id)}
        <ToastMessage {toast} />
    {/each}
</div>

<style>
    #toasts-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
</style>