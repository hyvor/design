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

	// export let size: 'small' | 'medium' | 'large' = 'medium';

	// export let icon: ComponentType | null = null;
	// export let message: string | null = null;

	// export let iconSize: number | undefined = undefined;
	const iconsSizes = {
		small: 35,
		medium: 50,
		large: 75
	};
	iconSize = iconSize || iconsSizes[size];

	// export let padding: number | undefined = undefined;

	const paddings = {
		small: 15,
		medium: 40,
		large: 60
	};

	padding = padding === undefined ? paddings[size] : padding;

	//console.log(icon?.prototype);
	// $inspect(icon?.prototype, icon?);

	// export let empty: boolean = false;
	// export let error: boolean = false;

	// export let iconColor: string | null = null;

	if (empty) {
		message = message || 'No results found';
		icon = IconInbox;
	}

	if (error) {
		message = message || 'Something went wrong';
		icon = IconBug;
		iconColor = iconColor || 'var(--gray-dark)';
	}

	const Icon = icon;

	iconColor = iconColor || 'var(--gray-dark)';

	// export let cta: {
	// 	text: string;
	// 	onClick: (e: MouseEvent) => void;
	// 	props?: Record<string, any>;
	// } | null = null;

	function onCtaClick(e: MouseEvent) {
		if (cta && typeof cta === 'object') {
			cta.onClick(e);
		}
	}
</script>

<div class="icon-message {size}" style:padding={padding + 'px'}>
	<div class="icon" style:color={iconColor} {...rest}>
		<Icon size={iconSize + 'px'} />
	</div>

	<div class="message">
		{#if children}
			{@render children()}
		{:else if typeof message === 'string'}
			{message}
		{:else if message}
			{@render message()}
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
		/* Add message styles here */
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
