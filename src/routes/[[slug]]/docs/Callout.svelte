<script lang="ts">
    import Table from '$lib/components/Table/Table.svelte';
    import TableRow from '$lib/components/Table/TableRow.svelte';
    import CodeBlock from '$lib/marketing/Docs/Content/CodeBlock.svelte';
    import Callout from '$lib/components/Callout/Callout.svelte';
    import CodeResult from "./Helper/CodeResult.svelte";
</script>

<h1>Callout</h1>

<p>
    The callout/alert component is used to highlight important information.
</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>
    <TableRow>
        <div>type</div>
        <div>
            Defines the type of callout (used for colors). Can be one of:
            <ul>
                <li><code>soft</code></li>
                <li><code>info</code></li>
                <li><code>warning</code></li>
                <li><code>success</code></li>
                <li><code>danger</code></li>
            </ul>
        </div>
    </TableRow>
</Table>

<h2 id="slots">Slots</h2>

<Table columns="1fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>
    <TableRow>
        <div><code>default</code></div>
        <div>Content of the callout</div>
    </TableRow>
    <TableRow>
        <div><code>icon</code></div>
        <div>
            Icon to display before the content, or before the title if there is one.
        </div>
    </TableRow>
    <TableRow>
        <div><code>title</code></div>
        <div>Title of the callout</div>
    </TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="examples-types">Types</h3>

<CodeBlock code={`
    <Callout type="soft">This is a soft callout.</Callout>
    <Callout type="info">This is an info callout.</Callout>
    <Callout type="warning">This is a warning callout.</Callout>
    <Callout type="success">This is a success callout.</Callout>
    <Callout type="danger">This is a danger callout.</Callout>
`}/>

<CodeResult style="gap:10px;display:flex;flex-direction:column">
    <Callout type="soft">This is a soft callout.</Callout>
    <Callout type="info">This is an info callout.</Callout>
    <Callout type="warning">This is a warning callout.</Callout>
    <Callout type="success">This is a success callout.</Callout>
    <Callout type="danger">This is a danger callout.</Callout>
</CodeResult>

<h3 id="examples-with-title">Callout with Title</h3>

<CodeBlock code={`
    <Callout type="info">
        <div slot="title">This is a title</div>
        This is a callout with a title.
    </Callout>
`}/>

<CodeResult>
    <Callout type="info">
        <div slot="title">This is a title</div>
        This is a callout with a title.
    </Callout>
</CodeResult>

<h3 id="examples-with-icon">Callout with Icon</h3>

<CodeBlock code={`
    <Callout type="info">
        <div slot="icon">👋</div>
        This is a callout with an icon.
    </Callout>
`}/>

<CodeResult>
    <Callout type="info">
        <div slot="icon">👋</div>
        This is a callout with an icon.
    </Callout>
</CodeResult>

<h3 id="examples-with-icon-and-title">Callout with Icon and Title</h3>

<CodeBlock code={`
    <Callout type="danger">
        <div slot="icon">⛔️</div>
        <div slot="title">This is a title</div>
        This is a callout with an icon and a title.
    </Callout>
`}/>

<CodeResult>
    <Callout type="danger">
        <div slot="icon">⛔️</div>
        <div slot="title">This is a title</div>
        This is a callout with an icon and a title.
    </Callout>
</CodeResult>