import ActionList from "./docs/ActionList.svelte";
import Avatar from "./docs/Avatar.svelte";
import Button from "./docs/Button.svelte";
import Callout from "./docs/Callout.svelte";
import Checkbox from "./docs/Checkbox.svelte";
import Dark from "./docs/Dark.svelte";
import Dropdown from "./docs/Dropdown.svelte";
import FormControl from "./docs/FormControl.svelte";
import IconButton from "./docs/IconButton.svelte";
import Index from "./docs/Index.svelte";
import Link from "./docs/Link.svelte";
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
    'action-list': ActionList,
    avatar: Avatar,
    button: Button,
    'icon-button': IconButton,
    table: Table,
    callout: Callout,
    checkbox: Checkbox,
    dropdown: Dropdown,
    switch: Switch,
    radio: Radio,
    "split-control": SplitControl,
    'form-control': FormControl,
    'text-input': TextInput,
    textarea: Textarea,
    loader: Loader,
    link: Link,
    tooltip: Tooltip,
    dark: Dark,
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