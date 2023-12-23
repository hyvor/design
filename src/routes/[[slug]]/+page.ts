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
import PageStructure from "./docs/PageStructure.svelte";
import SplitControl from "./docs/SplitControl.svelte";
import Switch from "./docs/Switch.svelte";
import Table from "./docs/Table.svelte";
import TextInput from "./docs/TextInput.svelte";
import Textarea from "./docs/Textarea.svelte";
import Tooltip from "./docs/Tooltip.svelte";
import CodeBlock from "./docs/CodeBlock.svelte";
import Internationalization from "./docs/Internationalization.svelte";
import NavLink from "./docs/NavLink.svelte";
import Divider from "./docs/Divider.svelte";
import Text from "./docs/Text.svelte";
import Toast from "./docs/Toast/Toast.svelte";
import Modal from "./docs/Modal.svelte";
import Box from "./docs/Box.svelte";
import Tag from "./docs/Tag.svelte";

export const prerender = true;

const nav = {
    index: Index,
    'action-list': ActionList,
    avatar: Avatar,
    button: Button,
    'icon-button': IconButton,
    table: Table,
    callout: Callout,
    'code-block': CodeBlock,
    checkbox: Checkbox,
    dropdown: Dropdown,
    divider: Divider,
    switch: Switch,
    radio: Radio,
    "split-control": SplitControl,
    'form-control': FormControl,
    'text-input': TextInput,
    tag: Tag,
    text: Text,
    toast: Toast,
    "nav-link": NavLink,
    modal: Modal,
    textarea: Textarea,
    loader: Loader,
    link: Link,
    tooltip: Tooltip,
    dark: Dark,
    i18n: Internationalization,
    box: Box,

    'page-structure': PageStructure,
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