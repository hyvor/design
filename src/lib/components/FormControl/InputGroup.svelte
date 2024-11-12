<script lang="ts">
	interface Props {
		gap?: number | 'small' | 'medium' | 'large';
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { gap = $bindable('medium'), children, ...rest }: Props = $props();

	const gaps = {
		small: 4,
		medium: 8,
		large: 16
	};
	gap = typeof gap === 'number' ? gap : gaps[gap];
</script>

<div class="checkbox-group" style:gap={gap + 'px'} {...rest}>
	{@render children?.()}
</div>

<style>
	.checkbox-group {
		display: flex;
		flex-direction: column;
	}
</style>
