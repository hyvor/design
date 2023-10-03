<script lang="ts">
    export let as: 'button' | 'a' = 'button';
    export let size : 'small' | 'medium' | 'large' = 'medium';
    export let color : 'accent' | 'soft' | 'invisible' | 'danger' = 'accent';
</script>

<svelte:element 
    this={as}
    class="button {size} {color}"
    {...$$restProps}
>

    {#if $$slots.start}
        <span class="slot start"><slot name="start" /></span>
    {/if}

    <slot></slot>

    {#if $$slots.end}
        <span class="slot end"><slot name="end" /></span>
    {/if}

</svelte:element>

<style lang="scss">

    .slot.start {
        margin-right: 6px;
        display: inline-flex;
        align-items: center;
    }

    .slot.end {
        margin-left: 6px;
        display: inline-flex;
        align-items: center;
    }


    .button {
        position: relative;
        display: inline-flex;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        border-radius: 20px;
        cursor: pointer;

        --local-hover-shadow-size: 2px;
    }

    /* Sizes */
    .button.small {
        height: 26px;
        padding: 0 12px;

        .slot.start {
            margin-right: 4px;
        }
        .slot.end {
            margin-left: 4px;
        }
    }
    .button.medium {
        height: 30px;
        padding: 0 14px;
    }
    .button.large {
        height: 36px;
        padding: 0 20px;
        --local-hover-shadow-size: 3px;
    }


    /* styles */
    .button.accent {
        background-color: var(--accent);
        color: var(--text-white);
        transition: .2s box-shadow;
        &:hover {
            box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--accent-light);
        }
    }

    .button.soft {
        background-color: var(--accent-light);
        color: var(--accent);
        transition: .2s box-shadow;
        &:hover {
            box-shadow: 0 0 0 2.5px #eee;
        }
    }

    .button.invisible {
        background-color: transparent;
        color: var(--text);
        &:hover {
            background-color: var(--accent-light);
        }
    }

    .button.danger {
        background-color: var(--red-dark);
        color: var(--text-white);
        transition: .2s box-shadow;
        &:hover {
            box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--red-light);
        }
    }

</style>