<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		href: string;
		color?: 'link' | 'accent' | 'text';
		underline?: boolean;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		href,
		color = 'link',
		underline = true,
		start,
		children,
		end,
		...rest
	}: Props = $props();
</script>

<a
	{href}
	class="color-{color}"
	class:underline
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
	{...rest}
>
	{#if start}
		<span class="slot start-slot">{@render start?.()}</span>
	{/if}

	{@render children?.()}

	{#if end}
		<span class="slot end-slot">{@render end?.()}</span>
	{/if}
</a>

<style>
	a {
		display: inline-flex;
		align-items: center;
		color: var(--local-color);
	}
	a.color-link {
		--local-color: var(--link);
	}
	a.color-accent {
		--local-color: var(--accent);
	}
	a.color-text {
		--local-color: var(--text);
	}
	a.underline {
		text-decoration: underline;
		text-decoration-color: var(--local-color);
	}
	a:not(.underline):hover {
		text-decoration: underline;
	}

	.slot {
		display: inline-flex;
		align-items: center;
	}

	.start-slot {
		margin-right: 4px;
	}
	.end-slot {
		margin-left: 4px;
	}
</style>
