<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getHeaderNavMenuContext } from './navMenuContext.js';

	interface ComponentProps {
		href?: string;
		active?: boolean;
		menu?: boolean;
		target?: string;
		rel?: string;
		start?: Snippet;
		children?: Snippet;
		end?: Snippet;
		description?: Snippet;
		onclick?: (event: MouseEvent) => void;
	}

	type Props = ComponentProps & Omit<HTMLAttributes<HTMLElement>, keyof ComponentProps>;

	let {
		href,
		active = false,
		menu = false,
		target,
		rel,
		start,
		children,
		end,
		description,
		onclick,
		...rest
	}: Props = $props();

	// When placed inside a <HeaderNavMenu> that has collapsed into the mobile
	// hamburger menu, render as a flat sub-nav item: no icon, no rich card layout.
	const navMenu = getHeaderNavMenuContext();
	const flat = $derived(navMenu?.inlineMobile ?? false);
</script>

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
	class:menu={menu || !!description}
	class:rich={!!description && !flat}
	class:flat
	{...rest}
>
	{#if description && !flat}
		{#if start}
			<span class="icon-box">{@render start()}</span>
		{/if}
		<span class="text-stack">
			<span class="title">{@render children?.()}</span>
			<span class="desc">{@render description()}</span>
		</span>
	{:else if flat}
		<span class="title">{@render children?.()}</span>
		{#if description}
			<span class="desc">{@render description()}</span>
		{/if}
	{:else}
		{#if start}
			<span class="start">{@render start()}</span>
		{/if}
		{@render children?.()}
		{#if end}
			<span class="end">{@render end()}</span>
		{/if}
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

	.header-nav-link.menu {
		width: 100%;
		padding: 8px 10px;
		border-radius: 12px;
	}

	/* flat sub-nav item inside a collapsed mobile HeaderNavMenu */
	.header-nav-link.flat {
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		white-space: normal;
	}

	.header-nav-link.flat .title {
		font-weight: 500;
		color: inherit;
	}

	.header-nav-link.flat .desc {
		font-size: 12px;
		font-weight: 400;
		color: var(--text-light);
	}

	.start,
	.end {
		display: inline-flex;
		align-items: center;
	}

	.header-nav-link.rich {
		align-items: flex-start;
		gap: 10px;
		white-space: normal;
	}

	.icon-box {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: var(--accent-light);
		color: var(--accent);
	}

	.header-nav-link.rich.active .icon-box {
		background: var(--background);
	}

	.text-stack {
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding-top: 1px;
	}

	.title {
		font-size: 13px;
		font-weight: 600;
		color: var(--text);
	}

	.desc {
		font-size: 12px;
		font-weight: 400;
		color: var(--text-light);
	}
</style>
