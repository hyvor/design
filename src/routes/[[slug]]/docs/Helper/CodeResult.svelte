<script lang="ts">
    export let gap : number | undefined = undefined;
</script>

<div 
    class="results"
    class:gap={!!gap}
    style="{gap ? `gap: ${gap}px` : ''}"
    {...$$props}
>
    <slot />
</div>

<style>
    .results {
        padding: 20px 25px;
        background-color: #fbfbfb;
        border-radius: 20px;
        border: 1px solid #eee;
    }
    .results.gap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    :global(:root.dark) .results {
        background-color: #1e1e1e;
        border-color: #333;
    }
</style>