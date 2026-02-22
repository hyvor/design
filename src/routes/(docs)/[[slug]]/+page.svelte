<script lang="ts">
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import NavItem from '$lib/marketing/Docs/Nav/NavItem.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import Content from '$lib/marketing/Docs/Content/Content.svelte';
	import Docs from '$lib/marketing/Docs/Docs.svelte';
	import Nav from '$lib/marketing/Docs/Nav/Nav.svelte';
	import NavCategory from '$lib/marketing/Docs/Nav/NavCategory.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const components = [
		{ href: '/action-list', label: 'Action List' },
		{ href: '/avatar', label: 'Avatar' },
		{ href: '/button', label: 'Button' },
		{ href: '/box', label: 'Box' },
		{ href: '/box-shadow-picker', label: 'Box Shadow Picker' },
		{ href: '/color-picker', label: 'Color Picker' },
		{ href: '/icon-button', label: 'Icon Button' },
		{ href: '/callout', label: 'Callout' },
		{ href: '/code-block', label: 'Code Block' },
		{ href: '/checkbox', label: 'Checkbox' },
		{ href: '/detail-card', label: 'Detail Card' },
		{ href: '/divider', label: 'Divider' },
		{ href: '/dropdown', label: 'Dropdown' },
		{ href: '/file-uploader', label: 'File Uploader' },
		{ href: '/emoji-picker', label: 'Emoji Picker' },
		{ href: '/nav-link', label: 'Nav Link' },
		{ href: '/radio', label: 'Radio' },
		{ href: '/switch', label: 'Switch' },
		{ href: '/textarea', label: 'Textarea' },
		{ href: '/tab-nav', label: 'Tab Nav' },
		{ href: '/table', label: 'Table' },
		{ href: '/text', label: 'Text' },
		{ href: '/text-input', label: 'Text Input' },
		{ href: '/form-control', label: 'Form Control' },
		{ href: '/split-control', label: 'Split Control' },
		{ href: '/loader', label: 'Loader' },
		{ href: '/link', label: 'Link' },
		{ href: '/tag', label: 'Tag' },
		{ href: '/tooltip', label: 'Tooltip' },
		{ href: '/toast', label: 'Toast' },
		{ href: '/usage', label: 'Usage' },
		{ href: '/modal', label: 'Modal' },
		{ href: '/icon-message', label: 'Icon Message' },
		{ href: '/slider', label: 'Slider' },
		{ href: '/accordion', label: 'Accordion' },
		{ href: '/select', label: 'Select' }
	];

	const sortedComponents = components.sort((a, b) => a.label.localeCompare(b.label));

	let { data } = $props();

	let title = $state('Hyvor Design System');

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			const h1 = document.querySelector('h1');
			if (h1 && h1.textContent) {
				title = h1.textContent + ' - HDS';
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Header product="core" name="HYVOR" subName="Design System">
	{#snippet end()}
		<Button size="small" as="a" href="https://hyvor.com" variant="invisible">HYVOR</Button>
		<Button as="a" size="small" href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}
				<IconGithub size={14} />
			{/snippet}
			Github {#snippet end()}
				<IconBoxArrowUpRight size={11} />
			{/snippet}
		</Button>
	{/snippet}
</Header>

<Docs>
	{#snippet nav()}
		<Nav>
			<NavCategory name="Design System">
				<NavItem href="/">Overview</NavItem>
				<NavItem href="/dark">Dark Mode</NavItem>
				<NavItem href="/i18n">i18n</NavItem>
			</NavCategory>

			<NavCategory name="Components">
				{#each sortedComponents as component}
					<NavItem href={component.href}>{component.label}</NavItem>
				{/each}
			</NavCategory>

			<NavCategory name="Cloud">
				<NavItem href="/cloud-context">Cloud Context</NavItem>
				<!-- <NavItem href="/resource-creator">Resource Creator</NavItem> -->
			</NavCategory>

			<NavCategory name="Marketing">
				<NavItem href="/page-structure">Page Structure</NavItem>
				<NavItem href="/docs">Docs</NavItem>
				<NavItem href="/document">Document</NavItem>
				<NavItem href="/tracking">Tracking</NavItem>
			</NavCategory>
		</Nav>
	{/snippet}

	{#snippet content()}
		<Content>
			<data.content />
		</Content>
	{/snippet}
</Docs>

<Footer
	email="foss@hyvor.com"
	social={{
		youtube: undefined
	}}
></Footer>
