export { default as Accordion } from './DetailsAccordion/DetailsAccordion.svelte';

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
