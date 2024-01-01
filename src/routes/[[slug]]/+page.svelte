<script lang="ts">
	import Link from './../../lib/components/Link/Link.svelte';
	import FooterLinkList from './../../lib/marketing/Footer/FooterLinkList.svelte';
	import { IconBoxArrowUpRight } from '@hyvor/icons';
	import NavItem from './../../lib/marketing/Docs/Nav/NavItem.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
    import Footer from '$lib/marketing/Footer/Footer.svelte';
	import Content from "$lib/marketing/Docs/Content/Content.svelte";
    import Docs from "$lib/marketing/Docs/Docs.svelte";
	import Nav from "$lib/marketing/Docs/Nav/Nav.svelte";
	import NavCategory from "$lib/marketing/Docs/Nav/NavCategory.svelte";

    import logo from '../img/logo/hyvor.svg';
    import Button from "../../lib/components/Button/Button.svelte";
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    
    const components = [
        { href: "/action-list", label: "Action List" },
        { href: "/avatar", label: "Avatar" },
        { href: "/button", label: "Button" },
        { href: "/box", label: "Box" },
        { href: '/color-picker', label: "Color Picker" },
        { href: "/icon-button", label: "Icon Button" },
        { href: "/callout", label: "Callout" },
        { href: "/code-block", label: "Code Block" },
        { href: "/checkbox", label: "Checkbox" },
        { href: "/divider", label: "Divider" },
        { href: "/dropdown", label: "Dropdown" },
        { href: "/nav-link", label: "Nav Link" },
        { href: "/radio", label: "Radio" },
        { href: "/switch", label: "Switch" },
        { href: "/textarea", label: "Textarea" },
        { href: '/tab-nav', label: 'Tab Nav' },
        { href: "/table", label: "Table" },
        { href: "/text", label: "Text" },
        { href: "/text-input", label: "Text Input" },
        { href: "/form-control", label: "Form Control" },
        { href: "/split-control", label: "Split Control" },
        { href: "/loader", label: "Loader" },
        { href: "/link", label: "Link" },
        { href: "/tag", label: "Tag" },
        { href: "/tooltip", label: "Tooltip" },
        { href: "/toast", label: "Toast" },
        { href: "/modal", label: "Modal" }
    ];

    const sortedComponents = components.sort((a, b) => a.label.localeCompare(b.label));

    export let data;

    let title = 'Hyvor Design';

    onMount(() => {
        const unsubscribe = page.subscribe(() => {
            const h1 = document.querySelector('h1');
            if (h1 && h1.textContent) {
                title = h1.textContent + ' - HDS';
            }
        })

        return unsubscribe;
    })

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Header
    logo={logo}
    name="HYVOR"
    subName="Design System"
>

    <div slot="center">
        <Button as="a" href="https://hyvor.com" variant="invisible" target="_blank">
            hyvor.com <IconBoxArrowUpRight slot="end" size={14} />
        </Button>
    </div>

</Header>

<Docs>

    <Nav slot="nav">

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

        <NavCategory name="Marketing">
            <NavItem href="/page-structure">Page Structure</NavItem>
            <NavItem href="/docs">Docs</NavItem>
        </NavCategory>

    </Nav>

    <Content slot="content">
        <svelte:component this={data.content} />
    </Content>

</Docs>

<Footer
    email="foss@hyvor.com"
    social={{
        x: 'https://twitter.com'
    }}
>

    <div slot="center">

        <div style="display:flex">
            <FooterLinkList title="Product">
                <a href="pricing" target="_blank">Pricing</a>
                <a href="docs" target="_blank">Docs</a>
                <a href="customers" target="_blank">Customers</a>
            </FooterLinkList>

            <FooterLinkList title="HYVOR">
                <a href="https://hyvor.com" target="_blank">hyvor.com</a>
            </FooterLinkList>
        </div>

    </div>

</Footer>