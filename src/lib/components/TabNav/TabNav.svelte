<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { type TabNavState } from './tabnav.js';

	interface Props {
		active?: string;
		basePath?: string;
		replaceState?: boolean;
		children?: import('svelte').Snippet;
	}

	let { active = $bindable(), children, basePath, replaceState = false }: Props = $props();

	const tabNavState = writable<TabNavState>({
		activeTab: active || '',
		basePath,
		replaceState
	});

	setContext('tab-nav-state', tabNavState);

	$effect(() => {
		tabNavState.update((state) => ({ ...state, activeTab: active }));
	});

	onMount(() => {
		const unsubscribe = tabNavState.subscribe((value) => {
			active = value.activeTab;
		});
		return unsubscribe;
	});
</script>

<div class="tab-nav">
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
	}
</style>
