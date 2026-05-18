<script lang="ts">
	interface Props {
		columns: string;
		hover?: boolean;
		style?: "default" | "bordered";
		children?: import('svelte').Snippet;
	}

	let { columns, hover = false, style = "default", children }: Props = $props();

	const hoverCss = hover ? '--local-hover-color: var(--hover);' : '';
</script>

<div class="table {style}" style="--local-columns: {columns};{hoverCss}" role="table">
	{@render children?.()}
</div>

<style>
	.table.bordered {
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--border);
	}
</style>