<script lang="ts">
    export let bold = false;
</script>

<div class="caption" class:bold>
    <slot /> 
</div>

<style>
    .caption {
        font-size: 14px;
        color: var(--text-light);
    }
    .caption.bold {
        font-weight: 600;
    }
</style>