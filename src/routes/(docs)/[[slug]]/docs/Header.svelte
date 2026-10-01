<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Header</h1>

<p>
	The marketing site header: a logo/brand mark, a center nav slot, an end slot (usually
	login/signup), a dark mode toggle, and a built-in mobile hamburger menu. Place it as the first
	thing on the page, before <code>{'<Base>'}</code>.
</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>product</code></div>
		<div></div>
		<div>
			Product slug (e.g. <code>"blogs"</code>). Derives the default logo and fetches the cloud
			updates banner on <code>hyvor.com</code>.
		</div>
	</TableRow>
	<TableRow>
		<div><code>instance</code></div>
		<div><code>"https://hyvor.com"</code></div>
		<div>Base URL used to build the default logo and updates banner.</div>
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
		<div>URL/path to the logo image. Overrides the <code>product</code>-derived default.</div>
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
	<TableRow>
		<div><code>menuLabel</code></div>
		<div><code>"Menu"</code></div>
		<div>
			<code>aria-label</code> for the mobile hamburger menu button. Translate this when localizing the
			page.
		</div>
	</TableRow>
	<TableRow>
		<div><code>logoAltText</code></div>
		<div><code>"Logo"</code></div>
		<div>
			The word appended to the logo's alt text (e.g. "HYVOR Design Logo"). Translate this when
			localizing the page - <code>name</code>/<code>subName</code> are product-defined and stay as-is.
		</div>
	</TableRow>
</Table>

<h2 id="slots">Slots</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>center</code></div>
		<div>
			The content in the center of the header. Usually, the navigation links like "Docs", "Pricing",
			etc., built with <a href="#header-nav-link"><code>HeaderNavLink</code></a>.
		</div>
	</TableRow>
	<TableRow>
		<div><code>end</code></div>
		<div>The content in the end of the header. Usually, the login/signup buttons.</div>
	</TableRow>
	<TableRow>
		<div><code>notification</code></div>
		<div>
			Optional bar rendered above the navigation, for announcements. If it changes the header's
			height, also update the <code>--header-height</code> CSS variable.
		</div>
	</TableRow>
</Table>

<h2 id="mobile">Mobile Navigation</h2>

<p>
	On mobile and tablets (<code>&lt;=992px</code>), content in both
	<code>center</code>
	and <code>end</code> slots will be hidden, and a hamburger menu will be shown instead. The hamburger
	menu opens a dropdown with the content of both slots (with a divider between them), and its icon switches
	from a hamburger to a close (X) icon while open. Clicking any link inside the menu closes it automatically.
</p>

<p>
	The hamburger panel itself caps its height to the viewport and scrolls internally, so a long menu
	stays fully reachable on short screens.
</p>

<p>
	The header also gains a bottom border once the page is scrolled, so it stays visually separated
	from the content beneath it.
</p>

<h2 id="header-nav-link">HeaderNavLink</h2>

<p>
	<code>HeaderNavLink</code> is a pill-shaped nav link meant to be used inside the
	<code>center</code>
	slot (and inside submenus placed there). It renders an <code>{'<a>'}</code> when given an
	<code>href</code>, or a <code>{'<span>'}</code> otherwise.
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
			Compact style for links inside a Dropdown's menu (e.g. the header's mobile menu). Implied
			automatically when <code>description</code> is given.
		</div>
	</TableRow>
</Table>

<h3 id="header-nav-link-slots">Slots</h3>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>start</code></div>
		<div>
			Content before the label, usually an icon. Renders inside a tinted icon box when
			<code>description</code> is given.
		</div>
	</TableRow>
	<TableRow>
		<div><code>children</code></div>
		<div>The link label.</div>
	</TableRow>
	<TableRow>
		<div><code>end</code></div>
		<div>
			Content after the label, usually a caret icon. Not used when <code>description</code>
			is given.
		</div>
	</TableRow>
	<TableRow>
		<div><code>description</code></div>
		<div>
			A one-line description shown under the label. Switches to a richer layout (icon box, bold
			title, muted description) for menus needing more than a label.
		</div>
	</TableRow>
</Table>

<h2 id="examples">Example</h2>

<CodeBlock
	code={`
    <` +
		`script>
        import Header from "@hyvor/design/marketing/Header.svelte";
        import { HeaderNavLink } from "@hyvor/design/marketing";
        import { Button } from "@hyvor/design/components";

        import logo from '../img/logo.svg';
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
