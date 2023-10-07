<script lang="ts">
    import Caption from "../FormControl/Caption.svelte";
    import Label from "../FormControl/Label.svelte";

    export let label: string = "";
    export let caption: string = "";
</script>


<div class="split-control" class:has-nested={$$slots.nested}>

    <div class="left">

        <div class="label-wrap">
            {#if $$slots.label}
                <slot name="label" />
            {:else}
                <Label>{label}</Label>
            {/if}
        </div>

        {#if $$slots.caption || caption}
            <div class="caption-wrap">
                {#if $$slots.caption}
                    <slot name="caption" />
                {:else if caption}
                    <Caption>{caption}</Caption>
                {/if}
            </div>
        {/if}
    </div>

    {#if $$slots.default}
        <div class="right">
            <slot></slot>
        </div>
    {/if}

</div>

{#if $$slots.nested}
    <div class="nested">
        <slot name="nested"></slot>
    </div>
{/if}

<style lang="scss">

    .split-control {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--accent-lightest);
        line-height: 1.3;
        &:last-child, &.has-nested {
            border-bottom: none;
        }
    }

    .nested { 
        margin-left: 40px;
        padding-top: 0;
        padding-left: 15px;
        border-left: 2px solid var(--accent-light);
    }

    .left {
        padding: 15px;
        flex: 1;
        min-width: 200px;
    }

    .right {
        padding: 15px;
        flex: 3;
    }

    .caption-wrap {
        margin-top: 4px;
    }

</style>