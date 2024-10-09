<script lang="ts">
	export let as: string = 'div';
</script>

<svelte:element
	this={as}
	style:box-shadow="var(--box-shadow)"
	style:border-radius="var(--box-radius)"
	style:background-color="var(--box-background)"
	{...$$restProps}
>
	<slot />
</svelte:element>
