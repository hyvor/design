<script lang="ts">
    import {clickOutside} from "../../directives/clickOutside.js";
    import { IconX } from '@hyvor/icons';
    import IconButton from './../IconButton/IconButton.svelte';
	import { scale } from 'svelte/transition';
    import { onMount, tick } from "svelte";

    export let show = false;
    export let title = "";
    export let size : "small" | "medium" | "large" = "medium";
    export let closeOnOutsideClick = true;
    export let closeOnEscape = true;

    let wrapEl: HTMLDivElement;
    let innerEl: HTMLDivElement;

    async function setFlex() {
        await tick();
        if (!wrapEl || !innerEl) return;
        if (innerEl.offsetHeight > wrapEl.offsetHeight - 60) {
            wrapEl.style.alignItems = 'flex-start';
        } else {
            wrapEl.style.alignItems = 'center';
        }
    }

    onMount(setFlex);
    $: show, setFlex();

</script>

<svelte:window on:keyup={e => {
    if (e.key === 'Escape' && closeOnEscape) {
        show = false;
    }
}} />


{#if show}
    <div 
        class="wrap"
        bind:this={wrapEl}
    >

        <div 
            class="inner {size}"
            use:clickOutside={{
                enabled: closeOnOutsideClick,
                callback: () => show = false
            }}
            in:scale={{duration: 100, start: 0.9, opacity: 0.9}}
            bind:this={innerEl}
        >

            <div class="header">

                <div class="title">
                    {#if $$slots.title}
                        <slot name="title" />
                    {:else}
                        <span>{title}</span>
                    {/if}
                </div>

                <div class="close-wrap">
                    <IconButton
                        variant="invisible"
                        on:click={() => show = false}
                    >
                        <IconX size={25} />
                    </IconButton>
                </div>

            </div>

            <div class="content">
                <slot /> 
            </div>

            {#if $$slots.footer}
                <div class="footer">
                    <slot name="footer" />
                </div>
            {/if}

        </div>

    </div>
{/if}

<style>

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000000;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        overflow: auto;
    }

    .inner {
        background: var(--box-background);
        border-radius: var(--box-radius);
        box-shadow: var(--box-shadow);
        width: 650px;
        max-width: 100%;
        position: relative;
    }

    .inner.small {
        width: 425px;
    }
    .inner.large {
        width: 800px;
    }

    .header {
        padding: 20px 25px;
        display: flex;
        align-items: center;
    }

    .title {
        flex: 1;
    }
    .title span {
        font-size: 1.2em;
        font-weight: 600;
    }

    .content {
        padding: 20px 25px;
    }

    .footer {
        padding: 20px 25px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .footer :global(button:not(:last-child)) {
        margin-right: 2px;
    }

</style>