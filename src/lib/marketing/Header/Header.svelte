<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import Container from './../Container/Container.svelte';
	import DarkToggle from '../../components/Dark/DarkToggle.svelte';
	import IconButton from '../../components/IconButton/IconButton.svelte';
	import Dropdown from '../../components/Dropdown/Dropdown.svelte';
	import IconList from '@hyvor/icons/IconList';
	import IconX from '@hyvor/icons/IconX';
	import HeaderNotification from './HeaderNotification.svelte';

	interface Props {
		product: string;
		instance?: string;
		logo?: string;
		name?: string;
		href?: string;
		subName?: undefined | string;
		darkToggle?: boolean;
		center?: Snippet;
		end?: Snippet;
		max?: boolean;
		logoAltText?: string;
		menuLabel?: string;
	}

	let {
		product,
		logo,
		instance = 'https://hyvor.com',
		name = 'HYVOR',
		href = '/',
		subName = undefined,
		darkToggle = true,
		center,
		end,
		max = false,
		logoAltText = 'Logo',
		menuLabel = 'Menu'
	}: Props = $props();

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// close the mobile menu once a link inside it is clicked
	function closeOnLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'A' || target.closest('a')) {
			mobileOpen = false;
		}
	}
</script>

<header class:scrolled>
	<HeaderNotification {instance} {product} />
	<Container as="nav" {max}>
		<div class="nav-start">
			<a class="nav-brand" {href}>
				<img
					src={logo || `${instance}/api/public/logo/${product}.svg`}
					alt="{name + (subName ? ' ' + subName : '')} {logoAltText}"
					width="26"
					height="26"
				/>
				<span class="brand-product">
					<span class="brand">{name}</span>
					{#if subName}
						<span class="product">{subName}</span>
					{/if}
				</span>
			</a>
		</div>

		<div class="nav-center">
			{@render center?.()}
		</div>

		<div class="nav-end">
			{@render end?.()}
		</div>

		<div class="dark-mobile">
			{#if darkToggle}
				<span class="dark-toggle-wrap">
					<DarkToggle />
				</span>
			{/if}
		</div>

		<span class="mobile-nav-wrap">
			<Dropdown bind:show={mobileOpen} align="end" width={300} contentPadding={8}>
				{#snippet trigger()}
					<IconButton
						variant="invisible"
						aria-label={menuLabel}
						aria-expanded={mobileOpen}
					>
						{#if mobileOpen}
							<IconX size={18} />
						{:else}
							<IconList size={18} />
						{/if}
					</IconButton>
				{/snippet}
				{#snippet content()}
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
					<div class="mobile-content" onclick={closeOnLinkClick}>
						{#if center}
							<div class="mobile-inner">
								{@render center()}
							</div>
						{/if}
						{#if end}
							{#if center}
								<div class="mobile-divider"></div>
							{/if}
							<div class="mobile-inner end">
								{@render end()}
							</div>
						{/if}
					</div>
				{/snippet}
			</Dropdown>
		</span>
	</Container>
</header>

<div class="header-space"></div>

<style>
	.header-space {
		height: var(--header-height);
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background-color: var(--background, var(--accent-lightest));
		border-bottom: 1px solid transparent;
		height: var(--header-height);
		display: flex;
		flex-direction: column;
		transition: border-color 0.2s ease;
	}

	header.scrolled {
		border-bottom-color: var(--border);
	}

	header :global(> nav) {
		display: flex;
		align-items: center;
		flex: 1;
	}
	.nav-brand {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		line-height: inherit;
		white-space: nowrap;
		color: inherit;
		text-decoration: none;
		font-weight: 600;
	}
	.nav-brand img {
		display: block;
	}

	.brand-product {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		line-height: 14px;
	}
	.brand-product .brand {
		font-size: 14px;
	}
	.brand-product .product {
		font-size: 12px;
		font-weight: normal;
		color: var(--text-light);
	}

	.nav-center {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 2px;
		justify-content: center;
	}

	.nav-end {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.mobile-nav-wrap {
		display: none;
	}

	.dark-mobile {
		display: inline-flex;
		align-items: center;
	}

	.dark-toggle-wrap {
		margin-left: 8px;
	}

	@media screen and (max-width: 992px) {
		.nav-center {
			display: none;
		}
		.nav-end {
			display: none;
		}
		.mobile-nav-wrap {
			display: inline-block;
		}
		.dark-mobile {
			flex: 1;
			text-align: right;
			display: inline-block;
		}
	}

	.mobile-content,
	.mobile-inner {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mobile-content :global(.button) {
		display: flex;
	}

	/* make every nav link a full-width list row inside the mobile menu */
	.mobile-content :global(.header-nav-link) {
		width: 100%;
		justify-content: flex-start;
		padding: 8px 10px;
		border-radius: 12px;
	}

	/* hide submenu link icon in the mobile menu */
	.mobile-content :global(.header-nav-link .icon-box),
	.mobile-content :global(.header-nav-link .start) {
		display: none;
	}

	.mobile-content :global(.header-nav-link.rich) {
		gap: 0;
	}

	.mobile-divider {
		height: 1px;
		background: var(--border);
		margin: 6px 4px;
	}

	:global(html) {
		scroll-padding-top: calc(var(--header-height) + 20px);
	}
</style>
