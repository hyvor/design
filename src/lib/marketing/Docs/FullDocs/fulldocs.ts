import { error } from '@sveltejs/kit';
import type { NavSectionConfig, NavConfig, NavPageConfig } from '../types.js';

// for docs, create a /docs/[[slug]]/+page.svelte and +page.ts files
// add this to +page.ts in the load function
// return loadDocsPage(sections, slug);
export function loadDocsPage(config: {
	basepath?: string;
	sections: NavSectionConfig[];
	slug: string;
}) {
	const { basepath = '/', sections, slug } = config;

	const page = getPageFromSections(sections, slug);

	if (!page) {
		error(404, `Page not found for slug: ${slug}`);
	}

	return {
		basepath,
		sections,
		slug,
		page
	};
}

export function getPageFromSections(sections: NavSectionConfig[], slug: string) {
	for (const section of sections) {
		const page = getPageFromNavs(section.navs, slug);
		if (page) {
			return page;
		}
	}
}

export function getPageFromNavs(navs: NavConfig[], slug: string): NavPageConfig | undefined {
	for (const nav of navs) {
		if (nav.type === 'page' && nav.slug === slug) {
			return nav;
		} else if (nav.type === 'folding-section') {
			const page = getPageFromNavs(nav.navs, slug);
			if (page) {
				return page;
			}
		} else if (nav.type === 'sub-section') {
			const page = getPageFromSections(nav.sections, slug);
			if (page) {
				return page;
			}
		}
	}
}
