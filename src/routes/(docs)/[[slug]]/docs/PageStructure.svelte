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
	<TableRow>
		<div><code>max</code></div>
		<div><code>false</code></div>
		<div>Set the width for 1440px of the header.</div>
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
			The content in the center of the header. Usually, the navigation links like "Docs", "Pricing",
			etc., built with <a href="#header-nav-link"><code>HeaderNavLink</code></a>. You can also use
			<a href="dropdown">Dropdowns</a> here (e.g. for a "Resources" menu).
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
	menu opens a dropdown with the content of both slots (with a divider between them), and its icon switches
	from a hamburger to a close (X) icon while open. Clicking any link inside the menu closes it automatically.
</p>

<p>
	The header also gains a bottom border once the page is scrolled, so it stays visually separated
	from the content beneath it.
</p>

<h3 id="header-nav-link">HeaderNavLink</h3>

<p>
	<code>HeaderNavLink</code> is a pill-shaped nav link meant to be used inside the
	<code>center</code>
	slot (and inside dropdown menus placed there). It renders an <code>{'<a>'}</code> when given an
	<code>href</code>, or a <code>{'<span>'}</code> otherwise, so it can also be used as a
	<a href="dropdown">Dropdown</a> trigger (e.g. a "Resources" link that opens a submenu).
</p>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>href</code></div>
		<div></div>
		<div>The link URL. When omitted, the link renders as a clickable <code>span</code>.</div>
	</TableRow>
	<TableRow>
		<div><code>active</code></div>
		<div><code>false</code></div>
		<div>Highlights the link as the current page.</div>
	</TableRow>
	<TableRow>
		<div><code>menu</code></div>
		<div><code>false</code></div>
		<div>
			Use the compact style meant for links placed inside a Dropdown's menu content (e.g. a
			"Resources" submenu, or the header's own mobile menu).
		</div>
	</TableRow>
</Table>

<h4 id="header-nav-link-slots">Slots</h4>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>start</code></div>
		<div>Content before the label. Usually an icon.</div>
	</TableRow>
	<TableRow>
		<div><code>children</code></div>
		<div>The link label.</div>
	</TableRow>
	<TableRow>
		<div><code>end</code></div>
		<div>Content after the label. Usually an icon, e.g. a caret for a dropdown trigger.</div>
	</TableRow>
</Table>

<h3 id="examples">Example</h3>

<CodeBlock
	code={`
    <` +
		`script>
        import Header from "@hyvor/design/marketing/Header.svelte";
        import { HeaderNavLink } from "@hyvor/design/marketing";
        import { Button, Dropdown } from "@hyvor/design/components";
        import IconCaretDown from "@hyvor/icons/IconCaretDown";

        import logo from '../img/logo.svg';

        let resourcesOpen = $state(false);
    </script>

    <Header
        logo={logo}
        subName="Talk"
    >

        {#snippet center()}
            <HeaderNavLink href="/docs" active={page.url.pathname.startsWith('/docs')}>
                Docs
            </HeaderNavLink>
            <HeaderNavLink href="/pricing" active={page.url.pathname === '/pricing'}>
                Pricing
            </HeaderNavLink>

            <Dropdown bind:show={resourcesOpen} contentPadding={8}>
                {#snippet trigger()}
                    <HeaderNavLink active={resourcesOpen}>
                        Resources
                        {#snippet end()}
                            <IconCaretDown size={11} />
                        {/snippet}
                    </HeaderNavLink>
                {/snippet}
                {#snippet content()}
                    <HeaderNavLink href="/blog" menu>Blog</HeaderNavLink>
                    <HeaderNavLink href="/themes" menu>Themes</HeaderNavLink>
                {/snippet}
            </Dropdown>
        {/snippet}

        {#snippet end()}
            <div>
                <Button as="a" href="/login" color="invisible">
                    Login
                </Button>
                <Button as="a" href="/signup">
                    Signup
                </Button>
            </div>
        {/snippet}

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
		<div><code>name</code></div>
		<div><code>"HYVOR"</code></div>
		<div>
			The brand name shown top-left. Note this is separate from the "HYVOR © year" line in the
			bottom bar, which always refers to the company regardless of <code>name</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>logo</code></div>
		<div></div>
		<div>
			URL/path to an optional mascot/logo image. When given, it's shown peeking above the footer and
			tilts/fades in once scrolled into view. Omit it for no mascot.
		</div>
	</TableRow>

	<TableRow>
		<div><code>background</code></div>
		<div></div>
		<div>
			A CSS color (e.g. <code>"#574443"</code>) for a branded, always-dark footer card. When set,
			text/border colors automatically switch to a light-on-dark scheme. When omitted, the footer
			stays transparent and follows the app's own light/dark theme, like before.
		</div>
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
			An object with social media links. The keys should be the names of the social media, and the
			values should be the URLs. The accepted keys are
			<ul>
				<li><code>x</code></li>
				<li><code>discord</code></li>
				<li><code>github</code></li>
				<li><code>youtube</code></li>
				<li><code>linkedin</code></li>
				<li><code>bluesky</code></li>
			</ul>
			All six are shown by default (with HYVOR's own accounts) — pass a key as<code>undefined</code>
			to hide that one icon.
		</div>
	</TableRow>

	<TableRow>
		<div><code>languageToggle</code></div>
		<div><code>true</code></div>
		<div>Whether to show the language switcher next to the socials.</div>
	</TableRow>

	<TableRow>
		<div><code>gdpr</code></div>
		<div><code>true</code></div>
		<div>Whether to show the "GDPR Compliant" badge in the bottom bar.</div>
	</TableRow>

	<TableRow>
		<div><code>affiliate</code></div>
		<div><code>true</code></div>
		<div>Whether to handle affiliate-referral tracking/consent.</div>
	</TableRow>

	<TableRow>
		<div><code>recordVisit</code></div>
		<div><code>true</code></div>
		<div>Whether to load the visit-tracking script.</div>
	</TableRow>

	<TableRow>
		<div><code>max</code></div>
		<div><code>false</code></div>
		<div>Set the width for 1440px of the footer.</div>
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
			The link columns area, between the top row (brand/email/socials) and the bottom bar
			(copyright/GDPR badge). Usually built with one <code>FooterLinkList</code> per column, wrapped in
			your own flex/grid container.
		</div>
	</TableRow>
</Table>

<h3 id="examples">Example</h3>
<p>
	The following example shows how to use the <code>Footer</code> and
	<code>FooterLinkList</code> components to create a branded footer with two columns.
</p>

<CodeBlock
	code={`
<Footer
    name="Hyvor Blogs"
    logo="/logo.svg"
    background="#574443"
    email="blogs.support@hyvor.com"
    social={{
        x: 'https://x.com/HyvorHQ'
    }}
>

    {#snippet center()}
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
    {/snippet}

</Footer>


                `}
/>
