<script>
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/marketing/Docs/Content/CodeBlock.svelte";
    import { IconBoxArrowUpRight, IconSearch } from '@hyvor/icons';
    import CodeResult from './Helper/CodeResult.svelte';

</script>
<h1>Icon Button</h1>

<p>
    The <code>IconButton</code> component can be used to create a button with an icon.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Default</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>size</code></div>
        <div><code>medium</code></div>
        <div>
            The <a href="#size">size</a> of the button. One of:

            <ul>
                <li><code>small</code></li>
                <li><code>medium</code></li>
                <li><code>large</code></li>
            </ul>
        </div>
    </TableRow>

    <TableRow>
        <div><code>color</code></div>
        <div><code>accent</code></div>
        <div>
            The <a href="#color">color</a> of the button. One of:
        
            <ul>
                <li><code>accent</code></li>
                <li><code>soft</code></li>
                <li><code>invisible</code></li>
                <li><code>danger</code></li>
            </ul>
        </div>
    </TableRow>

    <TableRow>
        <div><code>as</code></div>
        <div><code>button</code></div>
        <div>
            The element to render the button as. Can be <code>button</code> or <code>a</code>.
        </div>
    </TableRow>

</Table>

<h2 id="examples">Examples</h2>

<h3 id="size">Sizes</h3>

<CodeBlock code={`
    <IconButton size="small"><IconSearch /></IconButton>
    <IconButton size="medium"><IconSearch /></IconButton>
    <IconButton size="large"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
<IconButton size="small"><IconSearch /></IconButton>
<IconButton size="medium"><IconSearch /></IconButton>
<IconButton size="large"><IconSearch /></IconButton>
</CodeResult>

<h3 id="color">Colors</h3>

<CodeBlock code={`
    <IconButton color="accent"><IconSearch /></IconButton>
    <IconButton color="soft"><IconSearch /></IconButton>
    <IconButton color="invisible"><IconSearch /></IconButton>
    <IconButton color="danger"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton color="accent"><IconSearch /></IconButton>
    <IconButton color="soft"><IconSearch /></IconButton>
    <IconButton color="invisible"><IconSearch /></IconButton>
    <IconButton color="danger"><IconSearch /></IconButton>
</CodeResult>

<h3 id="link">Link</h3>

<CodeBlock code={`
    <IconButton 
        as="a" 
        href="https://hyvor.com" 
        target="_blank"
    ><IconBoxArrowUpRight /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton 
        as="a" 
        href="https://hyvor.com" 
        target="_blank"
    ><IconBoxArrowUpRight /></IconButton>
</CodeResult>

