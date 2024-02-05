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
    
    // private current : string;
    private languages : Language[] = [];

    public DEFAULT_LOCALE = 'en';

    public locale = writable(this.DEFAULT_LOCALE);
    public strings = writable({});

    public stringsCache = new Map<string, Record<string, any>>();

    constructor(defaultStrings: Record<string, any>, languages: Record<string, i18nLoaderType>) {

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

    setLocale(code: string) {
        this.locale.set(code);

        if (this.stringsCache.has(code)) {
            this.strings.set(this.stringsCache.get(code)!);
        }

        this.languageByCode(code)?.loader().then(strings => {
            this.stringsCache.set(code, strings);
            this.strings.set(strings);
        })
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

    getCurrent() {
        // return this.languageByCode(this.current);
    }

    /* async load(code: string) {
        return (await this.languageByCode(code)?.loader()).default;
    } */

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
