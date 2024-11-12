<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<div class="form-control" {...rest}>
	{@render children?.()}
</div>

<style>
	.form-control {
		display: flex;
		flex-direction: column;
	}

	.form-control :global(.caption) {
		margin-bottom: 8px;
	}

	.form-control > :global(label) {
		margin-bottom: 8px;
		font-weight: 600;
	}

	.form-control :global(label + .caption) {
		margin-top: -8px;
	}

	.form-control :global(.validation) {
		margin-top: 8px;
	}
</style>
