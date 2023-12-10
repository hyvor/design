<script lang="ts">
    import { default as toastService } from '$lib/components/Toast/toast.js';
    import type { Toast } from '$lib/components/Toast/toast.js'
    import Button from '$lib/components/Button/Button.svelte';

    export let toast: Toast;
</script>

This is a Svelte Component notification with a long text message and a button to close it.

<div style="margin-top:10px;text-align:center">
    <Button 
        on:click={() => toastService.close(toast.id)} 
        size="small"
        style="margin-left: 4px;"
    >Close</Button>
</div>