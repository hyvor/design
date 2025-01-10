<script lang="ts">
	import type { Snippet } from 'svelte';
	import Caption from '../FormControl/Caption.svelte';
	import Label from '../FormControl/Label.svelte';

	interface Props {
		label?: string | Snippet;
		caption?: string | Snippet;
		column?: boolean;
		flex?: number[];
		children?: Snippet;
		nested?: Snippet;
		[key: string]: any;
	}

	const {
		label,
		caption,
		column = false,
		flex = [1, 2],
		children,
		nested,
		...rest
	}: Props = $props();
</script>

<div
	class="split-control"
	class:has-nested={!!nested}
	class:column
	aria-label={typeof label === 'string' ? label : undefined}
	{...rest}
>
	<div class="left" style:flex={flex[0]}>
		<div class="label-wrap">
			{#if typeof label === 'string'}
				<Label>{label}</Label>
			{:else}
				{@render label?.()}
			{/if}
		</div>

		{#if caption}
			<div class="caption-wrap">
				{#if typeof caption === 'string'}
					<Caption>{caption}</Caption>
				{:else}
					{@render caption()}
				{/if}
			</div>
		{/if}
	</div>

	{#if children}
		<div class="right" style:flex={flex[1]}>
			{@render children()}
		</div>
	{/if}
</div>

{#if nested}
	<div class="nested">
		{@render nested()}
	</div>
{/if}

<style lang="scss">
	.split-control {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid var(--accent-lightest);
		line-height: 1.3;
		&:last-child,
		&.has-nested {
			border-bottom: none;
		}
		&.column {
			flex-direction: column;
			.right {
				padding-top: 0;
			}
		}
	}

	.nested {
		margin-left: 40px;
		padding-top: 0;
		padding-left: 15px;
		border-left: 2px solid var(--accent-light);
		margin-bottom: 15px;
	}

	.left {
		padding: 15px;
	}

	.right {
		padding: 15px;
		min-width: 0;
	}

	.caption-wrap {
		margin-top: 4px;
	}
</style>
