<script lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import IconBug from '@hyvor/icons/IconBug';
	import IconInbox from '@hyvor/icons/IconInbox';
	import Button from '../Button/Button.svelte';

	interface Props {
		size?: 'small' | 'medium' | 'large';
		icon?: Component;
		iconSize?: number;
		padding?: number;
		empty?: boolean;
		error?: boolean;
		iconColor?: string;
		cta?:
			| {
					text: string;
					onClick: (e: MouseEvent) => void;
					props?: Record<string, any>;
			  }
			| Snippet;

		children?: Snippet;
		message?: Snippet | string;
	}

	let {
		size = 'medium',
		icon,
		iconSize,
		padding,
		empty = false,
		error = false,
		iconColor,
		cta,

		children,
		message,

		...rest
	}: Props = $props();

	const iconsSizes = {
		small: 35,
		medium: 50,
		large: 75
	};

	const paddings = {
		small: 15,
		medium: 40,
		large: 60
	};

	const config = $derived.by(() => {
		const ret = {
			padding: padding === undefined ? paddings[size] : padding,
			message,
			icon,
			iconSize: iconSize || iconsSizes[size],
			iconColor
		};

		if (!ret.message) {
			if (empty) ret.message = 'No results found';
			if (error) ret.message = 'Something went wrong';
		}

		if (!ret.icon) {
			if (empty) ret.icon = IconInbox;
			if (error) ret.icon = IconBug;
		}

		if (!ret.iconColor) {
			ret.iconColor = 'var(--gray-dark)';
		}

		return ret;
	});

	function onCtaClick(e: MouseEvent) {
		if (cta && typeof cta === 'object') {
			cta.onClick(e);
		}
	}
</script>

<div class="icon-message {size}" style:padding={config.padding + 'px'}>
	<div class="icon" style:color={config.iconColor} {...rest}>
		<config.icon size={config.iconSize + 'px'} />
	</div>

	<div class="message">
		{#if children}
			{@render children()}
		{:else if typeof config.message === 'string'}
			{config.message}
		{:else if config.message}
			{@render config.message()}
		{/if}
	</div>

	{#if cta}
		<div class="cta">
			{#if typeof cta === 'object'}
				<Button on:click={onCtaClick} {size} {...cta.props}>
					{cta.text}
				</Button>
			{:else}
				{@render cta()}
			{/if}
		</div>
	{/if}
</div>

<style>
	.icon-message {
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column; /* Change to column direction */
		text-align: center;
	}

	.icon {
		display: inline-flex;
		align-items: flex-end;
	}

	.message {
		color: var(--text-light);
		margin-top: 10px;
	}

	.icon-message.small .message {
		margin-top: 8px;
	}
	.icon-message.large .message {
		margin-top: 13px;
	}

	.cta {
		margin-top: 15px;
	}
</style>
