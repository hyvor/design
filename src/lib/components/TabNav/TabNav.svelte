<script lang="ts">
	import { setContext } from 'svelte';

	interface Props {
		basePath?: string;
		replaceState?: boolean;
		children?: import('svelte').Snippet;
	}

	let { children, basePath, replaceState = false }: Props = $props();

	const tabNavState = {
		basePath,
		replaceState
	};

	setContext('tab-nav-state', tabNavState);
</script>

<div class="tab-nav">
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
	}
</style>
