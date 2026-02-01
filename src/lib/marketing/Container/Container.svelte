<script lang="ts">
	interface Props {
		as?: string;
		children?: import('svelte').Snippet;
		max?: boolean;
	}

	let { as = 'div', children, max = false }: Props = $props();

	let width = max ? '1400px' : '1000px';
</script>

<svelte:element this={as} class="container" style:width>
	{@render children?.()}
</svelte:element>

<style>
	.container {
		/*width: 1000px;*/
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
	}
</style>
