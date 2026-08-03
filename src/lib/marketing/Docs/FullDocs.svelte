<script lang="ts">
	import NavItem from './FullDocs/NavItem.svelte';
	import type { NavPageConfig, NavSectionConfig } from './types.js';

	interface Props {
		basepath: string;
		sections: NavSectionConfig[];
		page: NavPageConfig;
	}

	let { basepath = '/', sections, page }: Props = $props();
</script>

<div class="wrap">
	<nav class="hds-box">
		{#each sections as section}
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
