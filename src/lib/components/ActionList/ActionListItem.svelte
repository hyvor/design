<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import { IconCheck } from '@hyvor/icons';
	import Selected from './Selected.svelte';

	const selection: 'none' | 'single' | 'multi' = getContext('action-list-selection');
	const selectionAlign: 'start' | 'end' = getContext('action-list-selection-align');

	export let selected = false;
	selected = selection !== 'none' && selected;
	export let disabled = false;
	export let type: 'default' | 'danger' = 'default';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('select');
	}
</script>

<div
	class="action-list-item"
	class:disabled
	class:danger={type === 'danger'}
	on:click={handleClick}
	role="button"
	tabindex="0"
	on:keyup={(e) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	}}
	{...$$restProps}
	on:click
>
	{#if selectionAlign === 'start'}
		<Selected {selection} bind:selected />
	{/if}

	{#if $$slots.start}
		<span class="start">
			<slot name="start" />
		</span>
	{/if}

	<span class="middle">
		<slot />

		{#if $$slots.description}
			<div class="description">
				<slot name="description" />
			</div>
		{/if}
	</span>

	{#if $$slots.end}
		<span class="end">
			<slot name="end" />
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
		background-color: #fffafa;
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
