import Button from "./docs/Button.svelte";
import Callout from "./docs/Callout.svelte";
import Checkbox from "./docs/Checkbox.svelte";
import FormControl from "./docs/FormControl.svelte";
import Index from "./docs/Index.svelte";
import Loader from "./docs/Loader.svelte";
import Radio from "./docs/Radio.svelte";
import SplitControl from "./docs/SplitControl.svelte";
import Switch from "./docs/Switch.svelte";
import Table from "./docs/Table.svelte";
import TextInput from "./docs/TextInput.svelte";
import Textarea from "./docs/Textarea.svelte";
import Tooltip from "./docs/Tooltip.svelte";

export const prerender = true;

const nav = {
    index: Index,
    button: Button,
    table: Table,
    callout: Callout,
    checkbox: Checkbox,
    switch: Switch,
    radio: Radio,
    "split-control": SplitControl,
    'form-control': FormControl,
    'text-input': TextInput,
    textarea: Textarea,
    loader: Loader,
    tooltip: Tooltip
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