import ActionList from './docs/ActionList.svelte';
import Avatar from './docs/Avatar.svelte';
import Button from './docs/Button.svelte';
import ButtonGroup from './docs/ButtonGroup.svelte';
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
// import Internationalization from './docs/Internationalization.svelte';
import Internationalization from './docs/i18n/i18n.md';
import I18nAI from './docs/i18n/i18n-ai.md';
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
import Kbd from './docs/Kbd.svelte';
import DocsDocs from './docs/DocsDocs/DocsDocs.svelte';
import Slider from './docs/Slider.svelte';
import ConsoleLoader from './docs/ConsoleLoader.svelte';
import Document from './docs/Document/Document.svelte';
import Usage from './docs/Usage.svelte';
import BoxShadowPicker from './docs/BoxShadowPicker.svelte';
import DetailCard from './docs/DetailCard.svelte';
import EmojiPicker from './docs/EmojiPicker.svelte';
import FileUploader from './docs/FileUploader.svelte';
import Accordion from './docs/Accordion.svelte';
import CloudContextDoc from './cloud/CloudContextDoc.svelte';
import Select from './docs/Select.svelte';
import TernaryStatus from './docs/TernaryStatus.svelte';
import HeaderDoc from './docs/Header.svelte';
import FooterDoc from './docs/Footer.svelte';
import LandingPageComponents from './docs/LandingPageComponents.svelte';
import DetailsAccordionDoc from './docs/DetailsAccordion.svelte';
import Confetti from './docs/Confetti.svelte';
import { loadDocsPage } from '$lib/marketing/Docs/fulldocs.js';
import type { NavSectionConfig } from '$lib/marketing/Docs/types.js';
import type { Component } from 'svelte';
import MarkdownDoc from './docs/markdown.md';

export const prerender = true;

const COMPONENTS: { slug: string; name: string; content: Component }[] = [
	{ slug: 'action-list', name: 'Action List', content: ActionList },
	{ slug: 'avatar', name: 'Avatar', content: Avatar },
	{ slug: 'button', name: 'Button', content: Button },
	{ slug: 'button-group', name: 'Button Group', content: ButtonGroup },
	{ slug: 'box', name: 'Box', content: Box },
	{ slug: 'box-shadow-picker', name: 'Box Shadow Picker', content: BoxShadowPicker },
	{ slug: 'color-picker', name: 'Color Picker', content: ColorPicker },
	{ slug: 'icon-button', name: 'Icon Button', content: IconButton },
	{ slug: 'callout', name: 'Callout', content: Callout },
	{ slug: 'code-block', name: 'Code Block', content: CodeBlock },
	{ slug: 'confetti', name: 'Confetti', content: Confetti },
	{ slug: 'checkbox', name: 'Checkbox', content: Checkbox },
	{ slug: 'detail-card', name: 'Detail Card', content: DetailCard },
	{ slug: 'divider', name: 'Divider', content: Divider },
	{ slug: 'dropdown', name: 'Dropdown', content: Dropdown },
	{ slug: 'file-uploader', name: 'File Uploader', content: FileUploader },
	{ slug: 'emoji-picker', name: 'Emoji Picker', content: EmojiPicker },
	{ slug: 'nav-link', name: 'Nav Link', content: NavLink },
	{ slug: 'radio', name: 'Radio', content: Radio },
	{ slug: 'switch', name: 'Switch', content: Switch },
	{ slug: 'textarea', name: 'Textarea', content: Textarea },
	{ slug: 'tab-nav', name: 'Tab Nav', content: TabNav },
	{ slug: 'table', name: 'Table', content: Table },
	{ slug: 'text', name: 'Text', content: Text },
	{ slug: 'text-input', name: 'Text Input', content: TextInput },
	{ slug: 'form-control', name: 'Form Control', content: FormControl },
	{ slug: 'split-control', name: 'Split Control', content: SplitControl },
	{ slug: 'loader', name: 'Loader', content: Loader },
	{ slug: 'link', name: 'Link', content: Link },
	{ slug: 'tag', name: 'Tag', content: Tag },
	{ slug: 'tooltip', name: 'Tooltip', content: Tooltip },
	{ slug: 'toast', name: 'Toast', content: Toast },
	{ slug: 'usage', name: 'Usage', content: Usage },
	{ slug: 'modal', name: 'Modal', content: Modal },
	{ slug: 'icon-message', name: 'Icon Message', content: IconMessage },
	{ slug: 'kbd', name: 'Kbd', content: Kbd },
	{ slug: 'slider', name: 'Slider', content: Slider },
	{ slug: 'accordion', name: 'Accordion', content: Accordion },
	{ slug: 'select', name: 'Select', content: Select },
	{ slug: 'console-loader', name: 'Console Loader', content: ConsoleLoader },
	{ slug: 'ternary-status', name: 'Ternary Status', content: TernaryStatus }
].sort((a, b) => a.name.localeCompare(b.name));

const SECTIONS: NavSectionConfig[] = [
	{
		navs: [
			{ type: 'page', name: 'Overview', slug: '', content: Index },
			{ type: 'page', name: 'Dark Mode', slug: 'dark', content: Dark },
			{
				type: 'sub-section',
				name: 'i18n',
				sections: [
					{
						name: '',
						navs: [
							{
								type: 'page',
								name: 'Internationalization',
								slug: 'i18n',
								content: Internationalization
							},
							{
								type: 'page',
								name: 'AI Translations',
								slug: 'i18n-ai',
								content: I18nAI
							}
						]
					}
				]
			},
			{ type: 'page', name: 'Markdown', slug: 'markdown', content: MarkdownDoc }
		]
	},
	{
		name: 'Components',
		navs: COMPONENTS.map((component) => ({
			type: 'page',
			name: component.name,
			slug: component.slug,
			content: component.content
		}))
	},
	{
		name: 'Cloud',
		navs: [{ type: 'page', name: 'Cloud Context', slug: 'cloud-context', content: CloudContextDoc }]
	},
	{
		name: 'Marketing',
		navs: [
			{
				type: 'page',
				name: 'Page Structure',
				slug: 'page-structure',
				content: PageStructure
			},
			{ type: 'page', name: 'Header', slug: 'header', content: HeaderDoc },
			{ type: 'page', name: 'Footer', slug: 'footer', content: FooterDoc },
			{
				type: 'page',
				name: 'Homepage Components',
				slug: 'homepage-components',
				content: LandingPageComponents
			},
			{ type: 'page', name: 'Docs', slug: 'docs', content: DocsDocs },
			{ type: 'page', name: 'Document', slug: 'document', content: Document },
			{
				type: 'page',
				name: 'Details Accordion',
				slug: 'details-accordion',
				content: DetailsAccordionDoc
			}
		]
	}
];

export async function load({ params }) {
	return loadDocsPage({
		basepath: '',
		sections: SECTIONS,
		slug: params.slug ?? '',
		rootName: 'Design System'
	});
}
