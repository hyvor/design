<script lang="ts">
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import type { DropdownAlign, DropdownPosition } from '../Dropdown/dropdown.types.js';
	import IconButton from '../IconButton/IconButton.svelte';
	import type { IconButtonColor, IconButtonSize } from '../IconButton/iconButton.types.js';
	import EmojiSelector from './EmojiSelector.svelte';

	interface Props {
		emoji?: string;
		iconButtonSize?: IconButtonSize;
		iconButtonColor?: IconButtonColor;
		dropdownAlign?: DropdownAlign;
		dropdownPosition?: DropdownPosition;
	}

	let show = $state(false);

	let {
		emoji = undefined,
		iconButtonSize = undefined,
		iconButtonColor = undefined,
		dropdownAlign = 'center',
		dropdownPosition = 'bottom'
	}: Props = $props();
</script>

<Dropdown align={dropdownAlign} position={dropdownPosition} width={370} contentPadding={0}>
	{#snippet trigger()}
		<IconButton size={iconButtonSize} color={iconButtonColor} onclick={() => (show = !show)}>
			{#if emoji === undefined}
				<span class="no-emoji">😀</span>
			{:else}
				<span class="emoji">{emoji}</span>
			{/if}
		</IconButton>
	{/snippet}
	{#snippet content()}
		<EmojiSelector />
	{/snippet}
</Dropdown>

<style>
	.no-emoji {
		filter: grayscale(100%);
	}
</style>
