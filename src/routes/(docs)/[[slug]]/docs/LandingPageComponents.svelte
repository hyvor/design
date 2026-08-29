<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Landing Page Components</h1>

<p>
	Stack these inside <code>{'<Base>'}</code>, between
	<a href="/header"><code>{'<Header>'}</code></a>
	and <a href="/footer"><code>{'<Footer>'}</code></a>, in whatever order tells your product's story.
	See them all assembled on a real page at <a href="/test">/test</a>, which is also where to check
	how a component actually looks, since the examples below are code-only.
</p>

<ul>
	<li><a href="#hero"><code>{'<Hero>'}</code></a></li>
	<li><a href="#logo-strip"><code>{'<LogoStrip>'}</code></a></li>
	<li><a href="#feature-split"><code>{'<FeatureSplit>'}</code></a></li>
	<li><a href="#testimonials"><code>{'<Testimonials>'}</code></a></li>
	<li><a href="#all-features-accordion"><code>{'<AllFeaturesAccordion>'}</code></a></li>
	<li><a href="#faq"><code>{'<FAQ>'}</code></a></li>
	<li><a href="#full-trial-signup"><code>{'<FullTrialSignup>'}</code></a></li>
	<li><a href="#spotlight-split"><code>{'<SpotlightSplit>'}</code></a></li>
</ul>

<h2 id="hero">Hero</h2>

<p>
	The first section of a marketing homepage: a large title, an optional badge and subtitle, one or
	more call-to-action buttons, and a dotted background pattern. Place it as the first child inside
	<code>{'<Base>'}</code>, right after <code>{'<Header>'}</code>.
</p>

<h3>Properties</h3>

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
			second line). See <a href="#hero-highlighting">Highlighting translatable text</a> below for how
			to emphasize part of it.
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

<h3>Example</h3>

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

<h3 id="hero-highlighting">Highlighting translatable text</h3>

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

<h2 id="logo-strip">LogoStrip</h2>

<p>
	A strip of customer/partner logos, usually placed right under <a href="#hero">Hero</a>. By default
	it scrolls as an infinite <code>marquee</code> (pauses on hover, and falls back to a static
	wrapped row for <code>prefers-reduced-motion</code>); set <code>marquee={false}</code>
	for a plain wrapped row instead. Logos are dimmed and forced to a single color by default (<code
		>invert</code
	>), so a mixed set of brand marks reads as one consistent row instead of competing with each
	other; opt individual opaque/full-color logos out with <code>color</code>.
</p>

<h3>Properties</h3>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>logos</code></div>
		<div></div>
		<div>
			<b>Required.</b> An array of
			<code>{'{ name, src, href?, width?, height?, color? }'}</code>. <code>width</code>/<code
				>height</code
			>
			default to <code>120</code>/<code>28</code> per logo, matching each logo's own aspect ratio.
			Set <code>color</code> on a logo to keep it in its real colors regardless of
			<code>invert</code>
			(e.g. an opaque, full-color app icon that would otherwise crush into a blank box under the white
			silhouette treatment).
		</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div><code>''</code></div>
		<div>
			Small uppercase label above the logos, e.g. <code>"Trusted by 100+ businesses"</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>background</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			The section's background color. Any CSS color works: a hex value, another theme variable, <code
				>rgb()</code
			>/<code>hsl()</code>, etc.
		</div>
	</TableRow>

	<TableRow>
		<div><code>invert</code></div>
		<div><code>true</code></div>
		<div>
			Forces every logo (except ones marked <code>color</code>) to solid white via
			<code>filter</code>, for a colored/dark <code>background</code>. Turn off on a light/neutral
			background to show logos in their original colors.
		</div>
	</TableRow>

	<TableRow>
		<div><code>marquee</code></div>
		<div><code>true</code></div>
		<div>
			Scrolls the logos as an infinite, edge-faded, hover-to-pause marquee. Set to
			<code>false</code> for a plain centered row that wraps onto multiple lines instead.
		</div>
	</TableRow>

	<TableRow>
		<div><code>speed</code></div>
		<div><code>34</code></div>
		<div>Seconds for one full marquee loop. Only used when <code>marquee</code> is on.</div>
	</TableRow>
</Table>

<h3>Example</h3>

