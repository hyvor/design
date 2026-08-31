<script lang="ts">
	import IconArrowRightCircle from '@hyvor/icons/IconArrowRightCircle';
	import Button from '$lib/components/Button/Button.svelte';
	import toast from '$lib/components/Toast/toast.js';
	import ExcalidrawComponent from './ExcalidrawComponent.svelte';
	import type { LoadedExcalidraw } from './excalidraw-loader.js';
	import { setSelectedFile } from '../file-uploader.js';

	let loaded: LoadedExcalidraw | undefined;
	let excalidrawAPI: any;

	function handleReady(loadedLib: LoadedExcalidraw, api: any) {
		loaded = loadedLib;
		excalidrawAPI = api;
	}

	async function handleFinish() {
		if (!loaded || !excalidrawAPI) {
			toast.error('Excalidraw is not ready yet');
			return;
		}

		const elements = excalidrawAPI.getSceneElements();
		if (!elements || !elements.length) {
			toast.error('Draw something first');
			return;
		}

		const svg = await loaded.ExcalidrawLib.exportToSvg({
			elements,
			appState: excalidrawAPI.getAppState(),
			files: excalidrawAPI.getFiles()
		});

		const data = new XMLSerializer().serializeToString(svg);
		const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });

		setSelectedFile({
			type: 'image',
			from: 'excalidraw',
			upload: {
				type: 'excalidraw',
				blob
			}
		});
	}
</script>

<div class="excalidraw-tab">
	<div class="canvas">
		<ExcalidrawComponent onReady={handleReady} />
	</div>
	<div class="footer">
		<Button size="large" onclick={handleFinish}>
			Finalize
			{#snippet end()}
				<IconArrowRightCircle />
			{/snippet}
		</Button>
	</div>
</div>

<style>
	.excalidraw-tab {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.canvas {
		flex: 1;
		min-height: 0;
	}
	.footer {
		padding-top: 15px;
		margin-bottom: 10px;
		text-align: center;
	}
</style>
