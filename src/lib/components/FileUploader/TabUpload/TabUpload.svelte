<script lang="ts">
	import IconArrowReturnLeft from '@hyvor/icons/IconArrowReturnLeft';
	import { onMount } from 'svelte';
	import {
		getFileUploaderConfig,
		getMimeNamesJoined,
		setSelectedFile,
		validateMimeType,
		type UploadType
	} from '../file-uploader.js';
	import { byteFormatter, isValidUrl } from '../helpers.js';
	import toast from '$lib/components/Toast/toast.js';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import Button from '$lib/components/Button/Button.svelte';

	let isUploading = $state(false);

	const config = getFileUploaderConfig();

	let inputEl: HTMLInputElement;
	let byUrlInputEl: HTMLInputElement | undefined = $state();

	let byUrl = $state('');
	let isDragging = $state(false);

	function getCtrl() {
		const platform =
			(navigator as any)?.userAgentData?.platform || navigator?.platform || 'unknown';
		return platform.match(/mac/i) ? '⌘' : 'Ctrl';
	}

	function getSelectedType(blob: Blob | null = null): UploadType {
		if (config.type === 'any' && blob) {
			if (blob.type.indexOf('image') === 0) return 'image';
			if (blob.type.indexOf('audio') === 0) return 'audio';
		}
		return config.type;
	}

	function handleFetch() {
		isUploading = true;

		fetch(byUrl)
			.then((res) => res.blob())
			.then((blob) => {
				if (!validateMimeType(blob.type)) {
					const names = getMimeNamesJoined();
					toast.error(
						`Only ${names} files are allowed. Current file type is ${blob.type}`
					);
					return;
				}

				setSelectedFile({
					type: getSelectedType(blob),
					from: 'upload',
					upload: {
						type: 'url',
						originalUrl: byUrl,
						blob
					}
				});
			})
			.catch((err) => {
				toast.error(`Failed to fetch file from the URL`);
			})
			.finally(() => {
				isUploading = false;
			});
	}

	function handlePaste(e: ClipboardEvent) {
		// first check if there's any text (url)
		const text = e.clipboardData?.getData('text/plain') || '';
		if (isValidUrl(text) && (e.target as HTMLElement).tagName !== 'INPUT') {
			byUrl = text;
			handleFetch();
			return;
		}

		// only looking for images
		if (config.type === 'audio') return;

		const items = e.clipboardData?.items;
		if (!items) return;

		for (let i = 0; i < items.length; i++) {
			const item = items[i]!;
			if (item.type.indexOf('image') === 0) {
				const blob = item.getAsFile();
				if (!blob) continue;

				setSelectedFile({
					type: getSelectedType(blob),
					from: 'upload',
					upload: { type: 'paste', blob }
				});
				break;
			}
		}
	}

	function handleDragEnter(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;
	}

	function handleDragDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();

		isDragging = false;

		if (!e.dataTransfer) return;
		const files = e.dataTransfer.files;
		const file = getFileFromFiles(files);
		if (!file) return;

		setSelectedFile({
			type: getSelectedType(file),
			from: 'upload',
			upload: { type: 'dnd', blob: file }
		});
	}

	function handleUploadClick() {
		inputEl?.click();
	}

	function handleInputChange(e: any) {
		const file = getFileFromFiles(e.target.files);
		if (!file) return;

		setSelectedFile({
			type: getSelectedType(file),
			from: 'upload',
			upload: { type: 'browse', blob: file }
		});
	}

	function getFileFromFiles(files: FileList | null): File | null {
		if (!files || files.length === 0) {
			toast.error('No files selected');
			return null;
		}
		const file = files[0];
		if (!file) {
			toast.error('No files selected');
			return null;
		}

		const maxBytes = config.maxFileSizeInMB * 1024 * 1024;
		if (file.size > maxBytes) {
			toast.error('File size exceeds the limit of ' + byteFormatter(maxBytes));
			return null;
		}

		if (validateMimeType(file.type) === false) {
			const names = getMimeNamesJoined();
			toast.error(`Only ${names} files are allowed. Current file type is ${file.type}`);
			return null;
		}

		return file;
	}

	onMount(() => {
		byUrl && byUrlInputEl && byUrlInputEl.focus();
	});
</script>

<svelte:window
	onpaste={handlePaste}
	ondragenter={handleDragEnter}
	ondragover={handleDragEnter}
	ondragleave={handleDragLeave}
	ondragexit={handleDragLeave}
/>

<div class="tab">
	<input
		type="file"
		accept={config.type === 'audio' ? 'audio/*' : config.type === 'image' ? 'image/*' : '*'}
		style="display:none"
		bind:this={inputEl}
		onchange={handleInputChange}
	/>

	{#if isUploading}
		<Loader full />
	{:else}
		<div class="upload-wrap">
			<div
				class="upload-area"
				onclick={handleUploadClick}
				ondrop={handleDragDrop}
				role="button"
				tabindex="0"
				onkeyup={(e) => e.key === 'Enter' && handleUploadClick()}
			>
				{#if isDragging}
					Drop here!
				{:else}
					Drag and drop, paste ({getCtrl()} + v), or click to upload
				{/if}
			</div>
		</div>

		{#if config.type === 'image'}
			<div class="by-url-wrap">
				<div class="title">or, Upload by URL</div>

				<div class="input-button">
					<TextInput
						block
						placeholder="Enter image URL"
						bind:value={byUrl}
						on:keyup={(e) => e.key === 'Enter' && handleFetch()}
						bind:input={byUrlInputEl}
					/>
					<Button disabled={byUrl.trim() === ''} on:click={handleFetch}>
						Fetch {#snippet end()}
							<IconArrowReturnLeft />
						{/snippet}
					</Button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.tab {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 15px;
	}

	.upload-wrap {
		flex: 1;
		width: 100%;
		height: 100%;
		.upload-area {
			background-color: var(--input);
			width: 100%;
			height: 100%;
			border-radius: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: var(--text-light);
			transition: 0.2s box-shadow;
			cursor: pointer;
			&:hover {
				box-shadow: 0 0 0 2px var(--accent-light);
			}
		}
	}

	.by-url-wrap {
		margin-top: 15px;
		.title {
			font-size: 0.9rem;
			font-weight: 500;
			color: var(--text-light);
			margin-bottom: 10px;
			padding-left: 5px;
			text-align: center;
		}
		.input-button {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
</style>
