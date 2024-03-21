<script lang="ts">
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import NavLink from "$lib/components/NavLink/NavLink.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import Box from "$lib/components/Box/Box.svelte";
    import { IconColumns, IconChat, IconFile, IconCoin, IconExclamationCircle } from "@hyvor/icons";

    let active = 'overview';
    let active2 = 'overview'

</script>

<h1>Nav Link</h1>

<p>
    The <code>{"<NavLink>"}</code> component is used in navigation (ex: in Console). All additional properties are sent directly to the underlying HTML <code>{"<a>"}</code> element. 
</p>


<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Default</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div>active</div>
        <div><code>false</code></div>
        <div>
            If the link is active (boolean)
        </div>
    </TableRow>

</Table>

<h2 id="slots">Slots</h2>
<Table columns="1fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Default</div>
    </TableRow>

    <TableRow>
        <div><code>default</code></div>
        <div>
            The default content of the Nav Link.
        </div>
    </TableRow>


    <TableRow>
        <div><code>start</code></div>
        <div>
            The content of the start slot (left side).
        </div>
    </TableRow>

    <TableRow>
        <div><code>end</code></div>
        <div>
            The content of the end slot (right side).
        </div>
    </TableRow>

</Table>

<h2>Examples</h2>

<CodeBlock code={`
    <NavLink href="/" active>Overview</NavLink>
    <NavLink href="/">Comments</NavLink>
    <NavLink href="/">Pages</NavLink>
`} />


<div class="no-link-color">
    <CodeResult gap={5} white>
        <Box style="width:100%">
            <div style="padding: 15px 0">
                <NavLink href ="javascript:void(0)" active={active === 'overview'} on:click={() => active = 'overview'}>Overview</NavLink>
                <NavLink href="javascript:void(0)" active={active === 'comments'} on:click={() => active = 'comments'}>Comments</NavLink>
                <NavLink href="javascript:void(0)" active={active === 'pages'} on:click={() => active = 'pages'}>Pages</NavLink>
                <!-- disabled state -->
                <NavLink href="javascript:void(0)" disabled>Disabled</NavLink>
            </div>
        </Box>
    </CodeResult>

</div>


<h3>With Slots</h3>

<CodeBlock code={`
    <NavLink href ="/" active>
        <IconColumns slot="start"></IconColumns>
        Overview
    </NavLink>

    <NavLink href="/">
        <IconChat slot="start"></IconChat>
        Comments
    </NavLink>

    <NavLink href="/">
        <IconFile slot="start"></IconFile>
        Pages
    </NavLink>

    <NavLink href="/">
        <IconCoin slot="start"></IconCoin>
        Billing
        <IconExclamationCircle slot="end"></IconExclamationCircle>
    </NavLink>
`} />


<div class="no-link-color">
    <CodeResult gap={5} white>
        <Box style="width:100%">
            <div style="padding: 15px 0">
                <NavLink href ="javascript:void(0)" active={active2 === 'overview'} on:click={() => active2 = 'overview'}>
                    <IconColumns slot="start"></IconColumns>
                    Overview
                </NavLink>

                <NavLink href="javascript:void(0)" active={active2 === 'comments'} on:click={() => active2 = 'comments'}>
                    <IconChat slot="start"></IconChat>
                    Comments
                </NavLink>

                <NavLink href="javascript:void(0)" active={active2 === 'pages'} on:click={() => active2 = 'pages'}>
                    <IconFile slot="start"></IconFile>
                    Pages
                </NavLink>

                <NavLink href="javascript:void(0)" active={active2 === 'billing'} on:click={() => active2 = 'billing'}>
                    <IconCoin slot="start"></IconCoin>
                    Billing
                    <IconExclamationCircle slot="end" style="color:var(--orange)"></IconExclamationCircle>
                </NavLink>
            </div>
        </Box>
    </CodeResult>

</div>

