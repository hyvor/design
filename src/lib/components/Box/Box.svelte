<script lang="ts">
	interface Props {
		as?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { as = 'div', children, ...rest }: Props = $props();
</script>

<svelte:element
	this={as}
	style:box-shadow="var(--box-shadow)"
	style:border-radius="var(--box-radius)"
	style:background-color="var(--box-background)"
	{...rest}
>
	{@render children?.()}
</svelte:element>
