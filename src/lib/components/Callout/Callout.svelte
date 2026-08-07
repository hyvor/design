<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import IconCheckCircle from '@hyvor/icons/IconCheckCircle';
	import IconExclamationCircle from '@hyvor/icons/IconExclamationCircle';
	import IconExclamationTriangle from '@hyvor/icons/IconExclamationTriangle';
	import IconInfoCircle from '@hyvor/icons/IconInfoCircle';

	const defaultIcons = {
		soft: undefined,
		info: IconInfoCircle,
		success: IconCheckCircle,
		warning: IconExclamationCircle,
		danger: IconExclamationTriangle
	};

	const {
		type = 'soft',
		title = undefined,
		children = undefined,
		text = undefined,
		icon = undefined,
		showIcon = true,
		fg = undefined,
		bg = undefined,
		wrapperProps = {}
	}: {
		type?: 'info' | 'success' | 'warning' | 'danger' | 'soft';
		title?: string | Snippet;
		icon?: Snippet;
		/** Whether to show an icon. Defaults to the icon matching `type`, unless a custom `icon` snippet is given. */
		showIcon?: boolean;
		text?: string | Snippet;
		children?: Snippet;
		/** Custom text color. Overrides `type`. If `bg` is not set, a matching background is derived from it. */
		fg?: string;
		/** Custom background color. Overrides `type`. If `fg` is not set, a matching text color is derived from it. */
		bg?: string;
		/** Additional props (e.g. class, id, attributes) to apply to the wrapper element. */
		wrapperProps?: HTMLAttributes<HTMLDivElement>;
	} = $props();

	const DefaultIcon = $derived(defaultIcons[type]);

	const style = $derived.by(() => {
		if (fg === undefined && bg === undefined) {
			return undefined;
		}

		const finalFg = fg ?? `color-mix(in srgb, ${bg} 55%, black)`;
		const finalBg = bg ?? `color-mix(in srgb, ${fg} 15%, white)`;

		return `color: ${finalFg}; background-color: ${finalBg};`;
	});
</script>

{#snippet iconContent()}
	{#if icon}
		{@render icon()}
	{:else}
		<DefaultIcon />
	{/if}
{/snippet}

<div class={'callout ' + type} {style} {...wrapperProps}>
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
		padding: 10px 20px;
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
		margin-right: 6px;
		display: inline-flex;
		height: var(--line-height-content);
		align-items: center;
	}

	.text-wrap {
		display: flex;
		align-items: flex-start;
	}

	.icon {
		margin-right: 6px;
		font-size: 16px;
		display: inline-flex;
		height: var(--line-height-content);
		align-items: center;
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