<CodeBlock
	code={`
		<LogoStrip
			label="Trusted by 10,000+ websites & businesses"
			logos={[
				{ name: 'Elementor', src: '/customers/elementor.png' },
				{ name: 'Stanford University', src: '/customers/stanford.png', width: 125, height: 40 },
				{ name: 'ACCA', src: '/customers/acca.png', width: 44, height: 44, color: true },
				{ name: 'El Debate', src: '/customers/eldebate.png', width: 140, height: 28 }
			]}
		/>
	`}
/>

<h2 id="feature-split">Feature Split</h2>

<p>
	A two-column section: text (eyebrow, title, description, bullets, a button) on one side and a
	visual on the other. Stack a few of these to walk through a product's main features, alternating
	<code>flip</code> to keep the page from feeling one-sided.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>eyebrow</code></div>
		<div></div>
		<div>
			Small label above the title, e.g. <code>"Post Editor"</code>. Required unless
			<code>left</code> is used.
		</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>
			The section heading. <code>string | Snippet</code>, same as <a href="#hero">Hero</a>'s
			<code>title</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div></div>
		<div>A paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>bullets</code></div>
		<div><code>[]</code></div>
		<div>
			A list of short feature bullets, each shown with a check icon, or a Snippet to render
			something else in that spot entirely (e.g. a stat row or a mini form).
			<code>interactiveBullets</code> only applies to the <code>string[]</code> form.
		</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div><code>null</code></div>
		<div>
			One or more <code>{'{ href, label, external? }'}</code> configs, rendered as outline buttons.
		</div>
	</TableRow>

	<TableRow>
		<div><code>visual</code></div>
		<div></div>
		<div>
			<b>Required.</b> Snippet for the other column: an image, a code block, a mock UI, etc.
			Receives
			<code>activeBullet: number</code> when <code>interactiveBullets</code> is on, so the visual can
			switch state to match the selected bullet.
		</div>
	</TableRow>

	<TableRow>
		<div><code>interactiveBullets</code></div>
		<div><code>false</code></div>
		<div>
			Makes the bullets clickable tabs that auto-advance every 5s once the section scrolls into
			view.
		</div>
	</TableRow>

	<TableRow>
		<div><code>flip</code></div>
		<div><code>false</code></div>
		<div>Swaps the text and visual columns (visual on the left).</div>
	</TableRow>

	<TableRow>
		<div><code>altBg</code></div>
		<div><code>false</code></div>
		<div>
			Gives the section an alternate background, to visually separate it from the ones around it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>overlap</code></div>
		<div><code>false</code></div>
		<div>
			Lets the visual bleed under the text column (e.g. a visual with a negative margin), while
			keeping the text readable on top.
		</div>
	</TableRow>

	<TableRow>
		<div><code>max</code></div>
		<div><code>false</code></div>
		<div>
			Uses the wider <code>hds-container-max</code> instead of the default
			<code>hds-container</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>left</code></div>
		<div></div>
		<div>
			Snippet that replaces the entire text column, when <code>eyebrow</code>/<code>title</code
			>/<code>description</code>/<code>bullets</code>/<code>button</code> aren't flexible enough.
		</div>
	</TableRow>

	<TableRow>
		<div><code>after</code></div>
		<div></div>
		<div>Snippet rendered full-width, below the split.</div>
	</TableRow>
</Table>

<h3>Example</h3>

<CodeBlock
	code={`
		<FeatureSplit
			eyebrow="Post Editor"
			title="Write without friction"
			description="A clean, distraction-free editor with everything you need to write and format posts."
			bullets={[
				'Markdown shortcuts for all the formatting you need',
				'Paste, drag and drop, or pick images from Unsplash',
				'Syntax highlighting for 100+ languages'
			]}
			button={{ href: '/console?signup', label: 'Start writing' }}
			interactiveBullets
		>
			{#snippet visual(activeBullet)}
				<div class="visual-placeholder hds-box">
					<IconImage size={40} />
					<span>Active bullet: {activeBullet + 1}</span>
				</div>
			{/snippet}
		</FeatureSplit>
	`}
/>

<h3>Custom content instead of bullets</h3>

<p>
	Pass a Snippet as <code>bullets</code> to render something other than a checklist in that spot, here,
	a small stat row.
</p>

<CodeBlock
	code={`
		<FeatureSplit
			eyebrow="Optimizations"
			title="Built for speed"
			description="All official themes are optimized for speed."
		>
			{#snippet bullets()}
				<div class="stats">
					<div><strong>99</strong><span>Lighthouse score</span></div>
					<div><strong>&lt;200ms</strong><span>Time to first byte</span></div>
				</div>
			{/snippet}
			{#snippet visual()}
				<div class="visual-placeholder hds-box">
					<IconImage size={40} />
				</div>
			{/snippet}
		</FeatureSplit>
	`}
