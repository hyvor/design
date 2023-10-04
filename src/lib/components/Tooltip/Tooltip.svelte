<script lang="ts">
    import {tick, onMount, onDestroy} from 'svelte';

    export let text: string = '';
    export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
    export let color : 'black' | 'accent' | 'soft' | 'danger' = 'black';
    export let show = false;
    export let maxWidth : number = 300;

    let wrap;
    let tooltip

    function positionTooltip() {
        if (wrap && tooltip && show) {
            const wrapRect = wrap.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let top, left

            if (position === 'top' || position === 'bottom') {
                const topVal = wrapRect.top - tooltipRect.height - 10;
                const leftVal = wrapRect.left + wrapRect.width/2 - tooltipRect.width/2;

                top = position === 'top' ? topVal : (wrapRect.bottom + 10);
                left = leftVal;
            }

            if (position === 'left' || position === 'right') {
                const topVal = wrapRect.top + wrapRect.height/2 - tooltipRect.height/2;
                const leftVal = wrapRect.left - tooltipRect.width - 10;

                top = topVal;
                left = position === 'left' ? leftVal : (wrapRect.right + 10);
            }

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        }
    }

    async function handleMouseEnter() {
        show = true;
        await tick();
        positionTooltip();
    }

    function handleMouseLeave() {
        show = false;
    }

    onMount(() => {
        positionTooltip();
        document.addEventListener('scroll', positionTooltip);

        return () => {
            document.removeEventListener('scroll', positionTooltip);
        }
    })

</script>

<div 
    class="tooltip-wrap  {color}"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="tooltip"
    bind:this={wrap}
>
    <slot />

    {#if show}
        <div 
            class="tooltip {position}" 
            style:max-width={maxWidth + 'px'}
            bind:this={tooltip}
        >
            {#if $$slots.tooltip}
                <slot name="tooltip" />
            {:else}
                {text}
            {/if}
        </div>
    {/if}
</div>

<style>
    .tooltip-wrap {
        display: inline-block;
        position: relative;

        --local-bg: #24292f;
        --local-color: #fff;
    }

    .tooltip-wrap.soft {
        --local-bg: var(--accent-light);
        --local-color: var(--accent);
    }

    .tooltip-wrap.accent {
        --local-bg: var(--accent);
        --local-color: var(--accent-text);
    }

    .tooltip-wrap.danger {
        --local-bg: var(--red-dark);
        --local-color: var(--text-white);
    }

    .tooltip {
        position: fixed;
        background-color: var(--local-bg);
        color: var(--local-color);
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 14px;
    }

    .tooltip:after {
        content: '';
        position: absolute;
        border: 4px solid transparent;
    }
    .tooltip.top:after {
        top: 100%;
        border-top-color: var(--local-bg);
        left: 50%;
        transform: translateX(-50%);
    }

    .tooltip.bottom:after {
        bottom: 100%;
        border-bottom-color: var(--local-bg);
        left: 50%;
        transform: translateX(-50%);
    }

    .tooltip.left:after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: var(--local-bg);
        margin-left: -1px;
    }

    .tooltip.right:after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: var(--local-bg);
        margin-right: -1px;
    }

</style>