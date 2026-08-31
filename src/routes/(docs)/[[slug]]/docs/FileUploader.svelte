<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import {
		uploadFile,
		type MediaItem,
		type UnsplashImage
	} from '$lib/components/FileUploader/file-uploader.js';
	import DocsImage from '$lib/marketing/Docs/DocsImage.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	let imageUrl = $state('');
	let audioUrl = $state('');
	let advancedUrl = $state('');

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

	// mock media library, backed by a couple of placeholder images
	const mockMedia: MediaItem[] = [
		{ id: 1, name: 'mountains', url: 'https://loremflickr.com/400/300/mountain?lock=1' },
		{ id: 2, name: 'forest', url: 'https://loremflickr.com/400/300/forest?lock=2' },
		{ id: 3, name: 'ocean', url: 'https://loremflickr.com/400/300/ocean?lock=3' }
	];

	async function onAdvancedUpload() {
		const file = await uploadFile({
			type: 'image',
			uploader: async (blob, name) => {
				return {
					url: URL.createObjectURL(blob) // trick to simulate upload
				};
			},
			// called when the "Media Library" tab is opened / a page is requested
			mediaLoad: async (page) => {
				return page === 1 ? mockMedia : [];
			},
			// called when the user searches on the "Unsplash" tab
			unsplashSearch: async (search, page): Promise<UnsplashImage[]> => {
				if (page > 1) return [];
				// loremflickr supports single-word keywords only
				const keyword = search.trim().split(/\s+/)[0]?.replace(/\W/g, '') || 'random';
				return [
					{
						url: `https://loremflickr.com/400/300/${keyword}?lock=1`,
						author: 'LoremFlickr (mocked)',
						author_url: 'https://loremflickr.com',
						title: search,
						alt: search
					}
				];
			},
			// shows the "Excalidraw" tab, loaded on demand from the browser
			excalidraw: true
		});

		if (file) {
			advancedUrl = file.url;
		}
	}
</script>

<h1>File Uploader</h1>

<p>
	The <code>uploadFile</code> function can be used to open a file uploader dialog. It supports the following
	features:
</p>

<ul>
	<li>Upload from local device</li>
	<li>Paste images from clipboard</li>
	<li>Upload by URL</li>
	<li>Upload by drag and drop</li>
	<li>Media Library, Unsplash, and Excalidraw tabs, opted into via config and callbacks</li>
</ul>

<p>
	<code>uploadFile</code> never calls any API directly. All host-side data fetching — including Unsplash
	search and Media Library listing — is delegated to callbacks you provide in the config, so this component
	stays backend-agnostic.
</p>

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

<h2 id="media-unsplash-excalidraw">Media Library, Unsplash & Excalidraw</h2>

<p>
	These tabs are opt-in: each is shown only when the matching config option is provided.
	<code>mediaLoad</code> and <code>unsplashSearch</code> are callbacks the host app implements to
	fetch data from its own backend — this component never talks to an API directly.
	<code>excalidraw</code>
	is a boolean flag; when enabled, Excalidraw is loaded on demand directly in the browser (no dependency
	is installed for it), and the drawing is exported to an SVG blob that flows through the same
	<code>uploader</code> callback as any other upload.
</p>

<CodeBlock
	language="ts"
	code={`
import { uploadFile } from '@hyvor/design/components';

async function handleUpload() {
	const file = await uploadFile({
		type: 'image',
		uploader: async (blob, name) => {
			return { url: 'https://example.com/path/to/uploaded/image.jpg' };
		},

		// shows the "Media Library" tab; called to load a page of items
		mediaLoad: async (page, type) => {
			const items = await myApi.listMedia(page, type);
			return items; // return [] when there are no more
		},

		// shows the "Unsplash" tab (image type only); called on search
		unsplashSearch: async (search, page) => {
			// proxy the request through your own backend,
			// since Unsplash's API key must stay server-side
			return myApi.searchUnsplash(search, page);
		},

		// shows the "Excalidraw" tab (image type only)
		excalidraw: true
	});

	if (file) {
		console.log('Uploaded file URL:', file.url);
	}
}
`}
/>

<CodeResult>
	<Button onclick={onAdvancedUpload}>Upload Image (Media Library, Unsplash, Excalidraw)</Button>

	{#if advancedUrl}
		<DocsImage src={advancedUrl} alt="Uploaded" />
	{/if}
</CodeResult>
