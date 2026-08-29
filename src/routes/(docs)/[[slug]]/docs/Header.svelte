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
			etc., built with <a href="#header-nav-link"><code>HeaderNavLink</code></a>. For a submenu
			(e.g. a "Resources" dropdown), use <a href="#header-nav-menu"><code>HeaderNavMenu</code></a>
			rather than a raw <a href="dropdown">Dropdown</a> so it collapses cleanly on mobile.
		</div>
	</TableRow>
	<TableRow>
		<div><code>end</code></div>
		<div>The content in the end of the header. Usually, the login/signup buttons.</div>
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
	Nested dropdowns don't work well inside the hamburger menu, so
	<a href="#header-nav-menu"><code>HeaderNavMenu</code></a> and
	<a href="#header-language-toggle"><code>HeaderLanguageToggle</code></a> automatically switch to an
	collapsible chevron section below <code>992px</code> instead of opening a floating panel. If you
	place a raw <a href="dropdown"><code>Dropdown</code></a> in the
	<code>center</code> slot yourself, it will <em>not</em> get this treatment - prefer
	<code>HeaderNavMenu</code>.
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

<h2 id="header-nav-menu">HeaderNavMenu</h2>

<p>
	<code>HeaderNavMenu</code> is a labelled submenu for the <code>center</code> slot (e.g. a
	"Resources" menu). On desktop it opens a <a href="dropdown">Dropdown</a> panel below a caret
	trigger. Below <code>992px</code>, where the header collapses into the hamburger menu, it renders
	inline as a collapsible section: a labelled row with a chevron that expands/collapses a flat,
	native-looking list of sub-nav items (starts collapsed). No nested floating panel, and each child
	<code>HeaderNavLink</code> drops its icon and rich card layout so it reads as a plain sub-item.
	Put your <code>HeaderNavLink</code>s directly inside it as <code>children</code>.
</p>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>label</code></div>
		<div></div>
		<div>
			<b>Required.</b> The trigger text / mobile section label, e.g. <code>"Resources"</code>.
		</div>
	</TableRow>
	<TableRow>
		<div><code>active</code></div>
		<div><code>false</code></div>
		<div>Highlights the trigger, e.g. when one of the child pages is the current page.</div>
	</TableRow>
	<TableRow>
		<div><code>width</code></div>
		<div><code>300</code></div>
		<div>Width of the desktop dropdown panel.</div>
	</TableRow>
	<TableRow>
		<div><code>align</code></div>
		<div><code>"center"</code></div>
		<div>Alignment of the desktop dropdown panel, passed to <code>Dropdown</code>.</div>
	</TableRow>
</Table>

<h2 id="examples">Example</h2>

