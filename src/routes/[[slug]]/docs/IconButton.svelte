<script>
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
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
                <li><code>small</code> (26px)</li>
                <li><code>medium</code> (30px)</li>
                <li><code>large</code> (36px)</li>
                <li>a number in pixels</li>
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
                <li><code>gray</code></li>
                <li><code>green</code></li>
                <li><code>red</code></li>
                <li><code>blue</code></li>
                <li><code>orange</code></li>
            </ul>
        </div>
    </TableRow>

    <TableRow>
        <div><code>variant</code></div>
        <div><code>fill</code></div>
        <div>
            The <a href="#variant">variant</a> of the button. One of:
        
            <ul>
                <li><code>fill</code></li>
                <li><code>fill-light</code></li>
                <li><code>outline</code></li>
                <li><code>outline-fill</code></li>
                <li><code>invisible</code></li>
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

    <TableRow>
        <div><code>disabled</code></div>
        <div><code>false</code></div>
        <div>Icon Button's disabled state</div>
    </TableRow>

</Table>

<h2 id="examples">Examples</h2>

<h3 id="size">Sizes</h3>

<CodeBlock code={`
    <IconButton size="small"><IconSearch /></IconButton>
    <IconButton size="medium"><IconSearch /></IconButton>
    <IconButton size="large"><IconSearch /></IconButton>
    <IconButton size={50}><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
<IconButton size="small"><IconSearch /></IconButton>
<IconButton size="medium"><IconSearch /></IconButton>
<IconButton size="large"><IconSearch /></IconButton>
<IconButton size={50}><IconSearch /></IconButton>
</CodeResult>

<h3 id="color">Colors</h3>

<CodeBlock code={`
    <IconButton color="accent"><IconSearch /></IconButton>
    <IconButton color="gray"><IconSearch /></IconButton>
    <IconButton color="green"><IconSearch /></IconButton>
    <IconButton color="red"><IconSearch /></IconButton>
    <IconButton color="blue"><IconSearch /></IconButton>
    <IconButton color="orange"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton color="accent"><IconSearch /></IconButton>
    <IconButton color="gray"><IconSearch /></IconButton>
    <IconButton color="green"><IconSearch /></IconButton>
    <IconButton color="red"><IconSearch /></IconButton>
    <IconButton color="blue"><IconSearch /></IconButton>
    <IconButton color="orange"><IconSearch /></IconButton>
</CodeResult>


<h3 id="variant">Variants</h3>

<h4>Fill</h4>
<CodeBlock code={`
    <IconButton variant="fill" color="accent"><IconSearch /></IconButton>
    <IconButton variant="fill" color="gray"><IconSearch /></IconButton>
    <IconButton variant="fill" color="green"><IconSearch /></IconButton>
    <IconButton variant="fill" color="red"><IconSearch /></IconButton>
    <IconButton variant="fill" color="blue"><IconSearch /></IconButton>
    <IconButton variant="fill" color="orange"><IconSearch /></IconButton>
`} />
`

<CodeResult gap={8} white>
    <IconButton variant="fill" color="accent"><IconSearch /></IconButton>
    <IconButton variant="fill" color="gray"><IconSearch /></IconButton>
    <IconButton variant="fill" color="green"><IconSearch /></IconButton>
    <IconButton variant="fill" color="red"><IconSearch /></IconButton>
    <IconButton variant="fill" color="blue"><IconSearch /></IconButton>
    <IconButton variant="fill" color="orange"><IconSearch /></IconButton>
</CodeResult>

<h4>Fill Light</h4>
<CodeBlock code={`
    <IconButton variant="fill-light" color="accent"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="gray"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="green"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="red"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="blue"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="orange"><IconSearch /></IconButton>
`} />

<CodeResult gap={8} white>
    <IconButton variant="fill-light" color="accent"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="gray"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="green"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="red"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="blue"><IconSearch /></IconButton>
    <IconButton variant="fill-light" color="orange"><IconSearch /></IconButton>
</CodeResult>

<h4>Outline</h4>
<CodeBlock code={`
    <IconButton variant="outline" color="accent"><IconSearch /></IconButton>
    <IconButton variant="outline" color="gray"><IconSearch /></IconButton>
    <IconButton variant="outline" color="green"><IconSearch /></IconButton>
    <IconButton variant="outline" color="red"><IconSearch /></IconButton>
    <IconButton variant="outline" color="blue"><IconSearch /></IconButton>
    <IconButton variant="outline" color="orange"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton variant="outline" color="accent"><IconSearch /></IconButton>
    <IconButton variant="outline" color="gray"><IconSearch /></IconButton>
    <IconButton variant="outline" color="green"><IconSearch /></IconButton>
    <IconButton variant="outline" color="red"><IconSearch /></IconButton>
    <IconButton variant="outline" color="blue"><IconSearch /></IconButton>
    <IconButton variant="outline" color="orange"><IconSearch /></IconButton>
</CodeResult>

<h4>Outline Fill</h4>
<CodeBlock code={`
    <IconButton variant="outline-fill" color="accent"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="gray"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="green"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="red"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="blue"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="orange"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton variant="outline-fill" color="accent"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="gray"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="green"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="red"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="blue"><IconSearch /></IconButton>
    <IconButton variant="outline-fill" color="orange"><IconSearch /></IconButton>
</CodeResult>

<h4>Invisible</h4>
<CodeBlock code={`
    <IconButton variant="invisible" color="accent"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="gray"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="green"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="red"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="blue"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="orange"><IconSearch /></IconButton>
`} />

<CodeResult gap={8}>
    <IconButton variant="invisible" color="accent"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="gray"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="green"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="red"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="blue"><IconSearch /></IconButton>
    <IconButton variant="invisible" color="orange"><IconSearch /></IconButton>
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

<h3 id="disabled">Disabled</h3>

<CodeBlock code={`
    <IconButton
        variant="fill" 
        color="red" 
        disabled
    >
        <IconSearch />
    </IconButton>
`} />

<CodeResult white>
    <IconButton
        variant="fill" 
        color="red" 
        disabled
    >
        <IconSearch />
    </IconButton>
</CodeResult>


