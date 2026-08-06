<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconCheckCircle from '@hyvor/icons/IconCheckCircle';
	import IconExclamationCircle from '@hyvor/icons/IconExclamationCircle';
	import IconXCircle from '@hyvor/icons/IconXCircle';
	import IconInfoCircle from '@hyvor/icons/IconInfoCircle';

	const defaultIcons = {
		soft: undefined,
		info: IconInfoCircle,
		success: IconCheckCircle,
		warning: IconExclamationCircle,
		danger: IconXCircle
	};

	const {
		type = 'soft',
		title = undefined,
		children = undefined,
		text = undefined,
		icon = undefined,
		showIcon = true,
		color = undefined,
		bg = undefined
	}: {
		type?: 'info' | 'success' | 'warning' | 'danger' | 'soft';
		title?: string | Snippet;
		icon?: Snippet;
		/** Whether to show an icon. Defaults to the icon matching `type`, unless a custom `icon` snippet is given. */
		showIcon?: boolean;
		text?: string | Snippet;
		children?: Snippet;
		/** Custom text color. Overrides `type`. If `bg` is not set, a matching background is derived from it. */
		color?: string;
		/** Custom background color. Overrides `type`. If `color` is not set, a matching text color is derived from it. */
		bg?: string;
	} = $props();

	const DefaultIcon = $derived(defaultIcons[type]);

	const style = $derived.by(() => {
		if (color === undefined && bg === undefined) {
			return undefined;
		}

		const finalColor = color ?? `color-mix(in srgb, ${bg} 55%, black)`;
		const finalBg = bg ?? `color-mix(in srgb, ${color} 15%, white)`;

		return `color: ${finalColor}; background-color: ${finalBg};`;
	});
</script>

{#snippet iconContent()}
	{#if icon}
		{@render icon()}
	{:else}
		<DefaultIcon />
	{/if}
{/snippet}

<div class={'callout ' + type} {style}>
	{#if typeof title === 'string'}
		<div class="title-wrap">
			{#if showIcon}
				<span class="title-icon">
					{@render iconContent()}
				</span>
			{/if}
			<div class="title">{title}</div>
		</div>
	{:else if title !== undefined}
		<div class="title-wrap">
			{#if showIcon}
				<span class="title-icon">{@render iconContent()}</span>
			{/if}

			<div class="title">{@render title?.()}</div>
		</div>
	{/if}

	<div class="text-wrap">
		{#if showIcon && !title}
			<span class="icon">{@render iconContent()}</span>
		{/if}

		<div class="text">
			{#if children}
				{@render children()}
			{/if}
			{#if typeof text === 'string'}
				{text}
			{:else}
				{@render text?.()}
			{/if}
		</div>
	</div>
</div>

<style>
	.callout {
		padding: 10px 18px;
		border-radius: var(--box-radius);
		line-height: var(--line-height-content);
	}

	.callout.soft {
		background-color: var(--gray-light);
		color: var(--gray-dark);
	}

	.callout.info {
		background-color: var(--blue-light);
		color: var(--blue-dark);
	}

	.callout.warning {
		background-color: var(--orange-light);
		color: var(--orange-dark);
	}

	.callout.danger {
		background-color: var(--red-light);
		color: var(--red-dark);
	}

	.callout.success {
		background-color: var(--green-light);
		color: var(--green-dark);
	}

	.title-wrap {
		display: flex;
		align-items: center;
		font-weight: 600;
	}

	.title-icon {
		vertical-align: middle;
		margin-right: 6px;
	}

	.text-wrap {
		display: flex;
		align-items: flex-start;
	}

	.icon {
		margin-right: 6px;
		font-size: 16px;
	}

	.text :global(p) {
		margin: 0.5em 0;
	}

	.text :global(p:first-child) {
		margin-top: 0;
	}

	.text :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
