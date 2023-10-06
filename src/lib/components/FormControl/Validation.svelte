<script lang="ts">
    import ExclamationTriangleFill from '$lib/icons/ExclamationTriangleFill.svelte';
    import InfoCircleFill from '$lib/icons/InfoCircleFill.svelte';
    import CheckCircleFill from '$lib/icons/CheckCircleFill.svelte';

    export let state : 'error' | 'warning' | 'success' = 'error';
</script>

<div class="validation {state}">
    <div class="icon">

        {#if state === 'error'}
            <ExclamationTriangleFill />
        {:else if state === 'warning'}
            <InfoCircleFill />
        {:else}
            <CheckCircleFill />
        {/if}

    </div>
    <div class="message">
        <slot />
    </div>
</div>

<style lang="scss">
    .validation {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .icon {
        margin-right: 8px;
    }
    .validation.error {
        color: var(--red-dark);
    }
    .validation.warning {
        color: var(--orange-dark);
    }
    .validation.success {
        color: var(--green-dark);
    }

    :global(:root.dark) {
        .validation.error {
            color: var(--red);
        }
        .validation.warning {
            color: var(--orange);
        }
        .validation.success {
            color: var(--green);
        }
    }
</style>