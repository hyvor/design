<script lang="ts">
    import {clickOutside} from "../../directives/clickOutside.js";
	import Box from './../Box/Box.svelte';

    export let show = false;
    export let width = 225;

    export let relative = false;
    export let closeOnOutsideClick = true;

    export let align : 'start' | 'center' | 'end' = 'start';

</script>

<span 
    class="dropdown"
    class:relative
>

    <span 
        class="trigger"
        on:click|stopPropagation={() => show = !show}
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
            class="content-wrap {align}"
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

    .content-wrap.end {
        left: auto;
        right: 0;
    }

    .content-wrap.center {
        left: 50%;
        transform: translateX(-50%);
    }

    .content-wrap > :global(.content) {
        padding: 10px;
    }

    .dropdown.relative > .content-wrap {
        position: relative;
    }

</style>