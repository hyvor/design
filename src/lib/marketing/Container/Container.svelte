<script lang="ts">
	interface Props {
		as?: string;
		children?: import('svelte').Snippet;
	}

	let { as = 'div', children }: Props = $props();
</script>

<svelte:element this={as} class="container">
	{@render children?.()}
</svelte:element>

<style>
	.container {
		width: 1000px;
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
	}
</style>
