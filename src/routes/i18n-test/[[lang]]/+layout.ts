import { error } from '@sveltejs/kit';

export async function load({params}) {

    const langName = params.lang || 'en-US';

    const l = new Loader();
    l.register('en-US', 'English (United States)', () => import('./translations/en-US.json'), true);
    l.register('fr-FR', 'Française (France)', () => import('./translations/fr-FR.json'));

    if (!l.found(langName)) {
        throw error(404);
    }

    const lang = await l.get(langName);

    return {
        lang
    }

}

class Loader {

    private loaders = {} as Record<string, () => Promise<any>>

    register(code: string, name: string, loader: () => Promise<any>, isDefault = false) {
        this.loaders[code] = loader;
    }

    found(code: string) : boolean {
        return !!this.loaders[code];
    }

    async get(code: string) {
        return (await this.loaders[code]()).default;
    }

}