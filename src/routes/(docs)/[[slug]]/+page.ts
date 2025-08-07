import ActionList from './docs/ActionList.svelte';
import Avatar from './docs/Avatar.svelte';
import Button from './docs/Button.svelte';
import Callout from './docs/Callout.svelte';
import Checkbox from './docs/Checkbox.svelte';
import Dark from './docs/Dark.svelte';
import Dropdown from './docs/Dropdown.svelte';
import FormControl from './docs/FormControl.svelte';
import IconButton from './docs/IconButton.svelte';
import Index from './docs/Index.svelte';
import Link from './docs/Link.svelte';
import Loader from './docs/Loader.svelte';
import Radio from './docs/Radio.svelte';
import PageStructure from './docs/PageStructure.svelte';
import SplitControl from './docs/SplitControl.svelte';
import Switch from './docs/Switch.svelte';
import Table from './docs/Table.svelte';
import TextInput from './docs/TextInput.svelte';
import Textarea from './docs/Textarea.svelte';
import Tooltip from './docs/Tooltip.svelte';
import CodeBlock from './docs/CodeBlock.svelte';
import Internationalization from './docs/Internationalization.svelte';
import NavLink from './docs/NavLink.svelte';
import Divider from './docs/Divider.svelte';
import Text from './docs/Text.svelte';
import Toast from './docs/Toast/Toast.svelte';
import Modal from './docs/Modal.svelte';
import Box from './docs/Box.svelte';
import Tag from './docs/Tag.svelte';
import TabNav from './docs/TabNav.svelte';
import ColorPicker from './docs/ColorPicker.svelte';
import IconMessage from './docs/IconMessage.svelte';
import DocsDocs from './docs/DocsDocs/DocsDocs.svelte';
import Slider from './docs/Slider.svelte';
import Document from './docs/Document/Document.svelte';
import { error } from '@sveltejs/kit';
import Usage from './docs/Usage.svelte';
import BoxShadowPicker from './docs/BoxShadowPicker.svelte';
import DetailCard from './docs/DetailCard.svelte';
import EmojiPicker from './docs/EmojiPicker.svelte';

export const prerender = true;

const nav = {
	index: Index,
	'action-list': ActionList,
	avatar: Avatar,
	button: Button,
	'box-shadow-picker': BoxShadowPicker,
	'color-picker': ColorPicker,
	'icon-button': IconButton,
	table: Table,
	callout: Callout,
	'code-block': CodeBlock,
	checkbox: Checkbox,
	'detail-card': DetailCard,
	dropdown: Dropdown,
	divider: Divider,
	'emoji-picker': EmojiPicker,
	switch: Switch,
	radio: Radio,
	'split-control': SplitControl,
	'form-control': FormControl,
	'text-input': TextInput,
	'tab-nav': TabNav,
	tag: Tag,
	text: Text,
	toast: Toast,
	'nav-link': NavLink,
	modal: Modal,
	textarea: Textarea,
	loader: Loader,
	link: Link,
	tooltip: Tooltip,
	dark: Dark,
	i18n: Internationalization,
	box: Box,
	slider: Slider,
	'icon-message': IconMessage,

	usage: Usage,
	'page-structure': PageStructure,
	docs: DocsDocs,
	document: Document
};

export async function load({ params }) {
	const slug = params.slug;
	const fileName = (slug || 'index') as keyof typeof nav;

	if (!nav[fileName]) {
		throw error(404, 'Not found');
	}

	return {
		slug: params.slug,
		content: nav[fileName]
	};
}
