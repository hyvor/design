<script lang="ts">
    export let columns : string;
    export let hover : boolean = false;

    const hoverCss = hover ? "--local-hover-color: var(--hover);" : '';
</script>

<div class="table" style="
    --local-columns: {columns};
    {hoverCss}
">
    <slot />
</div>