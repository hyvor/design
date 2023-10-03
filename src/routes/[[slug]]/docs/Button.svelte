<script>
    import Button from "$lib/components/Button/Button.svelte";
    import CodeBlock from "$lib/pages/Docs/Content/CodeBlock.svelte";
    import Search from '$lib/icons/Search.svelte';
    import CaretDown from "$lib/icons/CaretDown.svelte";
    import BoxArrowUpRight from '$lib/icons/BoxArrowUpRight.svelte';
    import Loader from "$lib/components/Loader/Loader.svelte";
</script>
<h1>Button</h1>

<p>
    Buttons are used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
</p>

<h2 id="props">Properties</h2>

<ul>
    <li>
        <code>size</code> - The <a href="#size">size</a> of the button.
    </li>
    <li>
        <code>color</code> - The <a href="#color">color</a> of the button.
    </li>
    <li>
        <code>block</code> - Whether the button should be displayed as a block element.
    </li>
    <li>
        <code>align</code> - The alignment of the content when using <code>block</code>. Can be <code>start</code> or <code>center</code> (default). 
    </li>
    <li>
        <code>as</code> - The element to render the button as. Can be <code>button</code> or <code>a</code>.
    </li>
</ul>

All other properties will be forwarded to the underlying element.

<h3 id="size">Size</h3>

<p>
    The size can be one of the following:
</p>

<ul>
    <li>
        <p>
            <code>small</code>
        </p>
        <Button size="small">
            Small Button
        </Button>
    </li>
    <li>
        <p>
            <code>medium</code> (default)
        </p>
        <Button size="medium">
            Medium Button
        </Button>
    </li>
    <li>
        <p>
            <code>large</code>
        </p>
        <Button size="large">
            Large Button
        </Button>
    </li>
</ul>

<h3 id="color">Color</h3>

<p>
    The color can be one of the following:
</p>

<ul>

    <li>
        <p>
            <code>accent</code> (default)
        </p>
        <Button color="accent">
            Accent Button
        </Button>
    </li>
    <li>
        <p>
            <code>soft</code>
        </p>
        <Button color="soft">
            Soft Button
        </Button>
    </li>
    <li>
        <p>
            <code>invisible</code>
        </p>
        <Button color="invisible">
            Invisible Button
        </Button>
    </li>
    <li>
        <p>
            <code>danger</code>
        </p>
        <Button color="danger">
            Danger Button
        </Button>
    </li>

</ul>


<h2 id="slots">Slots</h2>

<ul>
    <li>
        <p>
            <code>default</code> - The content (label) of the button.
        </p>
        <CodeBlock 
            code={`<Button>Search</Button>`}
        />
        <Button>Search</Button>
    </li>
    <li>
        <code>start</code> - Placed before the content (e.g. icon). 

        <CodeBlock 
            code={`
                <Button>
                    <Search slot="start" />
                    Search
                </Button>
            `}
        />

        <Button>
            <Search slot="start" />
            Search
        </Button>
    </li>
    <li>
        <code>end</code> - Placed after the content (e.g. icon).

        <CodeBlock 
            code={`
                <Button>
                    Search
                    <Search slot="end" />
                </Button>
            `}
        />

        <Button>
            Search
            <Search slot="end" />
        </Button>
    </li>
    <li>
        <code>action</code> - Placed after the content, locked to the right side of the button. This is useful with the <code>block</code> property.

        <CodeBlock 
            code={`
                <Button block color="soft">
                    <Search slot="start" />
                    Search
                    <CaretDown slot="action" />
                </Button>
            `}
        />

        <Button block color="soft">
            <Search slot="start" />
            Search
            <CaretDown slot="action" />
        </Button>
    </li>
</ul>

<h2 id="examples">Examples</h2>

<h3 id="button-link">Button Link</h3>

<p>
    The <code>as</code> property can be used to render the button as a link.
</p>

<CodeBlock 
    code={`
        <Button as="a" href="https://hyvor.com" target="_blank">
            HYVOR <BoxArrowUpRight slot="end" />
        </Button>
    `}
/>

<Button as="a" href="https://hyvor.com" style="text-decoration:none" target="_blank">
    HYVOR <BoxArrowUpRight slot="end" />
</Button>

<h3 id="button-with-loader">Button with Loader</h3>

<p>
    The <a href="/loader">Loader</a> component can be used to indicate a loading state.
</p>

<CodeBlock 
    code={`
        <Button>
            Submit
            <Loader slot="action" size="small" invert />
        </Button>
    `}
/>

<Button>
    Submit
    <Loader slot="action" size="small" invert />
</Button>