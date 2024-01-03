<script lang="ts">
	import LoadButton from './../../../lib/components/Loader/LoadButton.svelte';
    import Loader from "$lib/components/Loader/Loader.svelte";
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import Button from "../../../lib/components/Button/Button.svelte";
    import CodeBlock from "../../../lib/components/CodeBlock/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import { toast } from "../../../lib/components/index.js";

    let loaderStateS: 'loading' | 'none' | 'error' | 'success' = 'none';
    let loaderStateE: 'loading' | 'none' | 'error' | 'success' = 'none';

    function handleButtonClickS() {
        loaderStateS = 'loading'

        setTimeout(() => {
            loaderStateS = 'success';
        }, 2000)
    }

    function handleButtonClickE() {
        loaderStateE = 'loading'

        setTimeout(() => {
            loaderStateE = 'error';
        }, 2000)
    }

    let hasMore1 = true;
    let isLoadingMore1 = false;

    function handleLoadMore1() {
        isLoadingMore1 = true;

        setTimeout(() => {
            isLoadingMore1 = false;
            hasMore1 = true;
            toast.success('Loaded more items');
        }, 2000);
    }

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
        <div><code>state</code></div>
        <div><code>loading</code></div>
        <div>
            The state of the loader.
            <ul>
                <li><code>loading</code></li>
                <li><code>success</code></li>
                <li><code>error</code></li>
                <li><code>none</code></li>
            </ul>
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
        <div><code>full</code></div>
        <div><code>false</code></div>   
        <div>
            If true, the loader will take up the full width and height of its parent. The loader and the message will be centered.
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
    You can set <code>padding={"{number}"}</code> or <code>padding="small|medium|large"</code> to add padding to the loader. By default, <code>padding="medium"</code> is used.
</p>

<h3 id="full loader">Full Loader</h3>

<p>
    You can set <code>full</code> prop to true to make the loader take up the full width and height of its parent. Padding is not applied in this case.
</p>

<CodeBlock 
    code={`
        <div style="height=200px">
            <Loader full>
                Loading...
            </Loader>
        </div>
    `} 
/>

<CodeResult>
    <div style="height: 200px">
        <Loader full>
            Full Loader (200px height, centered)
        </Loader>
    </div>
</CodeResult>


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

<h3 id="state">States</h3>

<p>
    You can set the <code>state</code> prop to <code>loading</code>, <code>success</code> or <code>error</code> to display the corresponding loaderState
</p>

<CodeBlock 
    code={`
    <` + `script lang="ts">
        let loaderStateS: 'loading' | 'none' | 'error' | 'success' = 'none';
        let loaderStateE: 'loading' | 'none' | 'error' | 'success' = 'none';

        function handleButtonClickS() {
            loaderStateS = 'loading'

            setTimeout(() => {
                loaderStateS = 'success';
            }, 2000)
        }

        function handleButtonClickE() {
            loaderStateE = 'loading'

            setTimeout(() => {
                loaderStateE = 'error';
            }, 2000)
        }
    <` + `/script>

    <Button on:click={handleButtonClickS}>Toggle State Success 
        <Loader slot="action" size="small" state={loaderStateS} />  
    </Button>

    <Button on:click={handleButtonClickE}>Toggle State Error
        <Loader slot="action" size="small" state={loaderStateE} />  
    </Button>
`}
/>

<CodeResult white>
    <Button on:click={handleButtonClickS} color="gray">Success State
        <Loader slot="action" size="small" state={loaderStateS} />  
    </Button>

    <Button on:click={handleButtonClickE} color="gray">Error State
        <Loader slot="action" size="small" state={loaderStateE} />  
    </Button>
</CodeResult>  


<h2 id="load-more">
    Load Button
</h2>

<p>
    You will often need to display a button with a loader conditionally. The <code>LoadButton</code> component can be used for this purpose. One common use case is to display a button to load more items in a list.
</p>

<CodeBlock code={`
    <LoadButton
        text="Load More"
        show={hasMore}
        loading={isLoadingMore}
        on:click={handleLoadMore}
    />
`} />

<CodeResult>
    <LoadButton
        text="Load More"
        show={hasMore1}
        loading={isLoadingMore1}
        on:click={handleLoadMore1}
    />
</CodeResult>