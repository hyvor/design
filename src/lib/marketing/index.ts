export { default as Accordion } from './DetailsAccordion/DetailsAccordion.svelte';

export { default as Header } from './Header/Header.svelte';

export { default as Container } from './Container/Container.svelte';

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

export { default as Footer } from './Footer/Footer.svelte';
export { default as FooterLinkList } from './Footer/FooterLinkList.svelte';

export { default as Document } from './Document/Document.svelte';
