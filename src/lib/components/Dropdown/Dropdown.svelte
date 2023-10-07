<script lang="ts">
    import {clickOutside} from "../../directives/clickOutside.js";
	import Box from './../Box/Box.svelte';

    export let show = false;
    export let width = 225;

    export let relative = false;
    export let closeOnOutsideClick = true;

</script>

<span 
    class="dropdown"
    class:relative
>

    <span 
        class="trigger"
        on:click={() => show = !show}
        role="listbox"
        tabindex="0"
        on:keyup={e => {
            if (e.key === 'Escape') {
                show = false;
            }
        }}
    >
        <slot name="trigger" />
    </span>

    {#if show}
        <div
            class="content-wrap"
            use:clickOutside={{
                enabled: closeOnOutsideClick,
                callback: () => show = false
            }}
        >
            <Box class="content" style="width:{width}px">
                <slot name="content" />
            </Box>
        </div>
    {/if}

</span>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown .content-wrap {
        position: absolute;
        top: 100%;
        margin-top: 5px;
        left: 0;
        z-index: 1;
    }

    .content-wrap > :global(.content) {
        padding: 10px;
    }

    .dropdown.relative > .content-wrap {
        position: relative;
    }

</style>