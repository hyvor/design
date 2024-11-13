<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();



	interface Props {
		as?: 'button' | 'a' | 'span';
		size?: 'x-small' | 'small' | 'medium' | 'large';
		color?: 
		| 'default' // default tag (categories)
		| 'accent'
		| 'green'
		| 'red'
		| 'blue'
		| 'orange';
		interactive?: boolean;
		outline?: boolean;
		fill?: boolean;
		bg?: string | undefined;
		fg?: string | undefined;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		as = 'span',
		size = 'medium',
		color = 'default',
		interactive = false,
		outline = false,
		fill = false,
		bg = undefined,
		fg = undefined,
		start,
		end,
		children,
		...rest
	}: Props = $props();

	let styleClass = $state('default');
	if (outline) {
		styleClass = fill ? 'outline-fill' : 'outline';
	}

	let tabindex = interactive ? 0 : undefined;
</script>

<svelte:element
	this={as}
	role={interactive ? 'button' : undefined}
	{tabindex}
	class="button color-{color} style-{styleClass} size-{size}"
	class:interactive
	class:has-start={start}
	class:has-end={end}
	{...rest}
	onkeyup={bubble('keyup')}
	onkeydown={bubble('keydown')}
	onkeypress={bubble('keypress')}
	onfocus={bubble('focus')}
	onblur={bubble('blur')}
	onclick={bubble('click')}
	onmouseover={bubble('mouseover')}
	onmouseenter={bubble('mouseenter')}
	onmouseleave={bubble('mouseleave')}
	onchange={bubble('change')}
	style:background-color={bg}
	style:color={fg}
>
	{#if start}
		{@render start?.()}
	{/if}

	{@render children?.()}

	{#if end}
		{@render end?.()}
	{/if}
</svelte:element>

<style lang="scss">
	span {
		vertical-align: middle;
		border-radius: 20px;
		display: inline-flex;
		align-items: center;
	}

	span.has-start :global(> *:first-child) {
		margin-right: 5px;
	}

	span.has-end :global(> *:last-child) {
		margin-left: 5px;
	}

	span.size-x-small {
		font-size: 10px;
		padding: 2px 7px;
	}

	span.size-small {
		font-size: 12px;
		padding: 2px 9px;
	}

	span.size-medium {
		font-size: 14px;
		padding: 3px 12px;
	}

	span.size-large {
		font-size: 16px;
		padding: 4px 16px;
	}

	span.interactive {
		cursor: pointer;
		transition: opacity 0.1s;
	}
	span.interactive:hover {
		opacity: 0.7;
	}

	span.style-default {
		&.color-default {
			background-color: var(--gray-light);
			color: var(--gray-dark);
		}

		&.color-accent {
			background-color: var(--accent-light);
			color: var(--accent);
		}

		&.color-green {
			background-color: var(--green-light);
			color: var(--green-dark);
		}

		&.color-red {
			background-color: var(--red-light);
			color: var(--red-dark);
		}

		&.color-blue {
			background-color: var(--blue-light);
			color: var(--blue-dark);
		}

		&.color-orange {
			background-color: var(--orange-light);
			color: var(--orange-dark);
		}
	}

	span.style-outline {
		&.color-default {
			color: var(--gray-dark);
			border: 1px solid var(--gray-dark);
		}

		&.color-accent {
			color: var(--accent);
			border: 1px solid var(--accent);
		}

		&.color-green {
			color: var(--green-dark);
			border: 1px solid var(--green-dark);
		}

		&.color-red {
			color: var(--red-dark);
			border: 1px solid var(--red-dark);
		}

		&.color-blue {
			color: var(--blue-dark);
			border: 1px solid var(--blue-dark);
		}

		&.color-orange {
			color: var(--orange-dark);
			border: 1px solid var(--orange-dark);
		}
	}

	span.style-outline-fill {
		&.color-default {
			background-color: var(--gray-light);
			color: var(--gray-dark);
			border: 1px solid var(--gray);
		}

		&.color-accent {
			background-color: var(--accent-light);
			color: var(--accent);
			border: 1px solid var(--accent);
		}

		&.color-green {
			background-color: var(--green-light);
			color: var(--green-dark);
			border: 1px solid var(--green-dark);
		}

		&.color-red {
			background-color: var(--red-light);
			color: var(--red-dark);
			border: 1px solid var(--red-dark);
		}

		&.color-blue {
			background-color: var(--blue-light);
			color: var(--blue-dark);
			border: 1px solid var(--blue-dark);
		}

		&.color-orange {
			background-color: var(--orange-light);
			color: var(--orange-dark);
			border: 1px solid var(--orange-dark);
		}
	}

	.button[disabled] {
		opacity: 0.5 !important;
		cursor: not-allowed;
		box-shadow: none !important;
	}
</style>
