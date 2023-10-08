<script>
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/marketing/Docs/Content/CodeBlock.svelte";

</script>
<h1>Page Structure</h1>

<p>
    A marketing page should have a header, a footer, and a main content area. For the header and footer, you can use the following components.
</p>

<ul>
    <li><code>{"<Header>"}</code></li>
    <li><code>{"<Footer>"}</code></li>
</ul>


<h2 id="header">Header</h2>

<h3 id="props">Properties</h3>

<Table columns="2fr 2fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Default</div>
        <div>Description</div>
    </TableRow>
    <TableRow>
        <div><code>name</code></div>
        <div><code>"HYVOR"</code></div>
        <div>
            The main name, usually "HYVOR".
        </div>
    </TableRow>
    <TableRow>
        <div><code>subName</code></div>
        <div></div>
        <div>
            The sub name of the product. Ex: "Design"
        </div>
    </TableRow>
    <TableRow>
        <div><code>logo</code></div>
        <div></div>
        <div>
            URL/path to the logo image.
        </div>
    </TableRow>
    <TableRow>
        <div><code>darkToggle</code></div>
        <div><code>true</code></div>
        <div>
            Whether to show the dark mode toggle button.
        </div>
    </TableRow>
</Table>

<h3 id="slots">Slots</h3>

<Table columns="1fr 3fr">
    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>
    <TableRow>
        <div><code>center</code></div>
        <div>
            The content in the center of the header. Usually, the navigation links like "Docs", "Pricing", etc. You can also use <a href="dropdown">Dropdowns</a> here.
        </div>
    </TableRow>
    <TableRow>
        <div><code>end</code></div>
        <div>
            The content in the end of the header. Usually, the login/signup buttons.
        </div>
    </TableRow>
</Table>

<h3 id="mobile">Mobile Navigation</h3>

<p>
    On mobile and tablets (<code>&lt;=992px</code>), content in both <code>center</code> and <code>end</code> slots will be hidden, and a hamburger menu will be shown instead. The hamburger menu will open a dropdown with the content of both slots.
</p>

<h3 id="examples">Example</h3>

<CodeBlock code={`
    <`+`script>
        import Header from "@hyvor/design/marketing/Header.svelte";
        import Button from "@hyvor/design/Button.svelte";

        import logo from '../img/logo.svg';
    </script>

    <Header
        logo={logo}
        subName="Talk"
    >

        <div slot="center">
            <Button as="a" href="/docs" color="invisible">
                Docs
            </Button>
            <Button as="a" href="/pricing" color="invisible">
                Pricing
            </Button>
        </div>

        <div slot="end">
            <Button as="a" href="/login" color="invisible">
                Login
            </Button>
            <Button as="a" href="/signup">
                Signup
            </Button>
        </div>

    </Header>
`} />