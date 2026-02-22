<script lang="ts">
	import IconCardImage from '@hyvor/icons/IconCardImage';
	import IconCaretLeft from '@hyvor/icons/IconCaretLeft';
	import IconCloudUpload from '@hyvor/icons/IconCloudUpload';
	import Button from '../Button/Button.svelte';
	import Modal from '../Modal/Modal.svelte';
	import TabNav from '../TabNav/TabNav.svelte';
	import TabNavItem from '../TabNav/TabNavItem.svelte';
	import {
		clearSelectedFile,
		closeFileUploader,
		getFileUploaderConfig,
		selectedFile
	} from './file-uploader.js';
	import TabUpload from './TabUpload/TabUpload.svelte';
	import Preview from './Preview/Preview.svelte';

	const config = getFileUploaderConfig();

	let tab = $state('upload');

	function onClose() {
		closeFileUploader();
	}

	function handleBack() {
		clearSelectedFile();
	}
</script>

<div class="image-uploader">
	<Modal
		show={true}
		size="large"
		closeOnEscape={false}
		closeOnOutsideClick={false}
		on:cancel={onClose}
	>
		{#snippet title()}
			<div>
				{#if $selectedFile}
					<Button color="input" onclick={handleBack}>
						{#snippet start()}
							<IconCaretLeft va />
						{/snippet}
						Back
					</Button>
				{:else}
					<TabNav bind:active={tab}>
						<TabNavItem name="upload">
							{#snippet start()}
								<IconCloudUpload />
							{/snippet}
							Upload
						</TabNavItem>

						<!-- <TabNavItem name="media">
							{#snippet start()}
								<IconCardImage />
							{/snippet}
							Media Library
						</TabNavItem> -->

						{#if config.type === 'image'}
							<!-- <TabNavItem name="unsplash">
								{#snippet start()}
									<svg
										role="img"
										width="1em"
										height="1em"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										><path
											d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"
										/></svg
									>
								{/snippet}
								Unsplash
							</TabNavItem>
							<TabNavItem name="excalidraw">
								{#snippet start()}
									<ExcalidrawIcon />
								{/snippet}
								Excalidraw
							</TabNavItem> -->
						{/if}
					</TabNav>
				{/if}
			</div>
		{/snippet}
		<div class="body" style:position={selectedFile ? 'relative' : undefined}>
			{#if tab === 'upload'}
				<TabUpload />
			{/if}

			{#if $selectedFile}
				<Preview />
			{/if}

			<!-- {#if tab === 'upload'}
				<TabUpload {type} on:select={handleSelect} />
			{:else if tab === 'media' && type !== 'any'}
				<Media {type} on:select={handleSelect} />
			{:else if tab === 'unsplash'}
				<Unsplash on:select={handleSelect} />
			{:else if tab === 'excalidraw'}
				<Excalidraw on:select={handleSelect} />
			{/if}

			 -->
		</div>
	</Modal>
</div>

<style lang="scss">
	.image-uploader :global(.wrap) {
		z-index: 1000 !important;
	}

	.image-uploader :global(.inner) {
		height: 100%;
		width: 1100px !important;
		display: flex;
		flex-direction: column;
		:global(> .content) {
			flex: 1;
			padding-top: 0;
			min-height: 0;
			display: flex;
			flex-direction: column;
		}
	}

	.body {
		flex: 1;
		min-height: 0;
	}
</style>
