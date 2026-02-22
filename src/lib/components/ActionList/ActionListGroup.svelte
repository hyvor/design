<script lang="ts">
	import { setContext } from 'svelte';

	interface Props {
		title?: string | undefined;
		divider?: boolean;
		selection?: undefined | 'single' | 'multi';
		children?: import('svelte').Snippet;
	}

	let { title = undefined, divider = false, selection = undefined, children }: Props = $props();

	setContext('action-list-selection', () => selection);
</script>

<div class="action-list-group" class:has-divider={divider}>
	{#if divider}
		<div class="divider"></div>
	{/if}

	{#if title}
		<div class="title">{title}</div>
	{/if}

	{@render children?.()}
</div>

<style>
	.divider {
		border-bottom: 2px solid var(--border);
		margin-bottom: 14px;
	}
	.title {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--text-light);
		padding: 0 14px;
		margin-bottom: 6px;
	}
	.action-list-group:not(:first-child) {
		margin-top: 12px;
	}
</style>
