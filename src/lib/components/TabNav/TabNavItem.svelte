<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { TabNavState } from './tabnav.js';

	interface Props {
		active?: boolean;
		name: string;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		index?: boolean; // index for path-based activation

		onclick?: (event: MouseEvent) => void;
	}

	let { active = false, name, start, children, end, index, onclick }: Props = $props();

	const tabNavState = getContext('tab-nav-state') as TabNavState;

	function getTabPath() {
		if (!tabNavState.basePath) return '';
		return index ? `${tabNavState.basePath}` : `${tabNavState.basePath}/${name}`;
	}

	let isActive = $derived.by(() => {
		if (active) return true;

		if (tabNavState.basePath) {
			const currentUrl = page.url.pathname;
			return currentUrl === getTabPath();
		}

		return false;
	});

	function handleClick(event: MouseEvent) {
		if (tabNavState.basePath) {
			goto(getTabPath());
		}
		onclick?.(event);
	}
</script>

<button class="tab" class:active={isActive} onclick={handleClick}>
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
