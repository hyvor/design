import { error } from '@sveltejs/kit';
import type { NavSectionConfig, NavConfig, NavPageConfig, NavSubSectionConfig } from './types.js';

// for docs, create a /docs/[[slug]]/+page.svelte and +page.ts files
// add this to +page.ts in the load function
// return loadDocsPage(sections, slug);
export function loadDocsPage(config: {
	basepath?: string;
	rootName?: string;
	sections: NavSectionConfig[];
	slug: string;
}) {
	const { basepath = '/', rootName = 'Docs', sections, slug } = config;

	const page = getPageFromSections(sections, slug);

	if (!page) {
		error(404, `Page not found for slug: ${slug}`);
	}

	return {
		basepath,
		rootName,
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

// returns the chain of sub-sections that need to be opened to reach the page
// with the given slug, e.g. [subSectionA, subSectionB] means subSectionA is
// open, and within it, subSectionB is open. returns undefined if the slug
// isn't found under the given sections.
export function getSubSectionPathForSlug(
	sections: NavSectionConfig[],
	slug: string
): NavSubSectionConfig[] | undefined {
	for (const section of sections) {
		const path = getSubSectionPathForSlugInNavs(section.navs, slug);
		if (path) {
			return path;
		}
	}
}

function getSubSectionPathForSlugInNavs(
	navs: NavConfig[],
	slug: string
): NavSubSectionConfig[] | undefined {
	for (const nav of navs) {
		if (nav.type === 'page' && nav.slug === slug) {
			return [];
		} else if (nav.type === 'folding-section') {
			const path = getSubSectionPathForSlugInNavs(nav.navs, slug);
			if (path) {
				return path;
			}
		} else if (nav.type === 'sub-section') {
			const path = getSubSectionPathForSlug(nav.sections, slug);
			if (path) {
				return [nav, ...path];
			}
		}
	}
}

// returns the slug of the first page found (in traversal order) under the
// given sections. used to know where a sub-section link or breadcrumb item
// should navigate to.
export function getFirstPageSlug(sections: NavSectionConfig[]): string | undefined {
	for (const section of sections) {
		const slug = getFirstPageSlugInNavs(section.navs);
		if (slug !== undefined) {
			return slug;
		}
	}
}

function getFirstPageSlugInNavs(navs: NavConfig[]): string | undefined {
	for (const nav of navs) {
		if (nav.type === 'page') {
			return nav.slug;
		} else if (nav.type === 'folding-section') {
			const slug = getFirstPageSlugInNavs(nav.navs);
			if (slug !== undefined) {
				return slug;
			}
		} else if (nav.type === 'sub-section') {
			const slug = getFirstPageSlug(nav.sections);
			if (slug !== undefined) {
				return slug;
			}
		}
	}
}

export function getDocsHref(basepath: string, slug: string | undefined): string {
	return slug ? basepath + '/' + slug : basepath || '/';
}

export interface DocsBreadcrumb {
	name: string;
	href: string;
}

/**
 * Breadcrumb trail of a docs page: root, sub-sections, and the page itself.
 * Useful for BreadcrumbList structured data.
 */
export function getDocsBreadcrumbs(data: {
	basepath: string;
	rootName: string;
	sections: NavSectionConfig[];
	page: NavPageConfig;
}): DocsBreadcrumb[] {
	const { basepath, rootName, sections, page } = data;

	const crumbs: DocsBreadcrumb[] = [
		{ name: rootName, href: getDocsHref(basepath, getFirstPageSlug(sections)) }
	];

	for (const sub of getSubSectionPathForSlug(sections, page.slug) ?? []) {
		crumbs.push({ name: sub.name, href: getDocsHref(basepath, getFirstPageSlug(sub.sections)) });
	}

	crumbs.push({ name: page.name, href: getDocsHref(basepath, page.slug) });

	// the first page of a section links to the section itself, so drop duplicates
	return crumbs.filter((crumb, i) => crumbs.findIndex((c) => c.href === crumb.href) === i);
}
