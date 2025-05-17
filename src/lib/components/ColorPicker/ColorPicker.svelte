<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { clickOutside } from '../index.js';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		color?: string;
		size?: number;
		show?: boolean;
		'aria-label'?: string;
		alpha?: boolean;
		oninput?: (color: string) => void;
		onchange?: (color: string) => void;
	}

	let {
		color = $bindable('#000000'),
		size = 30,
		show = $bindable(false),
		'aria-label': ariaLabel = '',
		alpha = false,
		oninput,
		onchange
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		input: string;
		change: string;
	}>();

	function handleInput() {
		dispatch('input', color);
		oninput?.(color);
	}

	function handleClose() {
		dispatch('change', color);
		onchange?.(color);
		show = false;
	}
</script>

<span class="color-picker">
	<button
		style:width="{size}px"
		style:height="{size}px"
		style:background-color={color}
		onclick={() => {
			if (show) {
				handleClose();
			} else {
				show = true;
			}
		}}
		aria-label={ariaLabel}
	></button>

	{#if show}
		<div
			class="color-picker-wrap"
			use:clickOutside={{
				callback: () => handleClose()
			}}
		>
			<ColorPicker
				bind:hex={color}
				--input-size={size + 'px'}
				isDialog={false}
				isAlpha={alpha}
				on:input={handleInput}
			/>
		</div>
	{/if}
</span>

<style>
	span {
		position: relative;
	}
	button {
		border-radius: 50%;
		border: 1px solid var(--border);
	}
	div {
		position: absolute;
		left: 0;
		top: 100%;
		width: 0;
		z-index: 1000;
	}
</style>
