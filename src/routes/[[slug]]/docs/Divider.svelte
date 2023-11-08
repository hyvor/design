    <script lang="ts">
        import Divider from "$lib/components/Divider/Divider.svelte";
        import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
        import CodeResult from "./Helper/CodeResult.svelte";
        import Table from "$lib/components/Table/Table.svelte";
        import TableRow from "$lib/components/Table/TableRow.svelte";    
    </script>

    <h1>Divider</h1>

    <p> This is a horizontal line used to divide sections. </p>

    <h2 id="props">Properties</h2>

    <Table columns="2fr 2fr 3fr">
        <TableRow head>
            <div>Name</div>
            <div>Default</div>
            <div>Description</div>
        </TableRow>

        <TableRow>
            <div><code>color</code></div>
            <div><code>var(--accent-lightest)</code></div>
            <div>
                The color of the divider.
            </div>
        </TableRow>

        <TableRow>
            <div><code>height</code></div>
            <div><code>1</code></div>
            <div>
                The height of the divider in pixels (px).
            </div>
        </TableRow>

        <TableRow>
            <div><code>width</code></div>
            <div><code>100</code></div>
            <div>
                The width of the divider as a percentage (%).
            </div>
        </TableRow>

        <TableRow>
            <div><code>margin</code></div>
            <div><code>0</code></div>
            <div>
                The margin of the divider in pixels (px).
            </div>
        </TableRow>

    </Table>







    <h2>Example</h2>
    <p>    Here, we have a simple divider with the default settings.</p>
    <CodeBlock code={`
        <Divider />
    `} />

    <CodeResult style="background-color:var(-accent-light)">
        <Divider />
    </CodeResult>
    
    <br>
    <p>The divider can be customized according to a prefered way.</p>

    <CodeBlock code={`
        <Divider color=var(--red-light) height="3" width="50%" margin="3" />
    `} />

    <CodeResult style="background-color:var(-accent-light)">
        <Divider color=var(--red-light) height="3" width="50%" margin="3" />
    </CodeResult>

    <style>
    
    </style>