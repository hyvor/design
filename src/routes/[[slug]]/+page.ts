import Button from "./docs/Button.svelte";
import Index from "./docs/Index.svelte";

export const prerender = true;

const nav = {
    index: Index,
    button: Button
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