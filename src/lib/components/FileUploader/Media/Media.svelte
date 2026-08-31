<script lang="ts">
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import LoadButton from '$lib/components/Loader/LoadButton.svelte';
	import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
	import toast from '$lib/components/Toast/toast.js';
	import { getFileUploaderConfig, setSelectedFile, type MediaItem } from '../file-uploader.js';

	const config = getFileUploaderConfig();

	let items: MediaItem[] = $state([]);
	let page = $state(1);
	let isLoading = $state(true);
	let isLoadingMore = $state(false);
	let hasMore = $state(false);

	function load(nextPage = 1) {
		if (!config.mediaLoad) return;

		nextPage === 1 ? (isLoading = true) : (isLoadingMore = true);

		config
			.mediaLoad(nextPage, config.type)
			.then((results) => {
				items = nextPage === 1 ? results : [...items, ...results];
				hasMore = results.length > 0;
				page = nextPage;
			})
			.catch((err) => {
				toast.error(err.message || 'Failed to load media');
			})
			.finally(() => {
				isLoading = false;
				isLoadingMore = false;
			});
	}

	function handleSelect(item: MediaItem) {
		setSelectedFile({
			type: config.type === 'audio' ? 'audio' : 'image',
			from: 'media',
			media: item
		});
	}

	function handleLoadMore() {
		load(page + 1);
	}

	onMount(() => load());
</script>

<div class="media">
	{#if isLoading}
		<Loader full />
	{:else if items.length === 0}
		<IconMessage empty message="No media found" />
	{:else}
		<div class="grid">
			{#each items as item (item.id)}
				<button type="button" class="item" onclick={() => handleSelect(item)}>
					{#if config.type === 'audio'}
						<div class="audio-name">{item.name}</div>
					{:else}
						<img src={item.url} alt={item.name} />
					{/if}
				</button>
			{/each}
		</div>

		<LoadButton text="Load More" show={hasMore} loading={isLoadingMore} on:click={handleLoadMore} />
	{/if}
</div>

<style lang="scss">
	.media {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 10px;
	}
	.item {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 5px;
		background: var(--input);
		cursor: pointer;
		overflow: hidden;
		transition: 0.2s box-shadow;
		&:hover {
			box-shadow: 0 0 0 2px var(--accent-light);
		}
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.audio-name {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding: 10px;
			font-size: 13px;
			text-align: center;
			word-break: break-word;
		}
	}
</style>
