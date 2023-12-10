<script lang="ts">
    import { setContext } from 'svelte';

    export let selection : 'none' | 'single' | 'multi' = 'none';

    $: setContext('action-list-selection', selection);
</script>




<div class="action-list" {...$$restProps}>
    <slot />
</div>



<style></style>