<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import IconChevronRight from '@hyvor/icons/IconChevronRight';

	interface Props {
		/** Section heading, shown on the toggle row. */
		label: string;
		/** Optional content shown on the toggle row, just before the chevron. */
		trailing?: Snippet;
		/** The section content, revealed when expanded. */
		children: Snippet;
	}

	let { label, trailing, children }: Props = $props();

	let expanded = $state(false);
</script>

<div class="section">
	<button
		type="button"
		class="toggle"
		class:expanded
		aria-expanded={expanded}
		onclick={() => (expanded = !expanded)}
	>
		<span class="label">{label}</span>
		<span class="right">
			{#if trailing}
				<span class="trailing">{@render trailing()}</span>
			{/if}
			<span class="chevron"><IconChevronRight size={12} /></span>
		</span>
	</button>
	{#if expanded}
		<div class="items" transition:slide={{ duration: 150 }}>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.section {
		display: flex;
		flex-direction: column;
		gap: 2px;
		width: 100%;
	}

	.toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		background: none;
		border-radius: 12px;
		cursor: pointer;
		font: inherit;
		text-align: left;
		color: var(--text-light);
		transition: background-color 0.15s;
	}

	.toggle:hover {
		background: var(--hover, var(--accent-lightest));
	}

	.label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-light);
	}

	.right {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.trailing {
		display: inline-flex;
		align-items: center;
	}

	.chevron {
		display: inline-flex;
		color: var(--text-light);
		transition: transform 0.15s ease;
	}

	.toggle.expanded .chevron {
		transform: rotate(90deg);
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 2px;
		/* nudge sub-items in so they read as children of the section label */
		padding-left: 8px;
	}
</style>
