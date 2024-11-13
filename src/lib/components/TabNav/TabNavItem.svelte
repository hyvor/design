<script lang="ts">
	import { createBubbler, handlers } from 'svelte/legacy';

	const bubble = createBubbler();
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Props {
		active?: boolean;
		name: string;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		active = false,
		name,
		start,
		children,
		end,
		...rest
	}: Props = $props();

	const activeStore = getContext('tab-nav-active') as Writable<string>;

	let isActive = $derived($activeStore === name || active);

	function handleClick() {
		activeStore.set(name);
	}
</script>

<button class="tab" class:active={isActive} onclick={handlers(handleClick, bubble('click'))} {...rest}>
	{#if start}
		<span class="start">
			{@render start?.()}
		</span>
	{/if}
	{@render children?.()}
	{#if end}
		<span class="end">
			{@render end?.()}
		</span>
	{/if}
</button>

<style>
	.tab {
		position: relative;
		padding: 10px 15px;
		border-bottom: 3px solid #f1f1f1;
		cursor: pointer;
		font-weight: 600;
		display: flex;
		align-items: center;
	}
	.tab.active {
		border-bottom-color: var(--accent);
		color: var(--accent);
	}
	.start {
		display: inline-flex;
		margin-right: 7px;
		align-items: center;
	}
	.end {
		display: inline-flex;
		margin-left: 4px;
		align-items: center;
	}
</style>
