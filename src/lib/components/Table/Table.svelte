<script lang="ts">
	interface Props {
		columns: string;
		hover?: boolean;
		children?: import('svelte').Snippet;
	}

	let { columns, hover = false, children }: Props = $props();

	const hoverCss = hover ? '--local-hover-color: var(--hover);' : '';
</script>

<div
	class="table"
	style="
    --local-columns: {columns};
    {hoverCss}
"
>
	{@render children?.()}
</div>
