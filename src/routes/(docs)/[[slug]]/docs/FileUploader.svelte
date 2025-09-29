<script>
	import Button from '$lib/components/Button/Button.svelte';
	import { uploadFile } from '$lib/components/FileUploader/file-uploader';

	function onUpload() {
		uploadFile({ type: 'image' });
	}
</script>

<h1>File Uploader</h1>

<Button onclick={onUpload}>Upload Image</Button>
