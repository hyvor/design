<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconCheckCircleFill from '@hyvor/icons/IconCheckCircleFill';
	import IconXCircleFill from '@hyvor/icons/IconXCircleFill';
	import IconDashCircleFill from '@hyvor/icons/IconDashCircleFill';

	interface Props {
		status: 'positive' | 'negative' | 'neutral';
		text?: string;
		iconSize?: number;
		fontSize?: string;
		color?: string;
		icon?: Snippet | false;
	}

	let {
		status,
		text = undefined,
		iconSize = 20,
		fontSize = undefined,
		color = undefined,
		icon = undefined
	}: Props = $props();

	let resolvedText = $derived(
		text ?? (status === 'positive' ? 'Yes' : status === 'negative' ? 'No' : '')
	);

	let resolvedColor = $derived(
		color ??
			(status === 'positive'
				? 'var(--green)'
				: status === 'negative'
					? 'var(--red)'
					: 'var(--text-light)')
	);
</script>

<span class="ternary-status" style:color={resolvedColor} style:font-size={fontSize}>
	{#if icon !== false}
		<span class="icon">
			{#if icon}
				{@render icon()}
			{:else if status === 'positive'}
				<IconCheckCircleFill size={iconSize} />
			{:else if status === 'negative'}
				<IconXCircleFill size={iconSize} />
			{:else}
				<IconDashCircleFill size={iconSize} />
			{/if}
		</span>
	{/if}
	{#if resolvedText}
		<span class="text">{resolvedText}</span>
	{/if}
</span>

<style>
	.ternary-status {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.icon {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
	}
</style>
