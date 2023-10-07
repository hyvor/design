<script lang="ts">
    import { getContext, createEventDispatcher } from 'svelte';
    import Check from '$lib/icons/Check.svelte';
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';

    const selection : 'none' | 'single' | 'multi' = getContext('action-list-selection');

    export let selected = false;
    selected = selection !== 'none' && selected;
    export let disabled = false;
    export let type : 'default' | 'danger' = 'default';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('select');
    }

</script>

<div
    class="action-list-item"
    class:disabled={disabled}
    class:danger={type === 'danger'}
    on:click={handleClick}
    role="button"
    tabindex="0"
    on:keyup={e => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }}
>

    {#if selection !== 'none'}
        <span class="selected">
            {#if selection === 'multi'}
                <span style="transform:scale(0.9);transform-origin:top">
                    <Checkbox checked={selected} 
                    tabindex="-1" />
                </span>
            {:else}
                {#if selected}
                    <Check />
                {/if}
            {/if}
        </span>
    {/if}

    {#if $$slots.start}
        <span class="start">
            <slot name="start" />
        </span>
    {/if}

    <span class="middle">
        <slot />

        {#if $$slots.description}
            <div class="description">
                <slot name="description" />
            </div>
        {/if}
    </span>

    {#if $$slots.end}
        <span class="end">
            <slot name="end" />
        </span>
    {/if}

</div>

<style>
    div.action-list-item {
        padding: 6px 14px;
        display: flex;
        align-items: center;
        border-radius: var(--box-radius);
        cursor: pointer;
        position: relative;
        font-size: 14px;
    }
    div.action-list-item:hover {
        background-color: var(--hover);
    }
    div.action-list-item.danger {
        color: var(--red-dark);
    }
    div.action-list-item.danger:hover {
        background-color: #fffafa;
    }

    .selected {
        width: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .start, .middle, .end {
        display: inline-flex;
        align-items: center;
    }
    .start {
        margin-right: 8px;
    }

    .middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .end {
        margin-left: 8px;
    }

    .description {
        font-size: 12px;
        color: var(--text-light);
    }

</style>