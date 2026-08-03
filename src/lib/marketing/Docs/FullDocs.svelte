<script lang="ts">
	import NavItem from './FullDocs/NavItem.svelte';
	import { getSubSectionPathForSlug, getFirstPageSlug } from './FullDocs/fulldocs.js';
	import type { NavPageConfig, NavSectionConfig } from './types.js';

	interface Props {
		basepath: string;
		sections: NavSectionConfig[];
		page: NavPageConfig;
	}

	let { basepath = '/', sections, page }: Props = $props();

	const subSectionPath = $derived(getSubSectionPathForSlug(sections, page.slug) ?? []);

	const currentSections = $derived(
		subSectionPath.length > 0 ? subSectionPath[subSectionPath.length - 1].sections : sections
	);
</script>

<div class="wrap">
	<nav class="hds-box">
		<div class="breadcrumb">
			<a class="breadcrumb-item" href={basepath + '/' + (getFirstPageSlug(sections) ?? '')}>
				Docs
			</a>
			{#each subSectionPath as sub}
				<span class="breadcrumb-sep"></span>
				<a
					class="breadcrumb-item"
					href={basepath + '/' + (getFirstPageSlug(sub.sections) ?? '')}
				>
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

	<div class="content-wrap hds-box">
		<content class:wide={page.wide}>
			<page.content />
		</content>
	</div>

	{#if !page.wide}
		<div class="sidebar hds-box">
			<!--  -->
		</div>
	{/if}
</div>

<style>
	.wrap {
		display: flex;
		padding: 15px;
		gap: 15px;
	}

	nav {
		width: 280px;
		height: calc(100vh - var(--header-height) - 30px);
		padding: 15px 0;
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
		padding: 10px 45px;
		min-width: 0;
	}

	content {
		display: block;
		margin: auto;
		width: 650px;
		max-width: 100%;
	}
	content.wide {
		width: 100%;
	}

	.sidebar {
		width: 200px;
		min-height: 100px;
		padding: 15px;
	}
</style>
