<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { clickOutside } from '../index.js';
	import { createEventDispatcher } from 'svelte';
	import type { DropdownAlign, DropdownPosition } from '../Dropdown/dropdown.types.js';

	interface Props {
		color?: string;
		size?: number;
		show?: boolean;
		'aria-label'?: string;
		alpha?: boolean;
		align?: DropdownAlign;
		position?: DropdownPosition;
		oninput?: (color: string) => void;
		onchange?: (color: string) => void;
	}

	let {
		color = $bindable('#000000'),
		size = 30,
		show = $bindable(false),
		'aria-label': ariaLabel = '',
		alpha = false,
		align = 'start',
		position = 'bottom',
		oninput,
		onchange
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		input: string;
		change: string;
	}>();

	let buttonElement: HTMLButtonElement;
	let wrapElement: HTMLElement | undefined = $state();
	let pickerTop = $state(0);
	let pickerLeft = $state(0);

	const GAP = 5;
	const SPACE_AROUND = 15;

	function updatePosition() {
		if (!buttonElement || !wrapElement) return;

		const triggerRect = buttonElement.getBoundingClientRect();
		const contentRect = wrapElement.getBoundingClientRect();
		const documentWidth = document.documentElement.clientWidth;
		const width = contentRect.width;
		const height = contentRect.height;

		let top = triggerRect.bottom + GAP;
		let left = triggerRect.left;

		if (position === 'bottom') {
			top = triggerRect.bottom + GAP;
		} else if (position === 'top') {
			top = triggerRect.top - height - GAP;
		} else if (position === 'left') {
			left = triggerRect.left - width - GAP;
		} else if (position === 'right') {
			left = triggerRect.right + GAP;
		}

		if (position === 'bottom' || position === 'top') {
			if (align === 'start') {
				left = Math.min(triggerRect.left, documentWidth - width - SPACE_AROUND);
			} else if (align === 'center') {
				left = triggerRect.left + triggerRect.width / 2 - width / 2;
			} else if (align === 'end') {
				left = triggerRect.right - width;
			}
			left = Math.max(left, SPACE_AROUND);
		} else {
			if (align === 'start') {
				top = triggerRect.top;
			} else if (align === 'center') {
				top = triggerRect.top + triggerRect.height / 2 - height / 2;
			} else if (align === 'end') {
				top = triggerRect.bottom - height;
			}
			top = Math.max(top, SPACE_AROUND);
		}

		pickerTop = top;
		pickerLeft = left;
	}

	$effect(() => {
		// rerun when positioning inputs change
		position;
		align;
		show;

		if (show && wrapElement) {
			updatePosition();
			window.addEventListener('scroll', updatePosition, true);
			window.addEventListener('resize', updatePosition);

			// the color picker widget can change size after it mounts
			const observer = new MutationObserver(updatePosition);
			observer.observe(wrapElement, { subtree: true, childList: true });

			return () => {
				observer.disconnect();
				window.removeEventListener('scroll', updatePosition, true);
				window.removeEventListener('resize', updatePosition);
			};
		}

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	});

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
		bind:this={buttonElement}
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
			bind:this={wrapElement}
			style:top="{pickerTop}px"
			style:left="{pickerLeft}px"
			use:clickOutside={{
				callback: () => handleClose()
			}}
		>
			<ColorPicker
				bind:hex={color}
				--input-size={size + 'px'}
				isDialog={false}
				isAlpha={alpha}
				onInput={handleInput}
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
		position: fixed;
		z-index: 1000;
	}
</style>
