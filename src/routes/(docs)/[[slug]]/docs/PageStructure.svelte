<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import HeaderLanguageToggle from '$lib/marketing/Header/HeaderLanguageToggle.svelte';
	import { buildLocalizedUrl } from '$lib/marketing/Header/language.js';

	const demoLanguages = [
		{ code: 'en', flag: '🇬🇧', name: 'English' },
		{ code: 'fr', flag: '🇫🇷', name: 'Français' }
	];
	let demoCurrentLang = $state('en');

	function onDemoLanguageClick(e: MouseEvent) {
		const a = (e.target as HTMLElement).closest('a[data-lang]');
		if (a) {
			e.preventDefault();
			demoCurrentLang = a.getAttribute('data-lang') ?? demoCurrentLang;
		}
	}
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
			Compact style for links inside a Dropdown's menu (e.g. the header's mobile menu). Implied
			automatically when <code>description</code> is given.
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

<h3 id="examples">Example</h3>

<CodeBlock
	code={`
    <` +
		`script>
        import Header from "@hyvor/design/marketing/Header.svelte";
        import { HeaderNavLink } from "@hyvor/design/marketing";
        import { Button, Dropdown } from "@hyvor/design/components";
        import IconCaretDown from "@hyvor/icons/IconCaretDown";
        import IconPalette from "@hyvor/icons/IconPalette";
        import IconPuzzle from "@hyvor/icons/IconPuzzle";

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

<h3 id="header-language-toggle">HeaderLanguageToggle</h3>

<p>
	<code>HeaderLanguageToggle</code> is for marketing sites that serve each language on its own URL
	(e.g. a SvelteKit <code>[[lang]]</code> route param) rather than switching language client-side on
	one page. Use it inside the <code>center</code> slot, next to your
	<code>HeaderNavLink</code>s. It's not related to
	<a href="i18n"><code>InternationalizationService</code></a>/<code>LanguageToggle</code>, which
	swap translated strings in place on a single page; use that instead if you don't have per-language
	routes.
</p>

<h4 id="header-language-toggle-props">Properties</h4>

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
</Table>

<h4 id="header-language-toggle-url">buildLocalizedUrl</h4>

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

<h4 id="header-language-toggle-example">Example</h4>

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

<p>
	<em>The preview below fakes navigation so you can click through it without leaving this page.</em>
</p>

<CodeResult white>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div onclick={onDemoLanguageClick}>
		<HeaderLanguageToggle
			languages={demoLanguages}
			current={demoCurrentLang}
			href={(code) => buildLocalizedUrl('/pricing', demoCurrentLang, code, 'en')}
		/>
	</div>
</CodeResult>

<h2 id="footer">Footer</h2>

<h3 id="props">Properties</h3>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>name</code></div>
		<div><code>"HYVOR"</code></div>
		<div>The brand name shown top-left.</div>
	</TableRow>

	<TableRow>
		<div><code>subname</code></div>
		<div></div>
		<div>An optional line shown under <code>name</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>product</code></div>
		<div></div>
		<div>
			Product slug (e.g. <code>"blogs"</code>), same as <code>Header</code>. Derives the mascot's
			<code>logo</code> automatically when not given directly.
		</div>
	</TableRow>

	<TableRow>
		<div><code>instance</code></div>
		<div><code>"https://hyvor.com"</code></div>
		<div>Base URL used to build the <code>product</code>-derived mascot logo.</div>
	</TableRow>

	<TableRow>
		<div><code>logo</code></div>
		<div></div>
		<div>
			URL/path to an optional mascot/logo image, overriding the <code>product</code>-derived
			default.
		</div>
	</TableRow>

	<TableRow>
		<div><code>background</code></div>
		<div></div>
		<div>
			A CSS color for the footer. When omitted, the footer stays transparent and follows the app's
			theme.
		</div>
	</TableRow>

	<TableRow>
		<div><code>backgroundDark</code></div>
		<div></div>
		<div>
			Overrides <code>background</code> in dark mode (e.g. a darker variant). Optional —
			<code>background</code> is used in both themes if omitted.
		</div>
	</TableRow>

	<TableRow>
		<div><code>card</code></div>
		<div><code>false</code></div>
		<div>
			Whether <code>background</code> is a branded color needing light text/borders regardless of theme.
			Leave off for a subtle tint that should keep the app's normal text color.
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
			An object mapping social keys to URLs: <code>x</code>, <code>discord</code>,
			<code>github</code>, <code>youtube</code>, <code>linkedin</code>, <code>bluesky</code>. All
			show by default with HYVOR's accounts — pass a key as <code>undefined</code> to hide it.
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
			The link columns area, between the top row and bottom bar. Usually one
			<code>FooterLinkList</code> per column, wrapped in your own container.
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
    backgroundDark="#2a1f1e"
    card={true}
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
