<script lang="ts">
    import { IconCheckCircleFill, IconExclamationTriangleFill, IconInfoCircleFill } from "@hyvor/icons";

    export let state : 'error' | 'warning' | 'success' = 'error';
</script>

<div class="validation {state}">
    <div class="icon">

        {#if state === 'error'}
            <IconExclamationTriangleFill />
        {:else if state === 'warning'}
            <IconInfoCircleFill />
        {:else}
            <IconCheckCircleFill />
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