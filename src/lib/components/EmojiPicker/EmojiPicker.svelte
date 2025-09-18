<script lang="ts">
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import type { DropdownAlign, DropdownPosition } from '../Dropdown/dropdown.types.js';
	import IconButton from '../IconButton/IconButton.svelte';
	import type {
		IconButtonColor,
		IconButtonSize,
		IconButtonVariant
	} from '../IconButton/iconButton.types.js';
	import EmojiSelector from './EmojiSelector.svelte';

	interface Props {
		emoji?: string;
		iconButtonSize?: IconButtonSize;
		iconButtonColor?: IconButtonColor;
		iconButtonVariant?: IconButtonVariant;
		dropdownAlign?: DropdownAlign;
		dropdownPosition?: DropdownPosition;
		onselect?: (emoji: string | undefined) => void;
		removable?: boolean;
	}

	let show = $state(false);

	let {
		emoji = $bindable(undefined),
		iconButtonSize = undefined,
		iconButtonColor = undefined,
		iconButtonVariant = undefined,
		dropdownAlign = 'center',
		dropdownPosition = 'bottom',
		onselect = undefined,
		removable = false
	}: Props = $props();

	function handleOnSelect(e: string | undefined) {
		emoji = e;
		show = false;
		onselect?.(e);
	}

	function handleClose() {
		show = false;
	}
</script>

<Dropdown
	bind:show
	align={dropdownAlign}
	position={dropdownPosition}
	width={420}
	contentPadding={0}
>
	{#snippet trigger()}
		<IconButton size={iconButtonSize} color={iconButtonColor} variant={iconButtonVariant}>
			{#if emoji === undefined}
				<span class="no-emoji">😀</span>
			{:else}
				<span class="emoji">{emoji}</span>
			{/if}
		</IconButton>
	{/snippet}
	{#snippet content()}
		<EmojiSelector onselect={handleOnSelect} onclose={handleClose} {removable} />
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
