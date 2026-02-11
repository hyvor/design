<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { loadEmojis, type CompactEmoji, type EmojiGroup } from './emojidata.js';
	import Loader from '../Loader/Loader.svelte';
	import TextInput from '../TextInput/TextInput.svelte';
	import Button from '../Button/Button.svelte';

	interface Props {
		onselect: (emoji: string | undefined) => void;
		onclose: () => void;
		removable: boolean;
	}

	let { onselect, onclose, removable }: Props = $props();

	let loading = $state(true);
	let searchInput = $state({} as HTMLInputElement);
	let groupsEl = $state({} as HTMLDivElement);

	let data: EmojiGroup[] = $state([]);
	let search = $state('');

	let searchedEmojis: CompactEmoji[] | null = $derived.by(() => {
		let searchVal = search.trim().toLowerCase();
		if (!searchVal) return null;

		return data
			.flatMap((group) => group.emojis)
			.filter((emoji) => {
				const shortcodes = emoji.shortcodes || [];
				const tags = emoji.tags || [];

				const searchIn = [emoji.unicode, emoji.annotation, ...shortcodes, ...tags]
					.filter((s) => Boolean(s))
					.map((s) => s.toLowerCase());

				return searchIn.some((code) => code.includes(searchVal));
			});
	});

	async function load() {
		data = await loadEmojis();
		loading = false;

		await tick();
		searchInput?.focus();
	}

	function handleSectionButtonClick(group: number) {
		if (!groupsEl) return;

		const groupEl = groupsEl.querySelector(`.group[data-group="${group}"]`);
		if (groupEl) {
			groupEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}

	onMount(() => {
		load();
	});
</script>

<div class="wrap">
	{#if loading}
		<Loader padding={100} block />
	{:else}
		<div class="header">
			<div class="left">
				{@render SectionButton('☺️', 0)}
				{@render SectionButton('👋', 1)}
				{@render SectionButton('😺', 2)}
				{@render SectionButton('🍕', 3)}
				{@render SectionButton('🗼', 4)}
				{@render SectionButton('⚽', 5)}
				{@render SectionButton('📕', 6)}
				{@render SectionButton('✔️', 7)}
				{@render SectionButton('🇨🇵', 8)}
			</div>
			<div class="right">
				{#if removable}
					<Button size="small" color="input" onclick={() => onselect(undefined)}
						>Remove</Button
					>
				{/if}
			</div>
		</div>
		<div class="input">
			<TextInput
				block
				bind:value={search}
				bind:input={searchInput}
				onkeydown={handleKeydown}
			/>
		</div>
		<div class="groups" bind:this={groupsEl}>
			{#if searchedEmojis !== null}
				{#if searchedEmojis.length === 0}
					<div class="no-results">No results found</div>
				{:else}
					<div class="group">
						<div class="name">Search Results</div>
						{@render Emojis(searchedEmojis)}
					</div>
				{/if}
			{:else}
				{#each data as group, i}
					<div class="group" data-group={i}>
						<div class="name">{group.name}</div>
						{@render Emojis(group.emojis)}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

{#snippet Emojis(emojis: CompactEmoji[])}
	<div class="emojis">
		{#each emojis as emoji}
			<button class="emoji" onclick={() => onselect(emoji.unicode)}>
				{emoji.unicode}
			</button>
		{/each}
	</div>
{/snippet}

{#snippet SectionButton(icon: string, group: number)}
	<button
		class="section-button"
		data-group={group}
		onclick={() => handleSectionButtonClick(group)}
	>
		{icon}
	</button>
{/snippet}

<style>
	.wrap {
		font-size: 16px;
	}
	.group {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	.group .name {
		font-weight: 600;
		margin-bottom: 10px;
	}
	.input {
		padding: 0 10px;
		margin: 10px 0;
	}
	.groups {
		padding: 15px;
		padding-top: 5px;
		max-height: 370px;
		overflow-y: auto;
	}
	.emojis {
		display: flex;
		flex-wrap: wrap;
	}
	.emoji {
		font-size: 22px;
		cursor: pointer;
		transition: transform 0.2s;
		width: 34px;
		height: 34px;
		text-align: center;
		border-radius: 5px;
	}
	.emoji:hover {
		background-color: var(--hover-dark);
	}

	.no-results {
		color: var(--text-light);
		font-size: 14px;
		text-align: center;
		padding: 30px;
	}

	.header {
		padding: 0 15px;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
	}
	.header .left {
		flex: 1;
	}

	.section-button {
		font-size: 20px;
		padding: 10px 4px;
		cursor: pointer;
		color: var(--text-light);
		filter: grayscale(100%);
		border-bottom: 2px solid transparent;
		transition:
			filter 0.2s,
			border-bottom 0.2s;
	}
	.section-button:hover {
		filter: grayscale(50%);
		border-bottom: 2px solid var(--text-light);
	}
</style>
