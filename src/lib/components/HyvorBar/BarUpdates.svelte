<script lang="ts">
	import { IconButton, Dropdown } from '../index.js';
	import { IconMegaphone } from '@hyvor/icons';
	import BarUpdatesList from './BarUpdatesList.svelte';
	import { type BarProduct, barUnreadUpdates } from './bar.js';

	interface Props {
		instance: string;
		product: BarProduct;
	}

	let { instance, product }: Props = $props();
</script>

<div class="updates">
	<Dropdown align="end" width={525}>
		{#snippet trigger()}
			<IconButton color="input" variant="invisible">
				<IconMegaphone size={14} />

				{#if $barUnreadUpdates > 0}
					<span class="unread">{$barUnreadUpdates}</span>
				{/if}
			</IconButton>
		{/snippet}

		{#snippet content()}
			<div class="content-inner">
				<BarUpdatesList {instance} {product} />
			</div>
		{/snippet}
	</Dropdown>
</div>

<style>
	.updates {
		height: 100%;
	}
	.content-inner {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.updates :global(.dropdown .content) {
		padding: 0;
		height: 100%;
	}
	.unread {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 8px;
		width: 15px;
		height: 15px;
		display: inline-flex;
		border-radius: 50%;
		margin-right: -5px;
		margin-top: -3px;
		background: var(--accent);
		align-items: center;
		justify-content: center;
		color: var(--accent-text);
		font-weight: 600;
	}
	.updates :global(.trigger) {
		position: relative;
	}
</style>
