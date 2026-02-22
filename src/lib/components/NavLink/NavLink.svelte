<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	type Props = {
		href: string;
		active?: boolean;
		disabled?: boolean;
		start?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any;
	};

	let { href, active = false, disabled = false, start, children, end, ...rest }: Props = $props();
</script>

<a
	{href}
	{...rest}
	class:active
	class:disabled
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
		padding: 12px 29px;
		font-size: 14px;
		letter-spacing: 0.3px;
		border-left: 3px solid transparent;
		cursor: pointer;
		align-items: center;
	}

	a:hover {
		background-color: var(--hover);
	}

	a.active {
		background-color: var(--accent-lightest);
		border-left: 3px solid var(--accent);
	}

	:global(:root.dark) a.active {
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
