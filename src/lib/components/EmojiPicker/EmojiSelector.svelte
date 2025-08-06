<script lang="ts">
	import { onMount } from 'svelte';
	import { loadEmojis, type CompactEmoji, type EmojiGroup } from './emojidata.js';
	import Loader from '../Loader/Loader.svelte';
	import TextInput from '../TextInput/TextInput.svelte';

	let loading = $state(true);
	let data: EmojiGroup[] = $state([]);

	async function load() {
		data = await loadEmojis();
		loading = false;
	}

	onMount(load);
</script>

<div class="wrap">
	{#if loading}
		<Loader padding={100} block />
	{:else}
		<div class="header">Emoji Selector</div>
		<div class="input">
			<TextInput block />
		</div>
		<div class="groups">
			{#each data as group}
				<div class="group">
					<div class="name">{group.name}</div>
					<div class="emojis">
						{#each group.emojis as emoji}
							<button class="emoji">{emoji.unicode}</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.group {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	.name {
		font-weight: 600;
		margin-bottom: 10px;
	}
	.input {
		padding: 0 10px;
	}
	.groups {
		padding: 15px;
		max-height: 400px;
		overflow-y: auto;
	}
	.wrap {
	}
	.emojis {
		display: flex;
		flex-wrap: wrap;
	}
	.emoji {
		font-size: 22px;
		cursor: pointer;
		transition: transform 0.2s;
		width: 32px;
		height: 32px;
		text-align: center;
		border-radius: 5px;
	}
	.emoji:hover {
		background-color: var(--hover-dark);
	}
</style>
