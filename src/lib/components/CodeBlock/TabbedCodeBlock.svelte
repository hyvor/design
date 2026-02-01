<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../Button/Button.svelte';

	interface Props {
		children: Snippet;
		tabs: string[];
	}

	let { children, tabs }: Props = $props();
	let activeTab = $state(tabs[0]);

	function activateTab(tab: string) {
		activeTab = tab;

		const pres = blocksEl.querySelectorAll<HTMLElement>('.code-container');
		const tabIndex = tabs.indexOf(tab);

		pres.forEach((pre, index) => {
			if (index === tabIndex) {
				pre.style.display = 'block';
			} else {
				pre.style.display = 'none';
			}
		});
	}

	let blocksEl: HTMLDivElement;
</script>

<div class="tabbed">
	<div class="selectors">
		{#each tabs as tab}
			<Button
				size="x-small"
				color={activeTab === tab ? 'accent' : 'input'}
				onclick={() => activateTab(tab)}>{tab}</Button
			>
		{/each}
	</div>

	<div class="blocks" bind:this={blocksEl}>
		{@render children()}
	</div>
</div>

<style>
	.tabbed {
		margin: 1.5rem 0 1rem 0;
		position: relative;
	}

	.selectors {
		display: inline-flex;
		position: absolute;
		top: 0;
		left: 20px;
		z-index: 1;
		transform: translateY(-50%);
		gap: 3px;
	}

	.selectors > :global(button) {
		border: 1px solid var(--border);
	}

	.blocks > :global(.code-container:not(:first-child)) {
		display: none;
	}

	.blocks > :global(.code-container) {
		margin: 0;
	}
</style>