/>

<h2 id="testimonials">Testimonials</h2>

<p>
	A horizontally-scrolling row of customer quotes and (optionally) video reviews. There's no limit
	on how many <code>reviews</code> you pass in: once they don't all fit on screen, the row becomes swipeable:
	touch/trackpad swipe and mouse drag both work, and it snaps to each card as you scroll.
</p>

<p>
	<b>Text reviews</b> show the quote with a generated identicon. <b>Video reviews</b> show the
	<code>posterUrl</code> image with a play button and the optional <code>summary</code> headline
	overlaid; tapping play swaps in a <code>&lt;video&gt;</code> with native controls and the card
	grows. Pausing brings the poster overlay (and <code>summary</code>) back with a "Resume" button.
	Each reviewer's <code>name</code>, <code>role</code> and optional <code>company</code> sit at the bottom
	of every card.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>reviews</code></div>
		<div></div>
		<div>
			Required. An array of text or video reviews, see the shape below. Any number of reviews can be
			passed; the row scrolls once they overflow the screen.
		</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div><code>"Testimonials"</code></div>
		<div>Small label above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"Loved by our customers."</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>handwrittenNames</code></div>
		<div><code>true</code></div>
		<div>
			Sets the reviewer name in a handwritten-style font (Caveat, loaded from Bunny Fonts). Turn off
			to use the regular typeface instead, e.g. if the host page can't reach an external font host.
		</div>
	</TableRow>
</Table>

<h4>The <code>reviews</code> shape</h4>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Field</div>
		<div>Applies to</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>type</code></div>
		<div>both</div>
		<div><code>'text'</code> or <code>'video'</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>name</code></div>
		<div>both</div>
		<div>
			Reviewer name. When no photo is set on a text review, a deterministic, non-photographic
			identicon is generated from it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>role</code></div>
		<div>both</div>
		<div>Reviewer role/title shown under the name.</div>
	</TableRow>

	<TableRow>
		<div><code>company</code></div>
		<div>both</div>
		<div>Optional. Company name shown on its own line under the role.</div>
	</TableRow>

	<TableRow>
		<div><code>companyUrl</code></div>
		<div>both</div>
		<div>
			Optional. Makes <code>company</code> a link to this URL (opens in a new tab). Leave unset for plain
			text.
		</div>
	</TableRow>

	<TableRow>
		<div><code>quote</code></div>
		<div><code>'text'</code></div>
		<div>The quote text.</div>
	</TableRow>

	<TableRow>
		<div><code>videoUrl</code></div>
		<div><code>'video'</code></div>
		<div>Optional. URL of the video to play.</div>
	</TableRow>

	<TableRow>
		<div><code>posterUrl</code></div>
		<div><code>'video'</code></div>
		<div>Optional. Poster image shown before the video plays and while it is paused.</div>
	</TableRow>

	<TableRow>
		<div><code>summary</code></div>
		<div><code>'video'</code></div>
		<div>
			Optional. Short headline shown over the poster, and again whenever the video is paused.
		</div>
	</TableRow>
</Table>

<h3>Example</h3>

<CodeBlock
	code={`
		<Testimonials
			reviews={[
				{
					type: 'text',
					name: 'Lionel S.',
					role: 'Blogger',
					company: 'Solo Press',
					companyUrl: 'https://example.com',
					quote:
						'I need a simple, easy-to-use, fast, beautiful and mature blogging tool that resolves the WordPress bloat. Hyvor Blogs handles this beautifully.'
				},
				{
					type: 'video',
					name: 'Nadia F.',
					role: 'Newsletter creator',
					company: 'Draft & Send',
					videoUrl: '/testimonials/nadia.mp4',
					posterUrl: '/testimonials/nadia.jpg',
					summary: 'Amazing Product'
				},
				{
					type: 'text',
					name: 'Manoj P.',
					role: 'Senior Application Engineer',
					quote:
						'The platform offers a seamless and user-friendly experience for both bloggers and readers. The customization options are extensive.'
				}
			]}
		/>
	`}
/>

<h2 id="all-features-accordion">All Features Accordion</h2>

