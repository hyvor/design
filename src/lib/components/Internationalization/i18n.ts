import { deepmerge } from "deepmerge-ts";
import { getContext } from "svelte";
import { writable } from "svelte/store";

export type i18nLoaderType = () => Promise<any>

interface Language {
    code: string,
    name: string,
    loader: i18nLoaderType,
    default: boolean
}

export class i18nService {
    
    private languages : Language[] = [];

    public DEFAULT_LOCALE = 'en';

    public locale = writable(this.DEFAULT_LOCALE);
    public strings = writable({});

    public stringsCache = new Map<string, Record<string, any>>();
    public defaultStrings: Record<string, any>;

    constructor(defaultStrings: Record<string, any>, languages: Record<string, i18nLoaderType>) {

        this.defaultStrings = defaultStrings;

        this.strings.set(defaultStrings);
        this.stringsCache.set(this.DEFAULT_LOCALE, defaultStrings);

        for (const code in languages) {
            this.register(
                code, 
                code, 
                languages[code],
                code === 'en'
            );
        }

    }

    setStrings(code: string) {
        const defaultStrings = this.defaultStrings;
        const strings = this.stringsCache.get(code) || {};

        const merged = deepmerge(defaultStrings, strings);
        this.strings.set(merged);
    }

    setLocale(code: string) {
        this.locale.set(code);

        if (this.stringsCache.has(code)) {
            this.setStrings(code);
        } else {
            this.languageByCode(code)?.loader().then(({default: strings}) => {
                this.stringsCache.set(code, strings);
                this.setStrings(code);
            })
        }
    }

    register(code: string, name: string, loader: i18nLoaderType, isDefault = false) {
        this.languages.push({
            code,
            name,
            loader,
            default: isDefault
        });
    }

    found(code: string) : boolean {
        return !!this.languageByCode(code)
    }

    languageByCode(code: string) : Language | undefined {
        return this.languages.find(l => l.code === code)
    }

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
