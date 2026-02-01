<script lang="ts">
	import { setContext } from 'svelte';

	interface Props {
		selection?: 'none' | 'single' | 'multi';
		selectionAlign?: 'start' | 'end';
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { selection = 'none', selectionAlign = 'start', children, ...rest }: Props = $props();

	setContext('action-list-selection', () => selection);
	setContext('action-list-selection-align', () => selectionAlign);
</script>

<div class="action-list" {...rest}>
	{@render children?.()}
</div>

<style></style>
