<script lang="ts">
	import { createBubbler, handlers } from 'svelte/legacy';

	const bubble = createBubbler();
	import { getContext, createEventDispatcher } from 'svelte';
	import Selected from './Selected.svelte';

	const selection: 'none' | 'single' | 'multi' = getContext('action-list-selection');
	const selectionAlign: 'start' | 'end' = getContext('action-list-selection-align');

	interface Props {
		selected?: boolean;
		disabled?: boolean;
		type?: 'default' | 'danger';
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		description?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		selected = $bindable(false),
		disabled = false,
		type = 'default',
		start,
		children,
		description,
		end,
		...rest
	}: Props = $props();

	selected = selection !== 'none' && selected;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('select');
	}
</script>

<div
	class="action-list-item"
	class:disabled
	class:danger={type === 'danger'}
	onclick={handlers(handleClick, bubble('click'))}
	role="button"
	tabindex="0"
	onkeyup={(e) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	}}
	{...rest}
>
	{#if selectionAlign === 'start'}
		<Selected {selection} bind:selected />
	{/if}

	{#if start}
		<span class="start">
			{@render start?.()}
		</span>
	{/if}

	<span class="middle">
		{@render children?.()}

		{#if description}
			<div class="description">
				{@render description?.()}
			</div>
		{/if}
	</span>

	{#if end}
		<span class="end">
			{@render end?.()}
		</span>
	{/if}

	{#if selectionAlign === 'end'}
		<Selected {selection} bind:selected />
	{/if}
</div>

<style>
	div.action-list-item {
		padding: 6px 14px;
		display: flex;
		align-items: center;
		border-radius: var(--box-radius);
		cursor: pointer;
		position: relative;
		font-size: 14px;
	}
	div.action-list-item:hover {
		background-color: var(--hover);
	}
	div.action-list-item.danger {
		color: var(--red-dark);
	}
	div.action-list-item.danger:hover {
		background-color: var(--hover);
	}

	.start,
	.middle,
	.end {
		display: inline-flex;
		align-items: center;
	}
	.start {
		margin-right: 8px;
	}

	.middle {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.end {
		margin-left: 8px;
	}

	.description {
		font-size: 12px;
		color: var(--text-light);
	}

	/*styles for disabled state*/
	div.action-list-item.disabled {
		color: var(--text-light);
		cursor: not-allowed;
	}
	div.action-list-item.disabled:hover {
		background-color: transparent;
	}
</style>
