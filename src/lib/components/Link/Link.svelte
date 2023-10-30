<script lang="ts">
    export let href: string;
    export let color : 'link' | 'accent' | 'text' = 'link';
    export let underline : boolean = true;
</script>

<a
    {href}

    class="color-{color}"
    class:underline={underline}

    on:keyup
    on:keydown
    on:keypress
    on:focus
    on:blur
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:change

    {...$$restProps}
>

    {#if $$slots.start}
        <span class="slot start-slot"><slot name="start" /></span>
    {/if}

    <slot />

    {#if $$slots.end}
        <span class="slot end-slot"><slot name="end" /></span>
    {/if}

</a>

<style>
    a {
        display: inline-flex;
        align-items: center;
        color: var(--local-color);
    }
    a.color-link {
        --local-color: var(--link);
    }
    a.color-accent {
        --local-color: var(--accent);
    }
    a.color-text {
        --local-color: var(--text);
    }
    a.underline {
        text-decoration: underline;
        text-decoration-color: var(--local-color);
    }
    a:not(.underline):hover {
        text-decoration: underline;
    }

    .slot {
        display: inline-flex;
        align-items: center;
    }

    .start-slot {
        margin-right: 4px;
    }
    .end-slot {
        margin-left: 4px;
    }
</style>