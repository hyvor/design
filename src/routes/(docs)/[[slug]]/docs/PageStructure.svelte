<script>
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Page Structure</h1>

<p>
	A marketing page should have a header, a footer, and a main content area. For the header and
	footer, you can use the following components.
</p>

<ul>
	<li><code>{'<Header>'}</code></li>
	<li><code>{'<Footer>'}</code></li>
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
		<div>The main name, usually "HYVOR".</div>
	</TableRow>
	<TableRow>
		<div><code>subName</code></div>
		<div></div>
		<div>The sub name of the product. Ex: "Design"</div>
	</TableRow>
	<TableRow>
		<div><code>logo</code></div>
		<div></div>
		<div>URL/path to the logo image.</div>
	</TableRow>
	<TableRow>
		<div><code>darkToggle</code></div>
		<div><code>true</code></div>
		<div>Whether to show the dark mode toggle button.</div>
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
			The content in the center of the header. Usually, the navigation links like "Docs",
			"Pricing", etc. You can also use <a href="dropdown">Dropdowns</a> here.
		</div>
	</TableRow>
	<TableRow>
		<div><code>end</code></div>
		<div>The content in the end of the header. Usually, the login/signup buttons.</div>
	</TableRow>
</Table>

<h3 id="mobile">Mobile Navigation</h3>

<p>
	On mobile and tablets (<code>&lt;=992px</code>), content in both
	<code>center</code>
	and <code>end</code> slots will be hidden, and a hamburger menu will be shown instead. The hamburger
	menu will open a dropdown with the content of both slots.
</p>

<h3 id="examples">Example</h3>

<CodeBlock
	code={`
    <` +
		`script>
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
`}
/>

<h2 id="footer">Footer</h2>

<h3 id="props">Properties</h3>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>email</code></div>
		<div>null</div>
		<div>The email address to show in the footer.</div>
	</TableRow>

	<TableRow>
		<div><code>social</code></div>
		<div>null</div>
		<div>
			An object with social media links. The keys should be the names of the social media, and
			the values should be the URLs. The accepted keys are
			<ul>
				<li><code>x</code></li>
				<li><code>discord</code></li>
				<li><code>github</code></li>
				<li><code>youtube</code></li>
				<li><code>linkedin</code></li>
			</ul>
		</div>
	</TableRow>
</Table>

<h3 id="slots">Slots</h3>

<Table columns="2fr 3fr">
	<TableRow head>
		<div>Name</div>

		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>center</code></div>
		<div>
			The content in the center of the footer. Usually, the navigation links like "Contact
			Us", "Pricing", etc.
		</div>
	</TableRow>
</Table>

<h3 id="examples">Example</h3>
<p>
	The following example shows how to use the <code>Footer</code> and
	<code>FooterLinkList</code> components to create a footer with two columns.
</p>

<CodeBlock
	code={` 
<Footer
    email="foss@hyvor.com"
    social={{
        x: 'https://twitter.com'
    }}
>

    <div slot="center">

        <div style="display:flex">
            <FooterLinkList title="Product">
                <a href="pricing" target="_blank">Pricing</a>
                <a href="docs" target="_blank">Docs</a>
                <a href="customers" target="_blank">Customers</a>
            </FooterLinkList>

            <FooterLinkList title="HYVOR">
                <a href="https://hyvor.com" target="_blank">hyvor.com</a>
            </FooterLinkList>
        </div>

    </div>

</Footer>
           
    
                `}
/>
