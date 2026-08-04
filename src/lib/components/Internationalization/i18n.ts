import { deepmerge } from 'deepmerge-ts';
import { writable, type Readable, type Writable, derived, get } from 'svelte/store';
import { t } from './t.js';
import T from './T.svelte';
import type { ToDotPaths, I18nStrings, PrimitiveType } from './types.js';

export type i18nLoaderType = () => Promise<Record<string, any>>;

export const LOCALE_LOCAL_STORAGE_KEY = 'hds-language';

export type LocalePersister = (code: string) => void | Promise<void>;

export type I18nDeployment = 'cloud' | 'on-prem';

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
	strings?: Record<string, any>;
}
export type Language = LanguageWithStrings | LanguageWithLoader;

export class InternationalizationService<StringsT extends I18nStrings = I18nStrings> {
	public languages: LanguageWithLoader[] = [];

	public locale: Writable<string>;
	public localeLanguage: Readable<LanguageWithLoader>;
	public strings = writable({});

	public stringsCache = new Map<string, Record<string, any>>();
	public defaultStrings: Record<string, any>;

	public deployment: I18nDeployment;
	private persister: LocalePersister | null = null;

	constructor(
		languages: Language[],
		forceLanguage?: string,
		deployment: I18nDeployment = 'on-prem'
	) {
		this.deployment = deployment;

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

		/**
		 * Resolution order:
		 *   cloud    forceLanguage (the user's saved language) -> navigator -> default
		 *   on-prem  localStorage -> navigator -> default
		 */
		const storedLocale =
			deployment === 'on-prem' ? InternationalizationService.getLocaleFromLocalStorage() : null;
		const browserLocale = typeof navigator !== 'undefined' ? navigator.language : null;

		const requested = forceLanguage ?? storedLocale ?? browserLocale;
		const resolved = requested
			? InternationalizationService.getClosestLanguageCode(
					requested,
					this.languages.map((l) => l.code)
				)
			: null;

		if (resolved) {
			void this.applyLocale(resolved);
		}
	}

	setPersister(persister: LocalePersister) {
		this.persister = persister;
	}

	private async persist(code: string) {
		if (this.persister) {
			await this.persister(code);
			return;
		}

		if (this.deployment === 'on-prem') {
			this.setLocaleOnLocalStorage(code);
		}
	}

	static getLocaleFromLocalStorage(): string | null {
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

	private async applyLocale(code: string) {
		if (this.stringsCache.has(code)) {
			this.setStrings(code);
			this.locale.set(code);
			return;
		}

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

	async setLocale(code: string) {
		await this.applyLocale(code);
		await this.persist(code);
	}

	getLocale(): string {
		return get(this.locale);
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

	static getClosestLanguageCode(code: string, availableCodes: string[]): string | null {
		if (availableCodes.includes(code)) {
			return code;
		}

		const codeLanguagePart = code.split('-')[0];

		for (const availableCode of availableCodes) {
			if (availableCode.split('-')[0] === codeLanguagePart) {
				return availableCode;
			}
		}

		return null;
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
