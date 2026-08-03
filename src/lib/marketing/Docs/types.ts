import type { Component } from 'svelte';

export interface NavSectionConfig {
	// name / title of the section
	// undefined for the root section (no title will be shown)
	name?: string;
	navs: NavConfig[];
}

export type NavConfig = NavPageConfig | NavFoldingSectionConfig | NavSubSectionConfig;

export interface NavPageConfig {
	type: 'page';
	name: string;
	slug: string;
	content: Component;
	// when true, the page content takes the full width of the content area
	// (no fixed reading-width column, no right sidebar) - useful for API references
	wide?: boolean;
}

export interface NavFoldingSectionConfig {
	type: 'folding-section';
	name: string;
	navs: NavConfig[];
}

export interface NavSubSectionConfig {
	type: 'sub-section';
	name: string;
	sections: NavSectionConfig[];
}
