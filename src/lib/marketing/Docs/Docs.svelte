<script lang="ts">
	import NavItem from './NavItem.svelte';
	import Sidebar from './Sidebar/Sidebar.svelte';
	import { getSubSectionPathForSlug, getFirstPageSlug } from './fulldocs.js';
	import type { NavPageConfig, NavSectionConfig } from './types.js';
	import { clickOutside } from '../../components/index.js';
	import IconList from '@hyvor/icons/IconList';

	interface Props {
		basepath: string;
		rootName?: string;
		sections: NavSectionConfig[];
		page: NavPageConfig;
	}

	let { basepath = '/', rootName = 'Docs', sections, page }: Props = $props();

	const subSectionPath = $derived(getSubSectionPathForSlug(sections, page.slug) ?? []);

	const currentSections = $derived(
		subSectionPath.length > 0 ? subSectionPath[subSectionPath.length - 1].sections : sections
	);

	// mobile nav is collapsed behind a toggle button; close it whenever the
	// active page changes (e.g. after clicking a nav link on mobile)
	let mobileNavOpen = $state(false);
	$effect(() => {
		void page.slug;
		mobileNavOpen = false;
	});

	let contentEl: HTMLElement | undefined = $state();

	// adds a clickable anchor link to each heading that has an id, so
	// readers can link directly to a section of the page
	function linkifyHeadings() {
		if (!contentEl) return;

		const headings = contentEl.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]');
		for (const h of headings) {
			if (h.querySelector(':scope > a.heading-anchor')) continue;

			const id = h.getAttribute('id');
			const link = document.createElement('a');
			link.className = 'heading-anchor';
			link.setAttribute('href', '#' + id);
			link.append(...h.childNodes);

			const icon = document.createElement('a');
			icon.className = 'heading-anchor-link';
			icon.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>';
			icon.tabIndex = -1;

			h.replaceChildren(link, icon);
		}
	}

	$effect(() => {
		void page.slug;
		linkifyHeadings();
	});
</script>

