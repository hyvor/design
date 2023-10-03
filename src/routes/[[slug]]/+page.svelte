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
            <NavItem href="/button-group">Button Group</NavItem>
            <NavItem href="/checkbox">Checkbox</NavItem>
        </NavCategory>

        <NavCategory name="Pages">
            <NavItem href="/learn/rss">Docs</NavItem>
            <NavItem href="/learn/atom">Atom</NavItem>
            <NavItem href="/learn/opml">OPML</NavItem>
        </NavCategory>

    </Nav>

    <Content slot="content">
        <svelte:component this={data.content} />
    </Content>

</Docs>