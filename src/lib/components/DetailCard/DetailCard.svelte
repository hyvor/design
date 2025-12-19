<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string | Snippet;
		content?: string;
		children?: Snippet;
	}

	let { label, content, children }: Props = $props();

	const labelId = `detail-card-${Math.random().toString(36).substring(2, 15)}`;
</script>

<div class="detail-card" role="region" aria-labelledby={labelId}>
	<div class="label" id={labelId}>
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label()}
		{/if}
	</div>

	<div class="content">
		{#if children}
			{@render children()}
		{:else if content}
			{content}
		{/if}
	</div>
</div>

<style>
	.detail-card {
		background: var(--hover);
		padding: 15px 20px;
		border-radius: var(--box-radius);
		border: 1px solid var(--border);
	}
	.label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		color: var(--text-light);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 6px;
	}
	.content {
		font-size: 14px;
		word-break: break-word;
	}
</style>