<p>
	A catch-all "and there's more" section: categories of features, each expandable into a grid of
	icon + title + description cards. Good for listing everything that didn't get its own
	<a href="#feature-split">Feature Split</a> section.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>categories</code></div>
		<div></div>
		<div>Required. An array of feature categories, see the shape below.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"And There's More..."</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>defaultOpenIndex</code></div>
		<div><code>0</code></div>
		<div>
			Index of the category open by default. Use <code>-1</code> to start with all of them collapsed.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the accent used to tint the open category's background, in light mode. This is
			separate from each category's own <code>color</code>, which only tints that category's icon
			badge and its features' watermarks.
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
</Table>

<h4>The <code>categories</code> shape</h4>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Field</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div>Category name, shown as the accordion trigger.</div>
	</TableRow>

	<TableRow>
		<div><code>icon</code></div>
		<div>A <code>@hyvor/icons</code> component for the trigger.</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div>
			Optional. Any CSS color, e.g. <code>'var(--green)'</code> or <code>'#4b874b'</code>, defaults
			to the theme accent.
		</div>
	</TableRow>

	<TableRow>
		<div><code>features</code></div>
		<div>An array of <code>{'{ icon, title, description }'}</code>, one card per feature.</div>
	</TableRow>
</Table>

<h3>Example</h3>

<CodeBlock
	code={`
		<AllFeaturesAccordion
			categories={[
				{
					label: 'Post Editor',
					icon: IconPencil,
					color: 'var(--green)',
					features: [
						{
							icon: IconPencil,
							title: 'All the basics',
							description: 'Bold, italic, headings, lists, quotes, links, and more.'
						},
						{
							icon: IconImage,
							title: 'Images',
							description: 'Upload, paste, drag and drop, and more ways to add images.'
						}
					]
				},
				{
					label: 'Your Blog',
					icon: IconSignpost2,
					color: 'var(--blue)',
					features: [
						{ icon: IconTag, title: 'Tags', description: 'Organize your posts with tags.' },
						{
							icon: IconRss,
							title: 'Atom (RSS) Feed',
							description: 'Atom feeds are generated automatically.'
						}
					]
				}
			]}
		/>
	`}
/>

<h2 id="faq">FAQ</h2>

<p>
	A two-column accordion of frequently asked questions. Unlike the other homepage sections, this one
	isn't full-bleed, so wrap it in your own heading and a <code>.hds-container</code>, as shown in
	the example.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>items</code></div>
		<div></div>
		<div>
			Required. An array of <code>{'{ q, a }'}</code>. <code>a</code> is rendered as HTML, and used verbatim
			as the rich schema's answer text.
		</div>
	</TableRow>

	<TableRow>
		<div><code>columns</code></div>
		<div><code>2</code></div>
		<div>
			<code>1</code> or <code>2</code>. Items are split left-to-right, top-to-bottom within each
			column. Regardless of this setting, the layout always collapses to a single column below
			768px, so mobile visitors never see a cramped two-column grid.
		</div>
	</TableRow>

	<TableRow>
		<div><code>richSchema</code></div>
		<div><code>true</code></div>
		<div>
			Emits a <code>FAQPage</code> JSON-LD rich schema into <code>{'<svelte:head>'}</code>,
			generated straight from <code>items</code>, for Google's FAQ rich results.
		</div>
	</TableRow>

	<TableRow>
		<div><code>toggleIconBg</code></div>
		<div><code>var(--accent-light)</code></div>
		<div>Overrides the background color of the round expand/collapse icon.</div>
	</TableRow>
</Table>

<h3>Example</h3>

<CodeBlock
	code={`
		<div class="hds-container">
			<h2>Frequently asked questions</h2>
			<FAQ
				items={[
					{ q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
					{ q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
					{
						q: 'Do you offer discounts?',
						a: 'Yes, see our <a href="/pricing">pricing page</a> for details.'
					}
				]}
			/>
		</div>
	`}
/>

<h2 id="full-trial-signup">Full Trial Signup</h2>

<p>
	A closing call-to-action section: a title, a description, a button, and a row of reassurance
	checks (e.g. "No credit card required"). Use it as the last section before the footer.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"Start your trial today"</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>badge</code></div>
		<div><code>null</code></div>
		<div>Small pill shown above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div><code>null</code></div>
		<div>
			One or more <code>{'{ href, label, external? }'}</code> configs, rendered as large buttons.
		</div>
	</TableRow>

	<TableRow>
		<div><code>checks</code></div>
		<div><code>['14-day free trial', 'No credit card required', 'Cancel anytime']</code></div>
		<div>A row of short reassurance points, each shown with a check icon.</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the accent used by the background gradient, the badge, and the check icons, in light
			mode.
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
</Table>

