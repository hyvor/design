<script lang="ts">
	import ConfirmModalProvider from './../Modal/ConfirmModalProvider.svelte';
	// import InternationalizationProvider from './../Internationalization/InternationalizationProvider.svelte';
	import DarkProvider from './../Dark/DarkProvider.svelte';
	import '../../index.js';
	import ToastProvider from '../Toast/ToastProvider.svelte';
	import FileUploaderProvider from '../FileUploader/FileUploaderProvider.svelte';

	interface Props {
		dark?: boolean;
		children?: import('svelte').Snippet;
	}

	let { dark = false, children }: Props = $props();
</script>

<div id="base">
	{@render children?.()}
</div>

{#if dark}
	<DarkProvider />
{/if}

<ToastProvider />
<ConfirmModalProvider />
<FileUploaderProvider />
