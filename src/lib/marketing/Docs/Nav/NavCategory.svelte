<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		name: string;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let { name, start, end, children }: Props = $props();
</script>

<div class="nav-category">
	<div class="name">
		<span class="button-content">
			{#if start}
				<span class="slot start">{@render start?.()}</span>
			{/if}

			{#if end}
				<span class="slot end">{@render end?.()}</span>
			{/if}
		</span>
		{name}
	</div>
	<div class="nav-items">
		{@render children?.()}
	</div>
</div>

<style>
	.nav-category {
		margin-bottom: 20px;
	}

	.name {
		font-weight: 600;
		padding: 10px 25px;
		display: flex;
		align-items: center;
	}

	.slot.start {
		margin-right: 5px;
		margin-left: 0;
		display: flex;
	}
</style>
