type LoaderType = () => Promise<any>;

interface Language {
    code: string,
    name: string,
    loader: LoaderType,
    default: boolean
}

export class i18n {
    
    private current : string;
    private languages : Language[] = [];

    constructor(current: string) {
        this.current = current;
    }

    register(code: string, name: string, loader: LoaderType, isDefault = false) {
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
        return this.languageByCode(this.current);
    }

    async load(code: string) {
        return (await this.languageByCode(code)?.loader()).default;
    }

}