<script lang="ts">
	interface Props {
		size?: number | 'small' | 'medium' | 'large';
		children?: import('svelte').Snippet;
	}

	let { size = $bindable('medium'), children }: Props = $props();
	const sizes = {
		small: 24,
		medium: 32,
		large: 48
	};
	size = typeof size === 'number' ? size : sizes[size];
</script>

<div class="stack" style:--local-size={size + 'px'}>
	{@render children?.()}
</div>

<style>
	.stack {
		display: inline-flex;
		cursor: pointer;
	}
	.stack :global(img) {
		transition: 0.2s;
	}
	.stack :global(img:not(:first-child)) {
		margin-left: calc(var(--local-size) * -0.5);
	}
	.stack:hover :global(img:not(:first-child)) {
		margin-left: 3px;
	}
</style>
