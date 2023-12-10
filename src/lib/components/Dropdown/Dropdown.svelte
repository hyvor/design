<script lang="ts">
    import {clickOutside} from "../../directives/clickOutside.js";
	import Box from './../Box/Box.svelte';

    export let show = false;
    export let width = 225;

    export let relative = false;
    export let closeOnOutsideClick = true;

    export let align : 'start' | 'center' | 'end' = 'start';
    export let position : 'left' | 'right' | 'bottom' | 'top' = 'bottom';

</script>

<span 
    class="dropdown {relative ? 'relative' : ''}"
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
            class="content-wrap {align} {position}"
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

<style lang="scss">
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown .content-wrap {
        position: absolute;
        left: 0;
        z-index: 1;
        
    }

    .content-wrap.bottom {
        top: 100%;
        margin-top: 5px;
        &.end {
            left: auto;
            right: 0;
        }
        &.center {
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .content-wrap.top {
        
        bottom: 100%;
        margin-bottom: 5px;
        &.end {
            left: auto;
            right: 0;
        }
        &.center {
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .content-wrap.left {
         right: 100%;
         left:auto; //to remove the prvious left positioning
        margin-right: 5px; 
        top: 0;
            bottom: auto;
        &.end {
            top: auto;
            bottom: 0;
        }
        &.center {
            top: 50%;
            transform: translateY(-50%); 
            
        }
    }

    .content-wrap.right {
        left: 100%;
        margin-left: 5px;
        top: 0;
        bottom: auto;
        &.end {
            bottom: 0;
            top: auto;
        }
        &.center {
            top: 50%;
            transform: translateY(-50%);
        }
    }


    .content-wrap > :global(.content) {
        padding: 10px;
    }

    .dropdown.relative > .content-wrap {
        position: relative;
    }

</style>




