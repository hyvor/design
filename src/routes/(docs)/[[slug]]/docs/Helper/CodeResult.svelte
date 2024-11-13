<script lang="ts">
	const props: {
		gap?: number;
		white?: boolean;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<div
	class="results"
	class:gap={!!props.gap}
	class:white={props.white}
	style={props.gap ? `gap: ${props.gap}px` : ''}
	{...props}
>
	{@render props.children?.()}
</div>

<style>
	.results {
		padding: 20px 25px;
		background-color: #fbfbfb;
		border-radius: 20px;
		border: 1px solid #eee;
	}
	.results.white {
		background-color: #fff;
	}
	.results.gap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	:global(:root.dark) .results {
		background-color: #1e1e1e;
		border-color: #333;
	}
</style>
