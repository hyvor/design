<script lang="ts">
	import { run } from 'svelte/legacy';

	import { setContext } from 'svelte';

	interface Props {
		selection?: 'none' | 'single' | 'multi';
		selectionAlign?: 'start' | 'end';
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { selection = 'none', selectionAlign = 'start', children, ...rest }: Props = $props();

	run(() => {
		setContext('action-list-selection', selection);
	});
	run(() => {
		setContext('action-list-selection-align', selectionAlign);
	});
</script>

<div class="action-list" {...rest}>
	{@render children?.()}
</div>

<style></style>
