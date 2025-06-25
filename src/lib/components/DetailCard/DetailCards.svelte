<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet
        min?: number;
    }

    let { 
        children,
        min = 300
    }: Props = $props();
</script>

<div class="cards" style="--min: {min}px">
    {@render children?.()}
</div>

<style>
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
        gap: 10px;
    }
</style>