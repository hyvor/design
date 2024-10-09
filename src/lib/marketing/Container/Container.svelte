<script lang="ts">
	export let as: string = 'div';
</script>

<svelte:element this={as} class="container">
	<slot />
</svelte:element>

<style>
	.container {
		width: 1000px;
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
	}
</style>
