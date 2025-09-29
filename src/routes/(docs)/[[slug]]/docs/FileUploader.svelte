<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { uploadFile } from '$lib/components/FileUploader/file-uploader.js';
	import DocsImage from '$lib/marketing/Docs/Content/DocsImage.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	let imageUrl = $state('');
	let audioUrl = $state('');

	async function onImageUpload() {
		const file = await uploadFile({
			type: 'image',
			uploader: async (blob, name) => {
				return {
					url: URL.createObjectURL(blob) // trick to simulate upload
				};
			}
		});

		if (file) {
			imageUrl = file.url;
		}
	}

	async function onAudioUpload() {
		const file = await uploadFile({
			type: 'audio',
			uploader: async (blob, name) => {
				return {
					url: URL.createObjectURL(blob) // trick to simulate upload
				};
			}
		});

		if (file) {
			audioUrl = file.url;
		}
	}
</script>

<h1>File Uploader</h1>

<p>
	The <code>uploadFile</code> function can be used to open a file uploader dialog. It supports the
	following features:
</p>

<ul>
	<li>Upload from local device</li>
	<li>Paste images from clipboard</li>
	<li>Upload by URL</li>
	<li>Upload by drag and drop</li>
</ul>

<h2 id="usage">Usage</h2>

<CodeBlock
	language="ts"
	code={`
import { uploadFile } from '@hyvor/design/components';

async function handleUpload() {
	const file = await uploadFile({
		type: 'image', // 'audio'
		uploader: async (blob, name) => {
			// upload the blob to your server
			// return an object with a .url property

			return {
				url: 'https://example.com/path/to/uploaded/image.jpg'
			};
		}
	});
	
	if (file) {
		console.log('Uploaded file URL:', file.url);
	} else {
		console.log('Upload cancelled');
	}
}
`}
/>

<CodeResult>
	<Button onclick={onImageUpload}>Upload Image</Button>

	{#if imageUrl}
		<DocsImage src={imageUrl} alt="Uploaded" />
	{/if}
</CodeResult>

<br />

<CodeResult>
	<Button onclick={onAudioUpload}>Upload Audio</Button>

	{#if audioUrl}
		<div style="margin-top:10px">
			<audio controls>
				<source src={audioUrl} />
			</audio>
		</div>
	{/if}
</CodeResult>
