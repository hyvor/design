<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { uploadFile } from '$lib/components/FileUploader/file-uploader.js';
	import DocsImage from '$lib/marketing/Docs/Content/DocsImage.svelte';

	let url = $state('');

	async function onUpload() {
		const file = await uploadFile({
			type: 'image',
			uploader: async (blob, name) => {
				return {
					url: URL.createObjectURL(blob) // trick to simulate upload
				};
			}
		});

		if (file) {
			url = file.url;
		}
	}
</script>

<h1>File Uploader</h1>

<Button onclick={onUpload}>Upload Image</Button>

{#if url}
	<DocsImage src={url} alt="Uploaded" />
{/if}
