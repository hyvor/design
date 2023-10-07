<script lang="ts">
    import { setContext } from 'svelte';

    export let selection : 'none' | 'single' | 'multi' = 'none';

    $: setContext('action-list-selection', selection);
</script>

<div class="action-list">
    <slot />
</div>


<style></style>