<CodeBlock
	code={`
    <` +
		`script>
        import Header from "@hyvor/design/marketing/Header.svelte";
        import { HeaderNavLink, HeaderNavMenu } from "@hyvor/design/marketing";
        import { Button } from "@hyvor/design/components";
        import IconPalette from "@hyvor/icons/IconPalette";
        import IconPuzzle from "@hyvor/icons/IconPuzzle";

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

            <HeaderNavMenu
                label="Resources"
                active={page.url.pathname === '/themes' || page.url.pathname.startsWith('/integrations')}
            >
                <HeaderNavLink href="/themes" active={page.url.pathname === '/themes'}>
                    {#snippet start()}<IconPalette size={15} />{/snippet}
                    Themes
                    {#snippet description()}Blog themes to match your brand{/snippet}
                </HeaderNavLink>
                <HeaderNavLink href="/integrations" active={page.url.pathname.startsWith('/integrations')}>
                    {#snippet start()}<IconPuzzle size={15} />{/snippet}
                    Integrations
                    {#snippet description()}Connect with your favorite tools{/snippet}
                </HeaderNavLink>
            </HeaderNavMenu>
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

<h2 id="header-language-toggle">HeaderLanguageToggle</h2>

<p>
	<code>HeaderLanguageToggle</code> is for marketing sites that serve each language on its own URL
	(e.g. a SvelteKit <code>[[lang]]</code> route param) rather than switching language client-side on
	one page. Use it inside the <code>center</code> slot, next to your
	<code>HeaderNavLink</code>s. It's not related to
	<a href="i18n"><code>InternationalizationService</code></a>/<code>LanguageToggle</code>, which
	swap translated strings in place on a single page; use that instead if you don't have per-language
	routes. See it in action in the header of <a href="/test">/test</a>.
</p>

<p>
	On desktop it shows the current flag as a caret-less trigger (separated from the nav links by a
	thin divider) and opens a dropdown of languages. Below <code>992px</code>, inside the hamburger
	menu, it drops the divider and renders the languages as a collapsible "Change language" section
	(same chevron pattern as <a href="#header-nav-menu"><code>HeaderNavMenu</code></a>).
</p>

<h3 id="header-language-toggle-props">Properties</h3>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>languages</code></div>
		<div></div>
		<div>An array of <code>{'{ code, flag, name }'}</code>.</div>
	</TableRow>
	<TableRow>
		<div><code>current</code></div>
		<div></div>
		<div>Code of the language the current page is showing.</div>
	</TableRow>
	<TableRow>
		<div><code>href</code></div>
		<div></div>
		<div>
			<code>{'(code: string) => string'}</code>. Returns the URL for switching to the given language
			code. Build it however your routing works, e.g. with
			<code>buildLocalizedUrl</code> below.
		</div>
	</TableRow>
	<TableRow>
		<div><code>showName</code></div>
		<div><code>false</code></div>
		<div>Shows the language name next to the flag in the trigger, not just the flag.</div>
	</TableRow>
	<TableRow>
		<div><code>align</code></div>
		<div><code>"center"</code></div>
		<div>Passed to the underlying <code>Dropdown</code>.</div>
	</TableRow>
	<TableRow>
		<div><code>position</code></div>
		<div><code>"bottom"</code></div>
		<div>Passed to the underlying <code>Dropdown</code>.</div>
	</TableRow>
	<TableRow>
		<div><code>label</code></div>
		<div><code>"Change language"</code></div>
		<div>
			<code>aria-label</code> for the trigger button. Translate this when localizing the page.
		</div>
	</TableRow>
</Table>

<h3 id="header-language-toggle-url">buildLocalizedUrl</h3>

<p>
	A small helper for the common convention where the default language is served without a prefix and
	every other language is served under <code>/{'{code}'}</code>:
</p>

<CodeBlock
	code={`
buildLocalizedUrl(path: string, currentLang: string, targetLang: string, defaultLang: string): string

buildLocalizedUrl('/pricing', 'en', 'fr', 'en') // '/fr/pricing'
buildLocalizedUrl('/fr/pricing', 'fr', 'en', 'en') // '/pricing'
buildLocalizedUrl('/fr', 'fr', 'en', 'en') // '/'
`}
/>

<p>
	If your app routes languages differently (a subdomain per locale, a query param, ...), skip
	<code>buildLocalizedUrl</code> and build <code>href</code> yourself.
	<code>HeaderLanguageToggle</code>
	doesn't assume any particular URL scheme.
</p>

<h3 id="header-language-toggle-example">Example</h3>

<CodeBlock
	code={`
<` +
		`script>
    import { HeaderLanguageToggle, buildLocalizedUrl } from "@hyvor/design/marketing";
    import { page } from '$app/stores';

    const languages = [
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' }
    ];
    const defaultLanguage = 'en';

    const currentLang = $derived(
        languages.find((l) => l.code === $page.url.pathname.split('/')[1])?.code ?? defaultLanguage
    );
</script>

<Header product="blogs">
    {#snippet center()}
        <HeaderNavLink href="/pricing">Pricing</HeaderNavLink>
        <HeaderNavLink href="/docs">Docs</HeaderNavLink>

        <HeaderLanguageToggle
            {languages}
            current={currentLang}
            href={(code) => buildLocalizedUrl($page.url.pathname, currentLang, code, defaultLanguage)}
        />
    {/snippet}
</Header>
`}
/>
