<script lang="ts">
	import { legacyHandlers } from '$lib/legacy.js';
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	interface Props {
		as?: 'button' | 'a';
		size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
		color?: 'accent' | 'gray' | 'green' | 'red' | 'blue' | 'orange' | 'input';
		block?: boolean;
		variant?: 'fill' | 'fill-light' | 'outline' | 'invisible' | 'outline-fill';
		align?: 'start' | 'center';
		button?: any;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		action?: import('svelte').Snippet;
		[key: string]: any;

		onkeyup?: (event: KeyboardEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		onkeypress?: (event: KeyboardEvent) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onchange?: (event: Event) => void;
	}

	let {
		as = 'button',
		size = 'medium',
		color = 'accent',
		block = false,
		variant = 'fill',
		align = 'center',
		button = $bindable({} as HTMLButtonElement | HTMLAnchorElement),
		start,
		children,
		end,
		action,

		onkeyup,
		onkeydown,
		onkeypress,
		onfocus,
		onblur,
		onclick,
		onmouseover,
		onmouseenter,
		onmouseleave,
		onchange,

		...rest
	}: Props = $props();
</script>

<svelte:element
	this={as}
	class="button {size} {color} {variant} {align}"
	class:block
	onkeyup={legacyHandlers(onkeyup, bubble('keyup'))}
	onkeydown={legacyHandlers(onkeydown, bubble('keydown'))}
	onkeypress={legacyHandlers(onkeypress, bubble('keypress'))}
	onfocus={legacyHandlers(onfocus, bubble('focus'))}
	onblur={legacyHandlers(onblur, bubble('blur'))}
	onclick={legacyHandlers(onclick, bubble('click'))}
	onmouseover={legacyHandlers(onmouseover, bubble('mouseover'))}
	onmouseenter={legacyHandlers(onmouseenter, bubble('mouseenter'))}
	onmouseleave={legacyHandlers(onmouseleave, bubble('mouseleave'))}
	onchange={legacyHandlers(onchange, bubble('change'))}
	role="button"
	tabindex="0"
	bind:this={button}
	{...rest}
>
	<span class="button-content">
		{#if start}
			<span class="slot start">{@render start?.()}</span>
		{/if}

		{@render children?.()}

		{#if end}
			<span class="slot end">{@render end?.()}</span>
		{/if}
	</span>

	{#if action}
		<span class="action">
			{@render action?.()}
		</span>
	{/if}
</svelte:element>

<style>
	.slot {
		display: inline-flex;
		align-items: center;
		&.start {
			margin-right: 6px;
		}
		&.end {
			margin-left: 6px;
		}
		&:empty {
			margin: 0;
		}
	}

	.button {
		position: relative;
		display: inline-flex;
		align-items: center;
		font-weight: 600;
		font-size: 14px;
		border-radius: 20px;
		line-height: 1;
		cursor: pointer;
		transition: 0.2s box-shadow;

		--local-hover-shadow-size: 2.5px;
		&:active {
			--local-hover-shadow-size: 4px;
		}

		&.block {
			display: flex;
			width: 100%;
		}

		&:hover {
			box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--local-hover-shadow-color);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 calc(var(--local-hover-shadow-size) + 1px) var(--local-hover-shadow-color);
		}
	}

	.button-content {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
	.button.start .button-content {
		justify-content: flex-start;
	}

	.action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: 6px;
	}

	/* Sizes */
	.x-small {
		padding: 4px 8px;
		font-size: 12px;
		--local-hover-shadow-size: 1px;
		&:active {
			--local-hover-shadow-size: 2px;
		}
	}
	.small {
		padding: 6px 12px;
		--local-hover-shadow-size: 2px;
		&:active {
			--local-hover-shadow-size: 3px;
		}
		.slot.start {
			margin-right: 4px;
		}
		.slot.end {
			margin-left: 4px;
		}
	}
	.medium {
		padding: 8px 14px;
	}
	.large {
		padding: 11px 20px;
		--local-hover-shadow-size: 3px;
		&:active {
			--local-hover-shadow-size: 5px;
		}
	}
	.x-large {
		padding: 12px 26px;
		font-size: 16px;
	}

	/* Colors: --c (main), --c-light, --c-text (text on fill) */
	.button {
		--c: var(--accent);
		--c-light: var(--accent-light);
		--c-text: var(--text-white);
	}
	.accent {
		--c-text: var(--accent-text);
	}
	.gray {
		--c: var(--gray-dark);
		--c-light: var(--gray-light);
	}
	.green {
		--c: var(--green-dark);
		--c-light: var(--green-light);
	}
	.red {
		--c: var(--red-dark);
		--c-light: var(--red-light);
	}
	.blue {
		--c: var(--blue-dark);
		--c-light: var(--blue-light);
	}
	.orange {
		--c: var(--orange-dark);
		--c-light: var(--orange-light);
	}
	.input {
		--c: var(--text);
		--c-light: var(--input);
		--c-text: var(--text);
	}

	/* Variants */
	.fill {
		background-color: var(--c);
		color: var(--c-text);
		--local-hover-shadow-color: var(--c-light);
		&.input {
			background-color: var(--input);
			--local-hover-shadow-color: var(--input-hover);
		}
	}
	.fill-light,
	.outline-fill {
		background-color: var(--c-light);
		color: var(--c);
	}
	.fill-light {
		--local-hover-shadow-color: color-mix(in srgb, var(--c-light) 40%, transparent);
		&.accent {
			--local-hover-shadow-color: var(--accent-lightest);
		}
	}
	.outline,
	.outline-fill {
		border: 1px solid var(--c);
		color: var(--c);
		--local-hover-shadow-color: var(--c-light);
	}
	.outline {
		background-color: transparent;
	}
	.outline-fill.accent {
		--local-hover-shadow-color: color-mix(in srgb, var(--accent-light) 40%, transparent);
	}
	.invisible {
		background-color: transparent;
		color: var(--text);
		transition: 0.2s background-color;
		&:hover {
			background-color: var(--c-light);
			color: var(--c);
			box-shadow: none !important;
		}
		&.accent:hover {
			color: var(--text);
		}
	}

	/* Disabled */
	.button[disabled] {
		cursor: not-allowed;
		opacity: 0.2;
		box-shadow: none !important;
	}
	.invisible[disabled]:hover {
		background-color: transparent;
		color: var(--text);
	}
</style>
