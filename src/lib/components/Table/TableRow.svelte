<script lang="ts">
    export let head : boolean = false;
</script>

<style>
    div {
        display: grid;
        padding: 8px 18px;
        border-radius: 20px;
        align-items: flex-start;
        grid-template-columns: var(--local-columns);
    }
    div.head {
        font-weight: 600;
        background: var(--accent-lightest);
        margin-bottom: 5px;
    }
    div:hover:not(.head) {
        background-color: var(--local-hover-color);
    }
    div > :global(*) {
        padding-right: 5px;
        word-wrap: break-word;
    }
</style>

<div class:head={head} {...$$props}>
    <slot />
</div>