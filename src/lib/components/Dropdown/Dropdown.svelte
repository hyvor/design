<script lang="ts">
    import DropdownContent from "./DropdownContent.svelte";

    export let show = false;
    export let width = 225;

    export let relative = false;
    export let closeOnOutsideClick = true;

    export let align: "start" | "center" | "end" = "start";
    export let position: "left" | "right" | "bottom" | "top" = "bottom";

    let trigger: HTMLElement;
</script>

<span class="dropdown" class:relative>
    <span
        class="trigger"
        on:click={() => (show = !show)}
        role="listbox"
        tabindex="0"
        on:keyup={(e) => {
            if (e.key === "Escape") {
                show = false;
            }
        }}
        bind:this={trigger}
    >
        <slot name="trigger" />
    </span>

    {#if show}
        <DropdownContent
            bind:show
            {width}
            {closeOnOutsideClick}
            {align}
            {position}
            {relative}
            {trigger}
        >
            <slot name="content" />
        </DropdownContent>
    {/if}
</span>

<style lang="scss">
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown.relative > :global(.content-wrap) {
        position: relative !important;
    }
</style>
