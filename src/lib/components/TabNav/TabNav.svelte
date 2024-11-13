<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		active: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { active = $bindable(), children, ...rest }: Props = $props();

	const activeStore = writable(active);
	setContext('tab-nav-active', activeStore);

	$effect(() => {
		activeStore.set(active)
	})

	onMount(() => {
		const unsubscribe = activeStore.subscribe((value) => {
			active = value;
		});
		return unsubscribe;
	});
</script>

<div class="tab-nav" {...rest}>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
	}
</style>
