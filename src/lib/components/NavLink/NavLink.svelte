<script lang="ts">
	import { legacyHandlers } from '$lib/legacy.js';
	import { getContext } from 'svelte';
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	type Props = {
		href: string;
		active?: boolean;
		disabled?: boolean;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;

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

		[key: string]: any;
	};

	const isNavLinkGroup = !!getContext('navlink-group');

	let {
		href,
		active = false,
		disabled = false,
		start,
		children,
		end,
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

<a
	{href}
	{...rest}
	class="nav-link"
	class:active
	class:disabled
	class:group={isNavLinkGroup}
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
>
	{#if start}
		<span class="start">
			{@render start?.()}
		</span>
	{/if}

	<span class="middle">
		{@render children?.()}
	</span>

	{#if end}
		<span class="end">
			{@render end?.()}
		</span>
	{/if}
</a>

<style>
	a {
		display: flex;
		width: 100%;
		padding: 12px 29px;
		font-size: 14px;
		letter-spacing: 0.3px;
		border-left: 3px solid transparent;
		cursor: pointer;
		align-items: center;
	}

	a:hover:not(.group) {
		background-color: var(--hover);
	}

	a.active:not(.group) {
		background-color: var(--accent-lightest);
		border-left: 3px solid var(--accent);
	}

	:global(:root.dark) a.active:not(.group) {
		background-color: color-mix(in srgb, var(--accent-lightest), transparent 80%);
	}

	a.disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.5;
		/* hover */
		background-color: transparent;
	}

	.start,
	.middle,
	.end {
		display: inline-flex;
		align-items: center;
	}

	.middle {
		flex: 1;
		/* display: flex;  */
		flex-direction: column;
		align-items: flex-start;
	}

	.start {
		margin-right: 8px;
	}

	.end {
		margin-left: 8px;
	}
</style>
