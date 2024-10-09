<script lang="ts">
	import { setContext } from 'svelte';

	export let selection: 'none' | 'single' | 'multi' = 'none';
	export let selectionAlign: 'start' | 'end' = 'start';

	$: setContext('action-list-selection', selection);
	$: setContext('action-list-selection-align', selectionAlign);
</script>

<div class="action-list" {...$$restProps}>
	<slot />
</div>

<style></style>
