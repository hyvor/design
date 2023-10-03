import Button from "./docs/Button.svelte";
import Callout from "./docs/Callout.svelte";
import Index from "./docs/Index.svelte";
import Loader from "./docs/Loader.svelte";
import SplitControl from "./docs/SplitControl.svelte";
import Table from "./docs/Table.svelte";
import TextInput from "./docs/TextInput.svelte";

export const prerender = true;

const nav = {
    index: Index,
    button: Button,
    table: Table,
    callout: Callout,
    "split-control": SplitControl,
    'text-input': TextInput,
    loader: Loader
}

export async function load({ params }) {

    const slug = params.slug;
    const fileName = (slug || 'index') as keyof typeof nav;

    /* if (!nav[fileName]) {
        throw error(404, 'Not found');
    } */

    return {
        slug: params.slug,
        content: nav[fileName],
    }
}