<script lang="ts">
    import '$lib/index';
	import Content from "$lib/pages/Docs/Content/Content.svelte";
    import Docs from "$lib/pages/Docs/Docs.svelte";
	import Nav from "$lib/pages/Docs/Nav/Nav.svelte";
	import NavCategory from "$lib/pages/Docs/Nav/NavCategory.svelte";
	import NavItem from "$lib/pages/Docs/Nav/NavItem.svelte";

    export let data;
</script>

<Docs>

    <Nav slot="nav">

        <NavCategory name="Design System">
            <NavItem href="/">Overview</NavItem>
        </NavCategory>

        <NavCategory name="Components">
            <NavItem href="/button">Button</NavItem>
            <NavItem href="/callout">Callout</NavItem>
            <NavItem href="/checkbox">Checkbox</NavItem>
            <NavItem href="/radio">Radio</NavItem>
            <NavItem href="/switch">Switch</NavItem>
            <NavItem href="/text-input">Text Input</NavItem>
            <NavItem href="/textarea">Textarea</NavItem>
            <NavItem href="/table">Table</NavItem>
            <NavItem href="/form-control">Form Control</NavItem>
            <NavItem href="/split-control">Split Control</NavItem>
            <NavItem href="/loader">Loader</NavItem>
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