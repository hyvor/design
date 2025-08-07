<script lang="ts">
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import type { DropdownAlign, DropdownPosition } from '../Dropdown/dropdown.types.js';
	import IconButton from '../IconButton/IconButton.svelte';
	import type { IconButtonColor, IconButtonSize } from '../IconButton/iconButton.types.js';
	import EmojiSelector from './EmojiSelector.svelte';
	import { fromHexcodeToCodepoint } from 'emojibase';
	import { fromCodepointToUnicode } from 'emojibase';

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

	function handleOnSelect(e: string) {
		emoji = e;
		show = false;
	}

	const hexUnicode = '1F642-200D-2195-FE0F';
	const code = fromHexcodeToCodepoint(hexUnicode);
	const unicode = fromCodepointToUnicode(code);
	console.log('Hex Unicode:', hexUnicode);
	console.log('Codepoint:', code);
	console.log('Unicode:', unicode);
</script>

<Dropdown
	bind:show
	align={dropdownAlign}
	position={dropdownPosition}
	width={370}
	contentPadding={0}
>
	{#snippet trigger()}
		<IconButton size={iconButtonSize} color={iconButtonColor}>
			{#if emoji === undefined}
				<span class="no-emoji">😀</span>
			{:else}
				<span class="emoji">{emoji}</span>
			{/if}
		</IconButton>
	{/snippet}
	{#snippet content()}
		<EmojiSelector onselect={handleOnSelect} />
	{/snippet}
</Dropdown>

<style>
	.no-emoji {
		filter: grayscale(100%);
		font-size: 18px;
	}
	.emoji {
		font-size: 18px;
	}
</style>
