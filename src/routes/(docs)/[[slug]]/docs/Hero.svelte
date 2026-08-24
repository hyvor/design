<script lang="ts">
	import Hero from '$lib/marketing/Hero/Hero.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Hero</h1>

<p>
	The first section of a marketing homepage: a large title, an optional badge and subtitle, one or
	more call-to-action buttons, and a dotted background pattern. Place it as the first child inside
	<code>{'<Base>'}</code>, right after <code>{'<Header>'}</code>.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>
			The main heading. A plain string, or a Snippet if you need inline markup (e.g. a smaller
			second line). See <a href="#highlighting">Highlighting translatable text</a> below for how to emphasize
			part of it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>subtitle</code></div>
		<div></div>
		<div>
			Supporting text under the title. Same <code>string | Snippet</code> shape as
			<code>title</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>badge</code></div>
		<div></div>
		<div>
			A small pill shown above the title, e.g. <code>"Open-source &amp; free to try"</code>. Also
			<code>string | Snippet</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>buttons</code></div>
		<div><code>null</code></div>
		<div>
			One button config, or an array for more than one. Each item is
			<code>{'{ href, label, external?, size?, variant?, ... }'}</code>. Any other prop
			<code>{'<Button>'}</code> accepts is passed through.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the accent used for the badge, the <code>.hds-hl</code> highlight color, and the scroll
			dot, in light mode.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColorDark</code></div>
		<div><code>accentColor</code></div>
		<div>
			Same as <code>accentColor</code>, used in dark mode. Falls back to
			<code>accentColor</code>, then the theme accent.
		</div>
	</TableRow>

	<TableRow>
		<div><code>fullHeight</code></div>
		<div><code>false</code></div>
		<div>
			When <code>true</code>, the hero fills the viewport height below the header instead of sizing
			to its content.
		</div>
	</TableRow>

	<TableRow>
		<div><code>after</code></div>
		<div></div>
		<div>
			Snippet rendered below the buttons, e.g. a product screenshot or a row of customer logos.
		</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
		<Hero
			badge="Open-source & free to try"
			buttons={{ href: '/console?signup', label: 'Start your blog' }}
		>
			{#snippet title()}
				You Publish.<br /><span class="heading-small">(We'll handle the rest)</span>
			{/snippet}
			{#snippet subtitle()}
				Hyvor Blogs is our <span class="hds-marker">blogging platform</span>. It's
				<span class="hds-hl">fast</span>, <span class="hds-hl">simple</span>, and
				<span class="hds-hl">open-source</span>!
			{/snippet}
		</Hero>
	`}
/>

<CodeResult white>
	<Hero
		badge="Open-source & free to try"
		buttons={{ href: '/console?signup', label: 'Start your blog' }}
	>
		{#snippet title()}
			You Publish.<br /><span class="heading-small">(We'll handle the rest)</span>
		{/snippet}
		{#snippet subtitle()}
			Hyvor Blogs is our <span class="hds-marker">blogging platform</span>. It's
			<span class="hds-hl">fast</span>, <span class="hds-hl">simple</span>, and
			<span class="hds-hl">open-source</span>!
		{/snippet}
	</Hero>
</CodeResult>

<h2 id="highlighting">Highlighting translatable text</h2>

<p>
	Two helper classes are styled globally inside the title/subtitle: <code>.hds-hl</code>
	(accent-colored text) and <code>.hds-marker</code> (a highlighter-style background). Wrap the part
	you want emphasized in one of these, inside a <code>{'{#snippet}'}</code> as shown above.
</p>

<p>
	If the text is translated, keep the <code>&lt;span&gt;</code> wrapping in code and let only the
	plain text be translated: with <a href="/i18n"><code>Intl.T</code></a>'s <code>element</code>
	param, translators never write markup:
</p>

<CodeBlock
	code={`
		{#snippet title()}
			<Intl.T key="hero.title" params={{ hl: { element: 'span', props: { class: 'hds-hl' } } }} />
		{/snippet}
	`}
/>

<p>with the locale file holding only plain text and a bare tag name:</p>

<CodeBlock
	language="json"
	code={`
		{
			"hero.title": "You <hl>Publish</hl>."
		}
	`}
/>
