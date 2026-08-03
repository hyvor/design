<script lang="ts">
	import type { NavConfig } from '../types.js';
	import { getFirstPageSlug } from './fulldocs.js';
	import IconCaretRight from '@hyvor/icons/IconCaretRight';
	import IconArrowRight from '@hyvor/icons/IconArrowRight';
	import NavItem from './NavItem.svelte';

	interface Props {
		basepath: string;
		nav: NavConfig;
		currentSlug: string;
	}

	let { nav, basepath, currentSlug }: Props = $props();

	let foldingOpen = $state(false);

	const href = $derived.by(() => {
		if (nav.type === 'page') {
			return basepath + '/' + nav.slug;
		} else if (nav.type === 'sub-section') {
			return basepath + '/' + (getFirstPageSlug(nav.sections) ?? '');
		}
	});
</script>

{#if nav.type === 'folding-section'}
	<button class="nav-item" onclick={() => (foldingOpen = !foldingOpen)}>
		<div class="nav-name">{nav.name}</div>
		<span class="nav-icon folding-icon" class:open={foldingOpen}>
			<IconCaretRight size={10} />
		</span>
	</button>
	<div class="folded-content" class:open={foldingOpen}>
		{#each nav.navs as innerNav}
			<NavItem nav={innerNav} {basepath} {currentSlug} />
		{/each}
	</div>
{:else if nav.type === 'sub-section'}
	<a {href} class="nav-item">
		<div class="nav-name">{nav.name}</div>
		<span class="nav-icon">
			<IconArrowRight size={10} />
		</span>
	</a>
{:else}
	<a {href} class="nav-item" class:active={nav.type === 'page' && nav.slug === currentSlug}>
		<div class="nav-name">{nav.name}</div>
	</a>
{/if}

<style>
	.nav-item {
		display: flex;
		align-items: center;
		padding: 8px 22px;
		font-size: 14px;
		border-left: 3px solid transparent;
		transition: 0.1s background-color ease;
		width: 100%;
		text-align: initial;
	}

	.nav-item.active {
		border-left: 3px solid var(--accent);
		background-color: var(--accent-lightest);
	}

	.nav-item:not(.active):hover {
		background-color: var(--hover);
	}

	.nav-name {
		flex: 1;
	}

	.folding-icon {
		transition: 0.2s transform ease;
	}
	.folding-icon.open {
		transform: rotate(90deg);
	}

	.folded-content {
		display: none;
		padding-left: 14px;
	}
	.folded-content.open {
		display: block;
	}

	.folded-content::after {
		content: '';
		display: block;
	}
</style>
