<script lang="ts">
    export let gap : number|'small'|'medium'|'large' = 'medium';

    const gaps = {
        small: 4,
        medium: 8,
        large: 16
    }
    gap = typeof gap === 'number' ? gap : gaps[gap]

</script>


<div class="checkbox-group" style:gap={gap + "px"}>
    <slot />
</div>

<style>
    .checkbox-group {
        display: flex;
        flex-direction: column;
    }
</style>