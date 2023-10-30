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
        <Button as="a" href="https://hyvor.com" color="invisible" target="_blank">
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
            <NavItem href="/action-list">Action List</NavItem>
            <NavItem href="/avatar">Avatar</NavItem>
            <NavItem href="/button">Button</NavItem>
            <NavItem href="/icon-button">Icon Button</NavItem>
            <NavItem href="/callout">Callout</NavItem>
            <NavItem href="/code-block">Code Block</NavItem>
            <NavItem href="/checkbox">Checkbox</NavItem>
            <NavItem href="/dropdown">Dropdown</NavItem>
            <NavItem href="/radio">Radio</NavItem>
            <NavItem href="/switch">Switch</NavItem>
            <NavItem href="/text-input">Text Input</NavItem>
            <NavItem href="/textarea">Textarea</NavItem>
            <NavItem href="/table">Table</NavItem>
            <NavItem href="/form-control">Form Control</NavItem>
            <NavItem href="/split-control">Split Control</NavItem>
            <NavItem href="/loader">Loader</NavItem>
            <NavItem href="/link">Link</NavItem>
            <NavItem href="/tooltip">Tooltip</NavItem>
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