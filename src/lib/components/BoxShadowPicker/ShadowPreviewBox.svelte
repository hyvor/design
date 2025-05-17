<script lang="ts">
	let { boxShadow, size = 60 }: { boxShadow: string; size?: number } = $props();
</script>

<div class="wrap" style="width: {size}px; height: {size}px;">
	<div
		class="box"
		style="box-shadow: {boxShadow}; width: {(size * 3) / 5}px; height: {(size * 3) / 5}px;"
	></div>
</div>

<style>
	.wrap {
		background-color: var(--input);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		overflow: hidden;
	}
	.box {
		background-color: #fff;
		border-radius: 4px;
	}
</style>
