// Shared helpers for marketing sites that serve translated pages on their own
// URLs (e.g. a SvelteKit `[[lang]]` route param) rather than switching
// language client-side on one page. This is a different case from
// `InternationalizationService`/`LanguageToggle` in
// `$lib/components/Internationalization`, which swap translated strings in
// place on a single page; use that instead if you don't have per-language
// routes.

export interface LanguageOption {
	/** language/locale code, e.g. "en", "fr" */
	code: string;
	/** an emoji flag shown next to the name */
	flag: string;
	name: string;
}

/**
 * Rewrites `path` (the current pathname) from `currentLang` to `targetLang`,
 * for the common convention where the default language is served without a
 * prefix and every other language is served under `/{code}`.
 *
 * @example
 * buildLocalizedUrl('/pricing', 'en', 'fr', 'en') // '/fr/pricing'
 * buildLocalizedUrl('/fr/pricing', 'fr', 'en', 'en') // '/pricing'
 * buildLocalizedUrl('/fr', 'fr', 'en', 'en') // '/'
 */
export function buildLocalizedUrl(
	path: string,
	currentLang: string,
	targetLang: string,
	defaultLang: string
): string {
	let basePath = path;

	// strip the current language prefix, if any, to get the language-agnostic path
	if (currentLang !== defaultLang) {
		const prefix = `/${currentLang}`;
		if (basePath === prefix) {
			basePath = '/';
		} else if (basePath.startsWith(`${prefix}/`)) {
			basePath = basePath.slice(prefix.length);
		}
	}

	// the default language is served without a prefix
	if (targetLang === defaultLang) {
		return basePath;
	}

	return basePath === '/' ? `/${targetLang}` : `/${targetLang}${basePath}`;
}
