<script lang="ts">
	interface Props {
		small?: boolean;
		light?: boolean;
		normal?: boolean; // weight
		bold?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		small = false,
		light = false,
		normal = false,
		bold = false,
		children,
		...rest
	}: Props = $props();
</script>

<span class:light class:small class:normal class:bold {...rest}>
	{@render children?.()}
</span>

<style>
	span.light {
		color: var(--text-light);
	}
	span.small {
		font-size: 0.8em;
	}
	span.normal {
		font-weight: 400;
	}
	span.bold {
		font-weight: 600;
	}
</style>
