<script lang="ts">
	import { fileUploaderConfig } from './file-uploader.js';
	import FileUploader from './FileUploader.svelte';
</script>

{#if $fileUploaderConfig}
	<FileUploader />
{/if}
