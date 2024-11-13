<script lang="ts">
	interface Props {
		color?: string;
		height?: number;
		width?: number;
		margin?: number;
		align?: 'start' | 'center' | 'end';
	}

	let {
		color = 'var(--accent-lightest)',
		height = 1,
		width = 100,
		margin = 0,
		align = 'center'
	}: Props = $props();
</script>

<div
	class="line"
	style="
    background-color: {color};
        height: {height}px;
        width: {width}%;
        margin-top: {margin}px;
        margin-bottom: {margin}px;
        margin-left: {align === 'center' || align === 'end' ? 'auto' : 0};
        margin-right: {align === 'center' ? 'auto' : 0};
        display: flex;
    "
></div>

<style>
	.line {
		display: block;
	}
</style>
