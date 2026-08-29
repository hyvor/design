<script lang="ts">
	import IconArrowReturnLeft from '@hyvor/icons/IconArrowReturnLeft';
	import Button from '$lib/components/Button/Button.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import LoadButton from '$lib/components/Loader/LoadButton.svelte';
	import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
	import toast from '$lib/components/Toast/toast.js';
	import { getFileUploaderConfig, setSelectedFile, type UnsplashImage } from '../file-uploader.js';

	const config = getFileUploaderConfig();

	let search = $state('');
	let images: UnsplashImage[] = $state([]);
	let page = $state(1);
	let isLoading = $state(false);
	let isLoadingMore = $state(false);
	let hasMore = $state(false);
	let hasSearched = $state(false);
	let inputError = $state(false);

	function performSearch(nextPage = 1) {
		inputError = false;

		if (search.trim() === '') {
			inputError = true;
			return;
		}

		if (!config.unsplashSearch) return;

		nextPage === 1 ? (isLoading = true) : (isLoadingMore = true);

		config
			.unsplashSearch(search, nextPage)
			.then((results) => {
				images = nextPage === 1 ? results : [...images, ...results];
				hasMore = results.length > 0;
				page = nextPage;
				hasSearched = true;
			})
			.catch((err) => {
				toast.error(err.message || 'Failed to search Unsplash');
			})
			.finally(() => {
				isLoading = false;
				isLoadingMore = false;
			});
	}

	function handleKeyup(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			performSearch();
		}
	}

	function handleSelect(image: UnsplashImage) {
		setSelectedFile({
			type: 'image',
			from: 'unsplash',
			unsplash: image
		});
	}

	function handleLoadMore() {
		performSearch(page + 1);
	}
</script>

<div class="unsplash">
	<div class="search-wrap">
		<TextInput
			bind:value={search}
			placeholder="Search Unsplash"
			autofocus
			autocomplete="off"
			onkeyup={handleKeyup}
			block
			state={inputError ? 'error' : 'default'}
		/>
		<Button onclick={() => performSearch()}>
			Search
			{#snippet end()}
				<IconArrowReturnLeft size={14} />
			{/snippet}
		</Button>
	</div>

	<div class="results">
		{#if isLoading}
			<Loader full />
		{:else if images.length === 0 && hasSearched}
			<IconMessage empty message="No images found" />
		{:else}
			<div class="cols">
				{#each [0, 1, 2] as col (col)}
					<div class="col">
						{#each images as image, i (image.url)}
							{#if i % 3 === col}
								<button type="button" class="img-wrap" onclick={() => handleSelect(image)}>
									<img src={image.url} alt={image.alt || image.title || ''} />
								</button>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}

		<LoadButton
			text="Load More"
			show={hasMore && !isLoading}
			loading={isLoadingMore}
			on:click={handleLoadMore}
		/>
	</div>
</div>

<style lang="scss">
	.unsplash {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.search-wrap {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		gap: 10px;
	}
	.results {
		flex: 1;
		overflow-y: auto;
		.cols {
			display: flex;
			gap: 10px;
		}
		.col {
			flex: 1;
		}
		.img-wrap {
			display: block;
			width: 100%;
			margin-bottom: 10px;
			padding: 0;
			border: none;
			background: none;
			cursor: pointer;
			img {
				display: block;
				width: 100%;
				border-radius: 5px;
			}
		}
	}
</style>
