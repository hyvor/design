<script lang="ts">
    import ToastIcon from "./ToastIcon.svelte";
	import type { Toast } from './toast.ts';
    import { fade } from 'svelte/transition';
    
    export let toast: Toast;
</script>

<div 
    class="toast" 
    out:fade={{ duration: 200 }}
    in:fade={{duration: 50}}
>

    {#if toast.type !== 'blank'}
        <div class="icon-wrap">
            <ToastIcon {toast} />
        </div>
    {/if}

    <div class="message-wrap">
        {#if typeof toast.message === 'string' || toast.message === null}
            {@html toast.message }
        {:else}
            <svelte:component this={toast.message} {toast} />
        {/if}
    </div>

</div>

<style>
    .toast {
        margin-bottom: 10px;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        border-radius: var(--box-radius);
        background-color: var(--box-background);
        padding: 8px 20px;
        display: flex;
        align-items: center;
        max-width: 350px;
        pointer-events: initial;
    }
    .toast:first-child {
        margin-top: 10px;
    }
    .icon-wrap {
        margin-right: 8px;
        display: inline-flex;
        align-items: center;
    }
</style>