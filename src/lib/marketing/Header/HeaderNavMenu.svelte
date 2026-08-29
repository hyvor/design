<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import Dropdown from '../../components/Dropdown/Dropdown.svelte';
	import HeaderNavLink from './HeaderNavLink.svelte';
	import HeaderMobileSection from './HeaderMobileSection.svelte';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import type { DropdownAlign } from '../../components/Dropdown/dropdown.types.js';
	import { HEADER_MOBILE_BREAKPOINT } from './breakpoint.js';
	import { setHeaderNavMenuContext } from './navMenuContext.js';

	interface Props {
		/** The trigger label, e.g. "Resources". */
		label: string;
		/** Highlights the trigger (e.g. when a child page is active). */
		active?: boolean;
		/** The menu items, usually a list of <HeaderNavLink>s. */
		children: Snippet;
		/** Width of the desktop dropdown panel. */
		width?: number;
		/** Alignment of the desktop dropdown panel. */
		align?: DropdownAlign;
	}

	let { label, active = false, children, width = 300, align = 'center' }: Props = $props();

	/*
		On mobile/tablet the header nav collapses into the hamburger menu, which is
		itself a dropdown. Opening another floating dropdown inside it overflows the
		viewport and looks broken, so below the breakpoint we render the group as a
		collapsible inline section (a plain, native-looking list of links) instead.
	*/
	const mobile = new MediaQuery(`(max-width: ${HEADER_MOBILE_BREAKPOINT}px)`);

	// lets child <HeaderNavLink>s render as flat sub-nav items (no icon) on mobile
	setHeaderNavMenuContext({
		get inlineMobile() {
			return mobile.current;
		}
	});

	let open = $state(false);

	// close the desktop dropdown once a link inside it is clicked
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
