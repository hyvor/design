<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<label {...rest}>
	{@render children?.()}
</label>

<style>
	label {
		font-weight: 600;
	}
</style>
