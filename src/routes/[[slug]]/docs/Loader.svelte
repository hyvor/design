<script lang="ts">
    import Loader from "$lib/components/Loader/Loader.svelte";
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import Button from "../../../lib/components/Button/Button.svelte";
    import CodeBlock from "../../../lib/marketing/Docs/Content/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
</script>

<h1>Loader</h1>

<p>
    The Loader component is used to indicate that a page or component is loading.
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
            The size of the loader.
            
            <ul>
                <li><code>small</code> (16px)</li>
                <li><code>medium</code> (24px)</li>
                <li><code>large</code> (32px)</li>
                <li>a number in pixels</li>
            </ul>
        </div>
    </TableRow>

    <TableRow>
        <div><code>color</code></div>
        <div><code>var(--accent)</code></div>
        <div>
            The color of the loader circle.
        </div>
    </TableRow>

    <TableRow>
        <div><code>colorTrack</code></div>
        <div><code>var(--accent-lightest)</code></div>
        <div>
            The color of the loader circle track.
        </div>
    </TableRow>

    <TableRow>
        <div><code>invert</code></div>
        <div><code>false</code></div>   
        <div>
            Inverts the loader colors.
        </div>
    </TableRow>

    <TableRow>
        <div><code>block</code></div>
        <div><code>false</code></div>   
        <div>
            If true, the loader will be displayed as a block element.
        </div>
    </TableRow>

    <TableRow>
        <div><code>padding</code></div>
        <div><code>medium</code> (block only)</div>   
        <div>
            Padding around the loader wrap. Can be a number in pixels or one of the following strings:
            
            <ul>
                <li><code>none</code> (0px)</li>
                <li><code>small</code> (60px)</li>
                <li><code>medium</code> (150px)</li>
                <li><code>large</code> (250px)</li>
            </ul>
        </div>
    </TableRow>

</Table>

<h2 id="examples">Examples</h2>

<h3 id="sizes">Sizes</h3>

<CodeBlock code={`
    <Loader size={12} />
    <Loader size="small" />
    <Loader size="medium" />
    <Loader size="large" />
    <Loader size={48} />
`} />

<CodeResult>
    <div class="loaders-display">
        <Loader size={12} />
        <Loader size="small" />
        <Loader size="medium" />
        <Loader size="large" />
        <Loader size={48} />
    </div>
</CodeResult>


<h3 id="colors">Colors</h3>

<CodeBlock code={`
    <Loader color="var(--red)" colorTrack="var(--red-light)" />
    <Loader color="var(--green)" colorTrack="var(--green-light)" />
    <Loader color="var(--orange)" colorTrack="var(--orange-light)" />
`} />

<CodeResult>
    <div class="loaders-display">
        <Loader color="var(--red)" colorTrack="var(--red-light)" />
        <Loader color="var(--green)" colorTrack="var(--green-light)" />
        <Loader color="var(--orange)" colorTrack="var(--orange-light)" />
    </div>
</CodeResult>

<h3 id="invert">Inverted Colors</h3>

<p>
    You can quickly invert the colors of the loader by setting the <code>invert</code> prop to true. This is useful in cases where the loader is displayed on a dark background, for example in a button with the accent color.
</p>

<CodeBlock 
    code={`
        <Button>
            Submit
            <Loader slot="action" size="small" invert />
        </Button>
    `}
/>

<CodeResult>
    <Button>
        Submit
        <Loader slot="action" size="small" invert />
    </Button>
</CodeResult>


<h3 id="block">Block Loader</h3>

<p>
    You can display the loader as a block element by setting the <code>block</code> prop to true. You can optionally set a message using the default slot.
</p>

<CodeBlock 
    code={`
        <Loader block>
            Loading...
        </Loader>
    `}
/>

<CodeResult>
    <Loader block>
        Loading...
    </Loader>
</CodeResult>

<p>
    You can also set <code>padding={"{number}"}</code> or <code>padding="small|medium|large"</code> to add padding to the loader. By default, <code>padding="medium"</code> is used.
</p>


<style>
    .loaders-display {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .loaders-display > :global(div:not(:last-child)) {
        margin-bottom: 10px;
    }
</style>

<h3 id="inline-with-message">
    Inline Loader with Message
</h3>


<CodeBlock 
    code={`
        <Loader>
            Loading...
        </Loader>
    `}
/>

<CodeResult>
    <Loader>Loading...</Loader>
</CodeResult>