<p>
	Any other prop passed in (e.g. <code>id</code> or <code>class</code>) is forwarded to the root
	<code>{'<section>'}</code>.
</p>

<h3>Example</h3>

<CodeBlock
	code={`
		<FullTrialSignup
			badge="Open-source & free to try"
			title="Start your blog today"
			description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
			button={{ href: '/console?signup', label: 'Start your blog →' }}
		/>
	`}
/>

<h3>Custom accent color</h3>

<CodeBlock
	code={`
		<FullTrialSignup
			accentColor="var(--red)"
			title="Start your blog today"
			button={{ href: '/console?signup', label: 'Start your blog →' }}
		/>
	`}
/>

<h2 id="spotlight-split">Spotlight Split</h2>

<p>
	A dark, full-width section with an animated grid background that lights up around the cursor: a
	text column (title, description, a small stat row, a button) on one side, and a free-form
	<code>content</code> snippet on the other. It isn't tied to any one topic: the content side can hold
	compliance seals, a logo wall, a quote, stat cards, or anything else that fits a dark panel.
</p>

<h3>Properties</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div><b>Required.</b> The section heading. <code>string | Snippet</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>stats</code></div>
		<div><code>[]</code></div>
		<div>
			A row of short strings shown as small highlights, e.g. <code>"99.9% Uptime"</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div><code>null</code></div>
		<div>
			One or more <code>{'{ href, label, external? }'}</code> configs, rendered as outline buttons.
		</div>
	</TableRow>

	<TableRow>
		<div><code>content</code></div>
		<div></div>
		<div>
			<b>Required.</b> Snippet for the other column. Not limited to any particular shape; lay out whatever
			fits (a grid of icons, a logo wall, a single quote, stat cards, ...).
		</div>
	</TableRow>

	<TableRow>
		<div><code>reverse</code></div>
		<div><code>false</code></div>
		<div>Swaps the text and content columns (content on the left).</div>
	</TableRow>

	<TableRow>
		<div><code>background</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			The section's background color. Any CSS color works: a hex value (<code>"#574443"</code>),
			another theme variable (<code>"var(--red)"</code>), <code>rgb()</code>/<code>hsl()</code>,
			etc.
		</div>
	</TableRow>

	<TableRow>
		<div><code>highlightColor</code></div>
		<div><code>rgba(255, 238, 217, 0.9)</code></div>
		<div>
			Color of the grid lines that light up around the cursor. Pair it with <code>background</code>.
		</div>
	</TableRow>
</Table>

<h3>Example: compliance seals</h3>

<p>
	The use case this section was first built for: an enterprise/security callout. The seal badges (<code
		>GdprSeal</code
	>, <code>CcpaSeal</code>, <code>SsoSeal</code>, <code>IsoSeal</code>) ship as ready-made presets
	built on the generic <code>Seal</code> component, which takes a
	<code>size</code>, an optional <code>pending</code> state (dashed border, muted colors, e.g. for a certification
	that's still in progress), and any content as children.
</p>

<CodeBlock
	code={`
		<SpotlightSplit
			title="Enterprise-ready."
			description="Enterprise-grade security and compliance, without adding complexity to your publishing workflow."
			stats={['> 99.9% Uptime', 'Priority Support']}
			button={{ href: 'https://hyvor.com/enterprise', label: 'Contact Sales', external: true }}
			background="#574443"
		>
			{#snippet content()}
				<div class="seal-grid">
					<GdprSeal />
					<CcpaSeal />
					<SsoSeal />
					<IsoSeal />
				</div>
			{/snippet}
		</SpotlightSplit>
	`}
/>

<h3>Example: a quote, reversed</h3>

<p>
	The same section works for unrelated content too, here a single pull quote, with
	<code>reverse</code> putting it on the left.
</p>

<CodeBlock
	code={`
		<SpotlightSplit
			title="Built by writers, for writers."
			description="Every part of the editor was shaped by feedback from people who publish daily."
			button={{ href: '/console?signup', label: 'Start writing' }}
			background="#2b2440"
			highlightColor="rgba(216, 200, 255, 0.9)"
			reverse
		>
			{#snippet content()}
				<div class="quote hds-box">
					<IconQuote size={22} />
					<p>"The fastest editor I've used for long-form posts, by a wide margin."</p>
					<span>A Hyvor Blogs user</span>
				</div>
			{/snippet}
		</SpotlightSplit>
	`}
/>
