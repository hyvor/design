<script>
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
</script>
<h1>Table</h1>

<p>
    The table component is used to display data in a tabular format. It <strong>does not</strong> use the <code>table</code> element, but rather uses CSS Grid to achieve the same effect. These two components are used to create a table layout:
</p>

<ul>
    <li>
        <code>{"<Table>"}</code>
    </li>
    <li>
        <code>{"<TableRow>"}</code>
    </li>
</ul>

<h2 id="props">Properties</h2>

<h3 id="table-props">Table Properties</h3>

<Table columns="1fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>column</code></div>
        <div>
            This is the CSS Grid <code>grid-template-columns</code> property.
        </div>
    </TableRow>

    <TableRow>
        <div><code>hover</code></div>
        <div>
            Whether the table should have a hover effect or not. Default is <code>false</code>.
        </div>
    </TableRow>

</Table>

<h3 id="table-row-props">TableRow Properties</h3>

<Table columns="1fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>head</code></div>
        <div>
            Whether the row is a header row or not. This will change the background color and font weight.
        </div>
    </TableRow>

</Table>

<h2 id="examples">Examples</h2>

<h3 id="with-hover">with Hover Effect</h3>

<CodeBlock code={`
    <Table columns="1fr 1fr" hover>
        <TableRow head>
            <div>Col 1</div>
            <div>Col 2</div>
        </TableRow>
        <TableRow>
            <div>Value 1</div>
            <div>Value 2</div>
        </TableRow>
        <TableRow>
            <div>Value 1</div>
            <div>Value 2</div>
        </TableRow>
    </Table>
`} />

<Table columns="1fr 1fr" hover>
    <TableRow head>
        <div>Col 1</div>
        <div>Col 2</div>
    </TableRow>
    <TableRow>
        <div>Value 1</div>
        <div>Value 2</div>
    </TableRow>
    <TableRow>
        <div>Value 3</div>
        <div>Value 4</div>
    </TableRow>
</Table>