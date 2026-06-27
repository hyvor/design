<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children, ...rest }: Props = $props();
</script>

<a
	{href}
	{...rest}
	class:active={href === $page.url.pathname}
	aria-current={href === $page.url.pathname ? 'page' : undefined}
>
	{@render children?.()}
</a>

<style>
	a {
		display: block;
		padding: 4px 25px;
		color: var(--text-light);
		font-size: 14px;
		letter-spacing: 0.3px;
		border-left: 3px solid transparent;
	}

	a:hover {
		background-color: var(--hover);
	}

	a.active {
		background-color: var(--accent-lightest);
		border-left: 3px solid var(--accent);
	}
</style>
