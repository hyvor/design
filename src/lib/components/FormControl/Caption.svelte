<script lang="ts">
	interface Props {
		bold?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { bold = false, children, ...rest }: Props = $props();
</script>

<div class="caption" class:bold {...rest}>
	{@render children?.()}
</div>

<style>
	.caption {
		font-size: 14px;
		color: var(--text-light);
	}
	.caption.bold {
		font-weight: 600;
	}
</style>
