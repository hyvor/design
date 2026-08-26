<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Footer</h1>

<p>
	The marketing site footer: brand name, an email/social row, a center slot for link columns, and a
	bottom bar with copyright, a GDPR badge, and the "From France" flag. Place it right after
	<code>{'<Base>'}</code>, as the last thing on the page.
</p>

<h2 id="props">Properties</h2>

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
			Overrides <code>background</code> in dark mode (e.g. a darker variant). Optional:
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
			show by default with HYVOR's accounts; pass a key as <code>undefined</code> to hide it.
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

	<TableRow>
		<div><code>logoAltText</code></div>
		<div><code>"Logo"</code></div>
		<div>
			The word appended to the mascot's alt text (e.g. "HYVOR Logo"). Translate this when localizing
			the page - <code>name</code> is product-defined and stays as-is.
		</div>
	</TableRow>

	<TableRow>
		<div><code>copyEmailLabel</code></div>
		<div><code>"Copy email"</code></div>
		<div>Tooltip shown on the "copy email" button. Translate this when localizing the page.</div>
	</TableRow>

	<TableRow>
		<div><code>copiedLabel</code></div>
		<div><code>"Copied!"</code></div>
		<div>
			Tooltip shown after the email address is copied. Translate this when localizing the page.
		</div>
	</TableRow>

	<TableRow>
		<div><code>gdprText</code></div>
		<div><code>"GDPR Compliant"</code></div>
		<div>Text on the GDPR compliance chip. Translate this when localizing the page.</div>
	</TableRow>

	<TableRow>
		<div><code>fromFranceText</code></div>
		<div><code>"From France"</code></div>
		<div>
			Text next to the France flag in the bottom bar. Translate this when localizing the page.
		</div>
	</TableRow>
</Table>

<h2 id="slots">Slots</h2>

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

<h2 id="examples">Example</h2>
<p>
	The following example shows how to use the <code>Footer</code> and
	<code>FooterLinkList</code> components to create a branded footer with two columns. See it in the
	full page assembled on <a href="/test">/test</a>.
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
