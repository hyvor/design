<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	interface Props {
		head?: boolean;
		section?: boolean;
		children: Snippet;
	}

	const { head = false, section = false, children, ...rest }: Props = $props();

	setContext('table-row', { head, section });
</script>

<div class:head class:section {...rest} role="row">
	{@render children()}
</div>

<style>
	div {
		display: grid;
		padding: 8px 18px;
		border-radius: 20px;
		align-items: flex-start;
		grid-template-columns: var(--local-columns);
	}
	div.head {
		font-weight: 600;
		background: var(--accent-lightest);
		margin-bottom: 5px;
	}

	:global(.table.bordered) div {
		border-radius: 0;
		padding: 13px 20px;
		border-top: 1px solid var(--border);
	}

	:global(.table.bordered) div.head {
		background: var(--box-background);
		font-weight: 600;
		font-size: 13px;
		padding: 12px 20px;
		margin-bottom: 0;
		border-top: 0;
	}

	div:hover:not(.head, .section) {
		background-color: var(--local-hover-color);
	}
	div > :global(*) {
		padding-right: 5px;
		word-wrap: break-word;
	}

	div.section {
		background: var(--box-background);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-light);
		padding: 8px 20px;
	}
</style>
