<script lang="ts">
	interface Props {
		color: string;
	}

	let { color }: Props = $props();
</script>

<span class="color-dot" style:background-color={color}></span>

<style>
	.color-dot {
		display: inline-flex;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		margin-right: 6px;
		cursor: pointer;
		border: 1px solid #000;
	}
</style>
