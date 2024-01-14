<script lang="ts">
    import type { ComponentType, SvelteComponent } from 'svelte';
    import { IconBug, IconInbox, IconPatchExclamation } from '@hyvor/icons';

    export let icon : ComponentType|null = null;
    export let message : string|null = null;
    export let iconSize : 100|number = 100;
    export let padding : number = 0;

    export let empty : boolean = false;
    export let error : boolean = false;

    export let iconColor : string | null = null;

    if (empty) {
        message = message || 'No results found';
        icon = IconInbox;
    }

    if (error) {
        message = message || 'Something went wrong';
        icon = IconPatchExclamation;
        iconColor = iconColor || 'var(--red)';
    }

    iconColor = iconColor || 'var(--gray-dark)';

</script>

<div 
    class="icon-message"
    style:padding={padding + 'px'} 
>

    <div 
        class="icon" 
        style:color={iconColor}
        {...$$restProps}
        >
            {#if $$slots.icon}
                <slot name="icon" />
            {:else if icon}
                <svelte:component this={icon} size={iconSize + 'px' } />
            {/if}
    </div>

    <p class="message">
        {#if $$slots.message}
            <slot name="message" />
        {:else if message}
            {message}
        {/if}
    </p>

</div>

<style>

    .icon-message {
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-direction: column; /* Change to column direction */
        text-align: center;
    }

    .message {
        /* Add message styles here */
        color: var(--text-light);
        margin-top: -10px;
    }

    .icon {
    }

</style> 
