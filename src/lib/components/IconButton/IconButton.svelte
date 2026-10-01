<script lang="ts">
	import { createBubbler } from 'svelte/legacy';
	import type { IconButtonSize, IconButtonColor, IconButtonVariant } from './iconButton.types.js';
	import { legacyHandlers } from '$lib/legacy.js';

	const bubble = createBubbler();

	interface Props {
		size?: IconButtonSize;
		color?: IconButtonColor;
		variant?: IconButtonVariant;
		as?: 'button' | 'a';
		children?: import('svelte').Snippet;
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
		size = $bindable('medium'),
		color = 'accent',
		variant = 'fill',
		as = 'button',
		children,

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

	const sizes = {
		small: 26,
		medium: 30,
		large: 36
	};

	size = (typeof size === 'number' ? size : sizes[size]) + 'px';
</script>

<svelte:element
	this={as}
	class="button {color} {variant}"
	style:width={size}
	style:height={size}
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
	{...rest}
>
	{@render children?.()}
</svelte:element>

<style>
	.button {
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: 0.2s box-shadow;
		font-size: 1em;

		--local-hover-shadow-size: 2.5px;
		&:active {
			--local-hover-shadow-size: 4px;
		}

		&:hover {
			box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--local-hover-shadow-color);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 calc(var(--local-hover-shadow-size) + 1px) var(--local-hover-shadow-color);
		}
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
			--local-hover-shadow-color: var(--gray-light);
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
			--local-hover-shadow-color: var(--accent-light);
		}
	}
	.outline,
	.outline-fill {
		border: 1px solid var(--c);
		color: var(--c);
		--local-hover-shadow-color: var(--c-light);
	}
	.outline-fill.accent {
		--local-hover-shadow-color: color-mix(in srgb, var(--accent-light) 40%, transparent);
	}
	.invisible {
		background-color: transparent;
		transition: 0.2s background-color;
		box-shadow: none !important;
		&:hover {
			background-color: var(--c-light);
			color: var(--c);
		}
		&.accent:hover {
			color: var(--text-light);
		}
	}

	.button[disabled] {
		cursor: not-allowed;
		opacity: 0.2;
		box-shadow: none !important;
	}
</style>
