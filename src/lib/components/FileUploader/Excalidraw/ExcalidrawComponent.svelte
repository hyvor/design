<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { loadExcalidraw, type LoadedExcalidraw } from './excalidraw-loader.js';

	interface Props {
		onReady: (loaded: LoadedExcalidraw, api: any) => void;
	}

	let { onReady }: Props = $props();

	let mountEl: HTMLDivElement | undefined = $state();
	let ready = $state(false);
	let error = $state('');

	let root: ReturnType<LoadedExcalidraw['createRoot']> | undefined;

	onMount(async () => {
		try {
			const loaded = await loadExcalidraw();
			if (!mountEl) return;

			root = loaded.createRoot(mountEl);
			root.render(
				loaded.React.createElement(loaded.ExcalidrawLib.Excalidraw, {
					excalidrawAPI: (api: any) => onReady(loaded, api)
				})
			);
			ready = true;
		} catch (e: any) {
			error = e?.message || 'Failed to load Excalidraw';
		}
	});

	onDestroy(() => {
		root?.unmount();
	});
</script>

<div class="excalidraw-wrap">
	{#if !ready}
		<div class="loading">
			{#if error}
				{error}
			{:else}
				<Loader full />
			{/if}
		</div>
	{/if}
	<div class="mount" bind:this={mountEl}></div>
</div>

<style>
	.excalidraw-wrap {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mount {
		height: 100%;
		width: 100%;
	}
</style>