<div class="wrap docs">
	<div class="nav-wrap">
		<button
			class="mobile-toggle hds-box"
			class:open={mobileNavOpen}
			onclick={(e) => {
				e.stopPropagation();
				mobileNavOpen = !mobileNavOpen;
			}}
		>
			<div class="mobile-toggle-label">
				{#if subSectionPath.length > 0}
					<span class="category">{subSectionPath[subSectionPath.length - 1].name}</span>
					<span class="sep">&raquo;</span>
				{/if}
				<span class="name">{page.name}</span>
			</div>
			<span class="mobile-toggle-icon">
				<IconList size={18} />
			</span>
		</button>

		<nav
			class="hds-box"
			class:open={mobileNavOpen}
			use:clickOutside={{ callback: () => (mobileNavOpen = false) }}
		>
			<div class="breadcrumb">
				<a class="breadcrumb-item" href={basepath + '/' + (getFirstPageSlug(sections) ?? '')}>
					{rootName}
				</a>
				{#each subSectionPath as sub}
					<span class="breadcrumb-sep"></span>
					<a class="breadcrumb-item" href={basepath + '/' + (getFirstPageSlug(sub.sections) ?? '')}>
						{sub.name}
					</a>
				{/each}
			</div>

			{#each currentSections as section}
				<div class="section">
					{#if section.name}
						<div class="section-name">
							{section.name}
						</div>
					{/if}

					{#each section.navs as nav}
						<NavItem {nav} {basepath} currentSlug={page.slug} />
					{/each}
				</div>
			{/each}
		</nav>
	</div>

	<div class="content-wrap hds-box">
		{#key page.slug}
			<content class:wide={page.wide} bind:this={contentEl}>
				<page.content />
			</content>
		{/key}
	</div>

	{#if !page.wide}
		<Sidebar />
	{/if}
</div>

<style>
	.wrap {
		display: flex;
		padding: 15px;
		gap: 15px;
	}

	.nav-wrap {
		flex-shrink: 0;
		height: calc(100vh - var(--header-height) - 30px);
		position: sticky;
		top: calc(var(--header-height, 0) + 15px);
	}

	.mobile-toggle {
		display: none;
	}

	nav {
		width: 280px;
		height: 100%;
		padding: 15px 0;
		overflow-y: auto;
		flex-shrink: 0;
	}

	@media (max-width: 992px) {
		.wrap {
			flex-direction: column;
			width: 100%;
			padding: 15px 0;
		}

		.nav-wrap {
			width: 100%;
			padding: 0 15px;
			order: 1;
			height: auto;
			position: static;
			top: auto;
		}

		.content-wrap {
			order: 2;
		}

		.mobile-toggle {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 10px 20px;
			cursor: pointer;
			transition: 0.15s background-color ease;
		}
		.mobile-toggle:hover {
			background-color: var(--hover);
		}

		.mobile-toggle-label {
			flex: 1;
			text-align: left;
		}

		.mobile-toggle-icon {
			display: inline-flex;
			transition: 0.2s transform ease;
		}
		.mobile-toggle.open .mobile-toggle-icon {
			transform: rotate(90deg);
		}
		.category,
		.sep {
			color: var(--text-light);
		}
		.sep {
			margin: 0 4px;
		}

		nav {
			display: none;
			position: absolute;
			width: calc(100% - 30px);
			height: auto;
			max-height: 500px;
			margin-top: 8px;
			padding: 15px 0;
			z-index: 100;
		}
		nav.open {
			display: block;
			animation: nav-open 0.2s ease-out;
		}
	}

	@keyframes nav-open {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0 25px 12px;
		font-size: 13px;
	}

	.breadcrumb-item {
		color: var(--text-light);
	}

	.breadcrumb-item:last-child {
		color: inherit;
		font-weight: 600;
	}

	.breadcrumb-item:not(:last-child):hover {
		text-decoration: underline;
	}

	.breadcrumb-sep {
		color: var(--text-light);
		position: relative;
		width: 4px;
	}

	.breadcrumb-sep::before {
		content: '';
		width: 4px;
		height: 4px;
		border-right: 1px solid var(--text-light);
		border-bottom: 1px solid var(--text-light);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -40%) rotate(-45deg);
		margin-left: -1px;
		opacity: 0.5;
	}

	.section-name {
		font-weight: 600;
		padding: 0 25px;
		margin-top: 20px;
		margin-bottom: 8px;
		font-size: 14px;
	}

	.content-wrap {
		flex: 1;
		padding: 30px 45px;
		min-width: 0;
		background-image: radial-gradient(
			ellipse 700px 300px at top right,
			var(--accent-lightest),
			transparent 70%
		);
	}

	content {
		display: block;
		margin: auto;
		width: 650px;
		max-width: 100%;
		animation: content-in 0.35s ease;
	}
	content.wide {
		width: 100%;
	}

	@keyframes content-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* content styles */

	content :global(p),
	content :global(li) {
		line-height: var(--line-height-content);
	}

	content :global(h1:first-child) {
		margin-top: 0;
		font-size: 36px;
		font-weight: 600;
		letter-spacing: -0.03em;
		margin: 0 0 30px;
		position: relative;
		display: table;
		font-family: var(--font-serif);
		&:after {
			position: absolute;
			content: '';
			bottom: -13px;
			left: 0px;
			width: 30%;
			height: 3px;
			border-radius: 2px;
			background: var(--accent);
			margin-top: 10px;
		}
	}
	content :global(a:not(.no-link-color a)) {
		color: var(--link);
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--link) 40%, transparent);
		transition: 0.15s text-decoration-color ease;
	}
	content :global(a:not(.no-link-color a):hover) {
		text-decoration-color: var(--link);
	}
	content :global(p) {
		margin: 0 0 16px;
	}
	content :global(li) {
		margin-bottom: 8px;
	}

	content :global(ul) {
		margin-top: 8px;
	}

	content :global(.table) {
		margin: 20px 0;
	}

	content :global(code:not(pre code)) {
		font-size: 14px;
		padding: 0.2em 0.4em;
		display: inline-block;
		background-color: #f4f2f0;
		color: #905;
		font-family: inherit;
		border-radius: 4px;
		line-height: normal;
		font-weight: 400;
	}
	:global(:root.dark) content :global(code:not(pre code)) {
		background-color: #282c34;
		color: #e06c75;
	}

	content :global(a.heading-anchor-link) {
		position: absolute;
		right: 100%;
		margin-right: 7px;
		opacity: 0;
		top: 50%;
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		color: var(--accent-light);
		transition: 0.15s opacity ease;
	}

	content {
		:global(h1),
		:global(h2),
		:global(h3),
		:global(h4),
		:global(h5),
		:global(h6) {
			position: relative;
			margin: 20px 0;
		}

		:global(h1) {
			font-size: 2em;
		}
		:global(h2) {
			font-size: 1.5em;
		}
		:global(h3) {
			font-size: 1.3em;
		}
		:global(h4) {
			font-size: 1.2em;
		}
		:global(h5) {
			font-size: 1.1em;
		}
		:global(h6) {
			font-size: 1em;
		}
	}

	content {
		:global(.heading-anchor:hover + .heading-anchor-link) {
			opacity: 1;
		}

		:global(h2 a:not(.heading-anchor-link)),
		:global(h3 a:not(.heading-anchor-link)),
		:global(h4 a:not(.heading-anchor-link)),
		:global(h5 a:not(.heading-anchor-link)),
		:global(h6 a:not(.heading-anchor-link)) {
			text-decoration: none;
			color: inherit;
		}
	}
</style>
