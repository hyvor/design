<script lang="ts">
	import NavItem from './../../lib/marketing/Docs/Nav/NavItem.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import DarkToggle from '$lib/components/Dark/DarkToggle.svelte';
    import '$lib/index';
	import Content from "$lib/marketing/Docs/Content/Content.svelte";
    import Docs from "$lib/marketing/Docs/Docs.svelte";
	import Nav from "$lib/marketing/Docs/Nav/Nav.svelte";
	import NavCategory from "$lib/marketing/Docs/Nav/NavCategory.svelte";

    import logo from '../img/logo/hyvor.svg';
    import Button from "../../lib/components/Button/Button.svelte";

    export let data;
</script>


<Header
    logo={logo}
    name="HYVOR"
>

    <div slot="center">
        <Button as="a" href="https://talk.hyvor.com/pricing" color="invisible">
            Docs
        </Button>
        <Button as="a" href="https://talk.hyvor.com/pricing" color="invisible">
            Pricing
        </Button>
    </div>

</Header>

<Docs>

    <Nav slot="nav">

        <NavCategory name="Design System">
            <NavItem href="/">Overview</NavItem>
        </NavCategory>

        <NavCategory name="Components">
            <NavItem href="/action-list">Action List</NavItem>
            <NavItem href="/avatar">Avatar</NavItem>
            <NavItem href="/button">Button</NavItem>
            <NavItem href="/icon-button">Icon Button</NavItem>
            <NavItem href="/callout">Callout</NavItem>
            <NavItem href="/checkbox">Checkbox</NavItem>
            <NavItem href="/dark">Dark Mode</NavItem>
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
            <NavItem href="/docs">Docs</NavItem>
        </NavCategory>

    </Nav>

    <Content slot="content">
        <svelte:component this={data.content} />
    </Content>

</Docs>