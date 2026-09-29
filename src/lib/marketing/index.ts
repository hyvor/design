export { default as Accordion } from './DetailsAccordion/DetailsAccordion.svelte';

// # Marketing pages

// ## Header
export { default as Header } from './Header/Header.svelte';
export { default as HeaderNavLink } from './Header/HeaderNavLink.svelte';
export { default as HeaderNavMenu } from './Header/HeaderNavMenu.svelte';
export { default as HeaderLanguageToggle } from './Header/HeaderLanguageToggle.svelte';
export { buildLocalizedUrl } from './Header/language.js';
export type { LanguageOption } from './Header/language.js';

// ## Other
export { default as Container } from './Container/Container.svelte';

// # Docs
export { default as Docs } from './Docs/Docs.svelte';
export { default as DocsImage } from './Docs/DocsImage.svelte';
export { loadDocsPage } from './Docs/fulldocs.js';
export type {
	NavSectionConfig,
	NavConfig,
	NavPageConfig,
	NavFoldingSectionConfig,
	NavSubSectionConfig
} from './Docs/types.js';
