<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownContent from './DropdownContent.svelte';
	import type { DropdownAlign, DropdownPosition } from './dropdown.types.js';

	interface Props {
		show?: boolean;
		width?: number;
		relative?: boolean;
		closeOnOutsideClick?: boolean;
		align?: DropdownAlign;
		position?: DropdownPosition;
		trigger?: Snippet;
		content?: Snippet;
		contentPadding?: number;
		keepInDom?: boolean;
	}

	let {
		show = $bindable(false),
		width = 225,
		relative = false,
		closeOnOutsideClick = true,
		align = 'start',
		position = 'bottom',
		trigger,
		content,
		contentPadding,
		keepInDom = false
	}: Props = $props();

	let triggerEl: HTMLElement | undefined = $state();
</script>

<span class="dropdown" class:relative>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<span
		class="trigger"
		onclick={() => (show = !show)}
		onkeyup={(e) => {
			if (e.key === 'Escape') {
				show = false;
			}
		}}
		bind:this={triggerEl}
	>
		{@render trigger?.()}
	</span>

	{#if show || keepInDom}
		<DropdownContent
			bind:show
			{width}
			{closeOnOutsideClick}
			{align}
			{position}
			{relative}
			trigger={triggerEl}
			padding={contentPadding}
		>
			{@render content?.()}
		</DropdownContent>
	{/if}
</span>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}
	.dropdown.relative > :global(.content-wrap) {
		position: relative !important;
	}
</style>
