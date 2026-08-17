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
		description?: Snippet;
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
		description,
		onclick,
		...rest
	}: Props = $props();
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
	class:rich={!!description}
	{...rest}
>
	{#if description}
		{#if start}
			<span class="icon-box">{@render start()}</span>
		{/if}
		<span class="text-stack">
			<span class="title">{@render children?.()}</span>
			<span class="desc">{@render description()}</span>
		</span>
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

	.start,
	.end {
		display: inline-flex;
		align-items: center;
	}

	/* icon + title + description layout, see `description` above */
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
