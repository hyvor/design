export interface LanguageOption {
	code: string; // e.g. "fr"
	flag: string; // e.g. "🇫🇷"
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
