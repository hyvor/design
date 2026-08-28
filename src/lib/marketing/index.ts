export { default as Accordion } from './DetailsAccordion/DetailsAccordion.svelte';

// # Marketing pages

// ## Header
export { default as Header } from './Header/Header.svelte';
export { default as HeaderNavLink } from './Header/HeaderNavLink.svelte';
export { default as HeaderLanguageToggle } from './Header/HeaderLanguageToggle.svelte';
export { buildLocalizedUrl } from './Header/language.js';
export type { LanguageOption } from './Header/language.js';

// ## Footer
export { default as Footer } from './Footer/Footer.svelte';
export { default as FooterLinkList } from './Footer/FooterLinkList.svelte';

// ## Landing Page
export { default as Hero } from './Hero/Hero.svelte';
export { default as FeatureSplit } from './FeatureSplit/FeatureSplit.svelte';
export { default as Testimonials } from './Testimonials/Testimonials.svelte';
export { default as FullTrialSignup } from './FullTrialSignup/FullTrialSignup.svelte';
export { default as SpotlightSplit } from './SpotlightSplit/SpotlightSplit.svelte';
export { default as LogoStrip } from './LogoStrip/LogoStrip.svelte';
export { default as FAQ } from './FAQ/FAQ.svelte';
export { default as AllFeaturesAccordion } from './AllFeaturesAccordion/AllFeaturesAccordion.svelte';
export { default as AllFeaturesAccordionFeature } from './AllFeaturesAccordion/AllFeaturesAccordionFeature.svelte';

// ## Seals
export { default as Seal } from './Seal/Seal.svelte';
export { default as GdprSeal } from './Seal/GdprSeal.svelte';
export { default as CcpaSeal } from './Seal/CcpaSeal.svelte';
export { default as SsoSeal } from './Seal/SsoSeal.svelte';
export { default as IsoSeal } from './Seal/IsoSeal.svelte';

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

export { default as Document } from './Document/Document.svelte';
