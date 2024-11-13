<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownContent from './DropdownContent.svelte';

	interface Props {
		show?: boolean;
		width?: number;
		relative?: boolean;
		closeOnOutsideClick?: boolean;
		align?: 'start' | 'center' | 'end';
		position?: 'left' | 'right' | 'bottom' | 'top';
		trigger?: Snippet;
		content?: Snippet;
	}

	let {
		show = $bindable(false),
		width = 225,
		relative = false,
		closeOnOutsideClick = true,
		align = 'start',
		position = 'bottom',
		trigger,
		content
	}: Props = $props();

	let triggerEl: HTMLElement | undefined = $state();
</script>

<span class="dropdown" class:relative>
	<span
		class="trigger"
		onclick={() => (show = !show)}
		role="listbox"
		tabindex="0"
		onkeyup={(e) => {
			if (e.key === 'Escape') {
				show = false;
			}
		}}
		bind:this={triggerEl}
	>
		{@render trigger?.()}
	</span>

	{#if show}
		<DropdownContent
			bind:show
			{width}
			{closeOnOutsideClick}
			{align}
			{position}
			{relative}
			trigger={triggerEl}
		>
			{@render content?.()}
		</DropdownContent>
	{/if}
</span>

<style lang="scss">
	.dropdown {
		position: relative;
		display: inline-block;
	}
	.dropdown.relative > :global(.content-wrap) {
		position: relative !important;
	}
</style>
