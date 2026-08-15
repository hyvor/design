<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		active?: boolean;
		menu?: boolean;
		target?: string;
		rel?: string;
		start?: Snippet;
		children?: Snippet;
		end?: Snippet;
		onclick?: (event: MouseEvent) => void;
		[key: string]: unknown;
	}

	let {
		href,
		active = false,
		menu = false,
		target,
		rel,
		start,
		children,
		end,
		onclick,
		...rest
	}: Props = $props();
</script>

<!--
	Renders as an <a> when `href` is given. Otherwise, it renders as a <span>
	so it can be used as a Dropdown trigger (e.g. a "Resources" menu with a
	caret icon in `end`).
-->
<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	{target}
	{rel}
	{onclick}
	role={href ? undefined : 'button'}
	tabindex={href ? undefined : 0}
	class="header-nav-link"
	class:active
	class:menu
	{...rest}
>
	{#if start}
		<span class="start">{@render start()}</span>
	{/if}
	{@render children?.()}
	{#if end}
		<span class="end">{@render end()}</span>
	{/if}
</svelte:element>

<style>
	.header-nav-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 16px;
		border-radius: 20px;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-light);
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
		transition:
			0.15s background-color,
			0.15s color;
	}

	.header-nav-link:hover {
		background: var(--hover, var(--accent-lightest));
		color: var(--text);
	}

	.header-nav-link.active {
		background: var(--accent-light);
		color: var(--text);
	}

	/*
		Compact style for links placed inside a Dropdown's menu content
		(e.g. a "Resources" submenu, or Header's own mobile menu). The
		outer box radius is --box-radius (20px), and Dropdown content is
		usually given an 8px padding — 20 - 8 = 12 keeps the gap between
		the box edge and this pill visually even all the way around,
		including through the corners, instead of pinching at the diagonal.
	*/
	.header-nav-link.menu {
		width: 100%;
		padding: 8px 10px;
		border-radius: 12px;
	}

	.start,
	.end {
		display: inline-flex;
		align-items: center;
	}
</style>
