<script lang="ts">
    import { onMount } from "svelte";
    import { clickOutside } from "../directives/clickOutside.js";
    import debounce from "../directives/debounce.js";

    export let show: boolean;
    export let width: number;
    export let relative: boolean;

    export let closeOnOutsideClick = true;

    export let align: "start" | "center" | "end";
    export let position: "left" | "right" | "bottom" | "top";

    export let trigger: HTMLElement;

    let contentWrap: HTMLElement;

    function positionWrap() {
        if (!trigger) return;
        if (!contentWrap) return;
        if (relative) return;

        const triggerRect = trigger.getBoundingClientRect();
        const contentRect = contentWrap.getBoundingClientRect();

        const documentWidth = document.documentElement.clientWidth;

        const GAP = 5;
        const SPACE_AROUND = 15;

        if (position === "bottom") {
            contentWrap.style.top = triggerRect.bottom + GAP + "px";
        } else if (position === "top") {
            contentWrap.style.top =
                triggerRect.top - contentRect.height - GAP + "px";
        } else if (position === "left") {
            contentWrap.style.left =
                triggerRect.left - contentRect.width - GAP + "px";
        } else if (position === "right") {
            contentWrap.style.left = triggerRect.right + GAP + "px";
        }

        if (position === "bottom" || position === "top") {
            if (align === "start") {
                if (triggerRect.left + contentRect.width < documentWidth) {
                    contentWrap.style.left = triggerRect.left + "px";
                } else {
                    contentWrap.style.right = SPACE_AROUND + "px";
                }
            } else if (align === "center") {
                contentWrap.style.left =
                    triggerRect.left +
                    triggerRect.width / 2 -
                    contentRect.width / 2 +
                    "px";
            } else if (align === "end") {
                contentWrap.style.left =
                    Math.max(
                        triggerRect.right - contentRect.width,
                        SPACE_AROUND
                    ) + "px";
            }
        } else {
            if (align === "start") {
                contentWrap.style.top = triggerRect.top + "px";
            } else if (align === "center") {
                contentWrap.style.top =
                    triggerRect.top +
                    triggerRect.height / 2 -
                    contentRect.height / 2 +
                    "px";
            } else if (align === "end") {
                contentWrap.style.top =
                    triggerRect.bottom - contentRect.height + "px";
            }
        }

        if (width >= documentWidth - SPACE_AROUND * 2) {
            contentWrap.style.width = documentWidth - SPACE_AROUND * 2 + "px";
        } else {
            contentWrap.style.width = width + "px";
        }
    }

    $: if ((position, align)) {
        positionWrap();
    }

    function debouncedPosition() {
        debounce(positionWrap, 10)();
    }

    onMount(() => {
        positionWrap();
    });
</script>

<svelte:window on:resize={debouncedPosition} on:scroll={debouncedPosition} />

<div
    class="content-wrap {align} {position}"
    use:clickOutside={{
        enabled: closeOnOutsideClick,
        callback: () => (show = false),
    }}
    bind:this={contentWrap}
    style="width: {width}px"
>
    <div class="hds-box content">
        <slot />
    </div>
</div>

<style lang="scss">
    .content-wrap {
        position: fixed;
        z-index: 1000000;
    }

    .content-wrap > .content {
        padding: 10px;
    }
</style>
