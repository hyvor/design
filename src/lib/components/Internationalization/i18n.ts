import { deepmerge } from 'deepmerge-ts';
import { writable, type Readable, type Writable, derived } from 'svelte/store';
import { t } from './t.js';
import T from './T.svelte';
import type { ToDotPaths, I18nStrings, PrimitiveType } from './types.js';

export type i18nLoaderType = () => Promise<Record<string, any>>;

export const LOCALE_LOCAL_STORAGE_KEY = 'hds-language';

interface LanguageBase {
	name: string;
	flag: string;
	code: string;
	default?: boolean;
}
interface LanguageWithStrings extends LanguageBase {
	strings: Record<string, any>;
}
interface LanguageWithLoader extends LanguageBase {
	loader: i18nLoaderType;
	strings: undefined | Record<string, any>;
}
export type Language = LanguageWithStrings | LanguageWithLoader;

export class InternationalizationService<StringsT extends I18nStrings = I18nStrings> {
	public languages: LanguageWithLoader[] = [];

	public locale: Writable<string>;
	public localeLanguage: Readable<LanguageWithLoader>;
	public strings = writable({});

	public stringsCache = new Map<string, Record<string, any>>();
	public defaultStrings: Record<string, any>;

	constructor(languages: Language[]) {
		const defaultLanguage = languages.find((l) => l.default);

		if (!defaultLanguage) {
			throw new Error('Default language not found');
		}

		const defaultStrings = (defaultLanguage as LanguageWithStrings).strings || null;

		if (!defaultStrings) {
			throw new Error('Default strings not found for the default language');
		}

		this.locale = writable(defaultLanguage.code);
		this.localeLanguage = derived(this.locale, ($locale) => this.languageByCode($locale)!);

		this.defaultStrings = defaultStrings;

		this.strings.set(this.defaultStrings);
		this.stringsCache.set(defaultLanguage.code, this.defaultStrings);

		for (const language of languages) {
			this.register(language);
		}

		const localeStorageLocale = this.getLocaleFromLocalStorage();
		const browserLocale = closestLanguageCode(navigator.language, this.languages);

		if (localeStorageLocale) {
			this.setLocale(localeStorageLocale);
		} else if (browserLocale) {
			this.setLocale(browserLocale);
		}
	}

	private getLocaleFromLocalStorage(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);
		}
		return null;
	}

	private setLocaleOnLocalStorage(code: string) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, code);
		}
	}

	setStrings(code: string) {
		const defaultStrings = this.defaultStrings;
		const strings = this.stringsCache.get(code) || {};

		const merged = deepmerge(defaultStrings, strings);
		this.strings.set(merged);
	}

	async setLocale(code: string) {

		if (this.stringsCache.has(code)) {
			this.setStrings(code);
			this.locale.set(code);
		} else {

			const language = this.languageByCode(code);

			if (!language) {
				throw new Error(`Language with code ${code} not found`);
			}

			let strings = language.strings;

			if (!strings) {
				strings = await language.loader();
			}

			this.stringsCache.set(code, strings);
			this.setStrings(code);
			this.locale.set(code);
		}

		this.setLocaleOnLocalStorage(code);
	}

	register(language: Language) {
		this.languages.push({
			...language,
			loader: language.hasOwnProperty('strings')
				? () => Promise.resolve((language as LanguageWithStrings).strings)
				: (language as LanguageWithLoader).loader
		});
	}

	found(code: string): boolean {
		return !!this.languageByCode(code);
	}

	languageByCode(code: string): LanguageWithLoader | undefined {
		return this.languages.find((l) => l.code === code);
	}

	t(key: ToDotPaths<StringsT>, params: Record<string, PrimitiveType> = {}) {
		return t(key, params, this);
	}

	public T: typeof T<StringsT> = T as any;
}

export function getStringByKey(messages: Record<string, any>, key: string) {
	const keys = key.split('.');
	let value = messages as any;

	for (const key of keys) {
		if (value && typeof value === 'object' && key in value) {
			value = value[key];
		} else {
			return undefined; // Key not found or value is not an object
		}
	}

	return value as string;
}


function closestLanguageCode(code: string, languages: Language[]): string | null {
	const language = languages.find((l) => l.code === code);

	if (language) {
		return language.code;
	}

	const codeLanguagePart = code.split('-')[0];

	for (const language of languages) {
		if (language.code.split('-')[0] === codeLanguagePart) {
			return language.code;
		}
	}

	return null;
}