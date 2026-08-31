<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import Dropdown from '../../components/Dropdown/Dropdown.svelte';
	import HeaderNavLink from './HeaderNavLink.svelte';
	import HeaderMobileSection from './HeaderMobileSection.svelte';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import type { DropdownAlign } from '../../components/Dropdown/dropdown.types.js';
	import { HEADER_MOBILE_BREAKPOINT } from './breakpoint.js';

	interface Props {
		label: string;
		active?: boolean;
		children: Snippet;
		width?: number;
		align?: DropdownAlign;
	}

	let { label, active = false, children, width = 300, align = 'center' }: Props = $props();

	// below the breakpoint: render as a collapsible inline section, not a dropdown
	const mobile = new MediaQuery(`(max-width: ${HEADER_MOBILE_BREAKPOINT}px)`);

	let open = $state(false);

	// close the dropdown when a link inside it is clicked
	function closeOnLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'A' || target.closest('a')) {
			open = false;
		}
	}
</script>

{#if mobile.current}
	<HeaderMobileSection {label}>
		{@render children()}
	</HeaderMobileSection>
{:else}
	<Dropdown bind:show={open} {width} {align} contentPadding={8}>
		{#snippet trigger()}
			<HeaderNavLink active={active || open}>
				{label}
				{#snippet end()}<IconCaretDown size={11} />{/snippet}
			</HeaderNavLink>
		{/snippet}
		{#snippet content()}
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
			<div onclick={closeOnLinkClick}>
				{@render children()}
			</div>
		{/snippet}
	</Dropdown>
{/if}
