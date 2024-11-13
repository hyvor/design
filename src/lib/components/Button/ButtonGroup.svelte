<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="button-group">
	{@render children?.()}
</div>

<style>
	.button-group {
		display: inline-flex;
		gap: 6px;
	}
</style>
