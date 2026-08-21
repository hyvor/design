<script>
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Hero from '$lib/marketing/Hero/Hero.svelte';
	import FeatureSplit from '$lib/marketing/FeatureSplit/FeatureSplit.svelte';
	import Testimonials from '$lib/marketing/Testimonials/Testimonials.svelte';
	import AllFeaturesAccordion from '$lib/marketing/AllFeaturesAccordion/AllFeaturesAccordion.svelte';
	import FAQ from '$lib/marketing/FAQ/FAQ.svelte';
	import FullTrialSignup from '$lib/marketing/FullTrialSignup/FullTrialSignup.svelte';
	import IconImage from '@hyvor/icons/IconImage';
	import IconPencil from '@hyvor/icons/IconPencil';
	import IconCode from '@hyvor/icons/IconCode';
	import IconSignpost2 from '@hyvor/icons/IconSignpost2';
	import IconTag from '@hyvor/icons/IconTag';
	import IconRss from '@hyvor/icons/IconRss';
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

<p>
	And for the main content area, stack the following sections in whatever order tells your product's
	story:
</p>

<ul>
	<li><code>{'<Hero>'}</code></li>
	<li><code>{'<FeatureSplit>'}</code></li>
	<li><code>{'<Testimonials>'}</code></li>
	<li><code>{'<AllFeaturesAccordion>'}</code></li>
	<li><code>{'<FAQ>'}</code></li>
	<li><code>{'<FullTrialSignup>'}</code></li>
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

<h2 id="main-content-area">Main Content Area</h2>

<p>
	These are the sections used to redesign the Hyvor Blogs homepage. Each is a self-contained
	<code>{'<section>'}</code>, generic on copy and (where it makes brand sense) color, so they stack
	to build the body of any marketing page — not just Hyvor Blogs.
</p>

<h3 id="hero">Hero</h3>

<p>
	The big top-of-page section: a title, an optional subtitle, and one or more call-to-action
	buttons, with an optional dot-grid background and a "scroll down" hint.
</p>

<h4 id="hero-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>
			The main heading. A plain string, or a snippet if you need inline markup (e.g. a
			<code>&lt;span class="hl"&gt;</code> for an accent-colored word).
		</div>
	</TableRow>

	<TableRow>
		<div><code>subtitle</code></div>
		<div></div>
		<div>Text under the title. Also accepts a string or a snippet.</div>
	</TableRow>

	<TableRow>
		<div><code>badge</code></div>
		<div></div>
		<div>An optional pill shown above the title. String or snippet.</div>
	</TableRow>

	<TableRow>
		<div><code>buttons</code></div>
		<div></div>
		<div>
			A button config (<code>{'{ href, label, external?, size?, variant? }'}</code>), or an array of
			them, rendered centered under the subtitle.
		</div>
	</TableRow>

	<TableRow>
		<div><code>pattern</code></div>
		<div><code>true</code></div>
		<div>Whether to show the dot-grid background, faded out radially behind the title.</div>
	</TableRow>

	<TableRow>
		<div><code>scrollIndicator</code></div>
		<div><code>true</code></div>
		<div>Whether to show the bouncing "scroll down" hint pinned to the bottom of the hero.</div>
	</TableRow>

	<TableRow>
		<div><code>fullHeight</code></div>
		<div><code>true</code></div>
		<div>
			Fills the viewport below the header. Turn off for a shorter, content-sized hero — e.g. on an
			inner page.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the theme accent — used by the badge, <code>.hl</code>, <code>.marker</code>, and
			the scroll indicator's dot — just for this hero, without touching
			<code>--accent</code> for the rest of the page.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColorDark</code></div>
		<div></div>
		<div>
			Overrides <code>accentColor</code> in dark mode. Optional — <code>accentColor</code> is used in
			both themes if omitted.
		</div>
	</TableRow>
</Table>

<p>
	The <code>after</code> slot renders extra content under the buttons (e.g. a trial-checks row).
	When <code>title</code> or <code>subtitle</code> is passed as a snippet, two helper classes are
	available for emphasizing individual words: <code>.hl</code> colors the word with the theme
	accent, and <code>.marker</code> draws an accent-colored highlighter stroke behind it.
</p>

<h4 id="hero-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { Hero } from "@hyvor/design/marketing";
</script>

<Hero
    accentColor="#c05959"
    buttons={{ href: "/console?signup", label: "Start your blog" }}
>
    {#snippet title()}
        You Publish.<br />
        <span class="heading-small">(We'll handle the rest)</span>
    {/snippet}
    {#snippet subtitle()}
        Hyvor Blogs is our <span class="marker">blogging platform</span>. It's
        <span class="hl">fast</span>, <span class="hl">simple</span>, and
        <span class="hl">open-source</span>!
    {/snippet}
</Hero>
`}
/>

<p><em>The preview below uses <code>fullHeight={'{false}'}</code> to fit this docs page.</em></p>

<CodeResult white>
	<Hero
		fullHeight={false}
		accentColor="#c05959"
		buttons={{ href: '/console?signup', label: 'Start your blog' }}
	>
		{#snippet title()}
			You Publish.<br />
			<span class="heading-small">(We'll handle the rest)</span>
		{/snippet}
		{#snippet subtitle()}
			Hyvor Blogs is our <span class="marker">blogging platform</span>. It's
			<span class="hl">fast</span>, <span class="hl">simple</span>, and
			<span class="hl">open-source</span>!
		{/snippet}
	</Hero>
</CodeResult>

<h3 id="feature-split">Feature Split</h3>

<p>
	A two-column "text next to a visual" section, used to walk through one feature at a time. The text
	column (eyebrow, title, description, checklist bullets, buttons) sits next to a
	<code>visual</code> snippet you control — a screenshot, an illustration, an interactive mockup, anything.
</p>

<h4 id="feature-split-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>eyebrow</code></div>
		<div></div>
		<div>Small uppercase label above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>The section heading. String (rendered as HTML) or a snippet.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div></div>
		<div>Paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>bullets</code></div>
		<div><code>[]</code></div>
		<div>A checklist of short strings shown under the description.</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div></div>
		<div>
			A button config (<code>{'{ href, label, external? }'}</code>), or an array of them.
		</div>
	</TableRow>

	<TableRow>
		<div><code>flip</code></div>
		<div><code>false</code></div>
		<div>Puts the visual on the left and the text on the right.</div>
	</TableRow>

	<TableRow>
		<div><code>altBg</code></div>
		<div><code>false</code></div>
		<div>
			Tints the section background with the theme accent, to alternate sections down a page.
		</div>
	</TableRow>

	<TableRow>
		<div><code>overlap</code></div>
		<div><code>false</code></div>
		<div>
			Lets the visual bleed under the text column (e.g. a visual with a negative margin) while
			keeping the text readable on top of it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>interactiveBullets</code></div>
		<div><code>false</code></div>
		<div>
			Makes the bullets clickable tabs. The clicked (or auto-advancing) bullet's index is passed to
			the <code>visual</code> snippet, so it can switch state to match.
		</div>
	</TableRow>

	<TableRow>
		<div><code>max</code></div>
		<div><code>false</code></div>
		<div>Set the width to 1440px instead of the default 1000px.</div>
	</TableRow>
</Table>

<p>
	Slots: <code>visual</code> is the right (or left, with <code>flip</code>) column, and receives the
	active bullet index as its only argument. <code>left</code> replaces the entire text column with
	your own content, when the default layout doesn't fit. <code>after</code> renders extra content below
	the split, inside a wider (1400px) container.
</p>

<h4 id="feature-split-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { FeatureSplit } from "@hyvor/design/marketing";
</script>

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
>
    {#snippet visual()}
        <!-- your screenshot, illustration, or interactive mockup -->
    {/snippet}
</FeatureSplit>
`}
/>

<CodeResult white>
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
	>
		{#snippet visual()}
			<div class="visual-placeholder hds-box">
				<IconImage size={40} />
			</div>
		{/snippet}
	</FeatureSplit>
</CodeResult>

<h3 id="testimonials">Testimonials</h3>

<p>
	A drag-to-scroll row of customer quote cards, with a matching "coming soon" style card for video
	testimonials. Each text review gets a deterministic, placeholder avatar (a colored identicon) when
	no real photo exists yet.
</p>

<h4 id="testimonials-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div><code>"Testimonials"</code></div>
		<div>Small uppercase label above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"Loved by our customers."</code></div>
		<div>The section heading. Rendered as HTML, so it can include line breaks.</div>
	</TableRow>

	<TableRow>
		<div><code>reviews</code></div>
		<div></div>
		<div>
			An array of reviews. A text review is
			<code>{'{ type: "text", name, role, quote }'}</code>; a video review is
			<code>{'{ type: "video", name, role, videoUrl?, posterUrl? }'}</code>
			(rendered as a disabled play button until you wire up playback).
		</div>
	</TableRow>

	<TableRow>
		<div><code>handwrittenNames</code></div>
		<div><code>true</code></div>
		<div>
			Sets reviewer names in a handwritten-style font (loaded from Bunny Fonts). Turn off to use the
			regular typeface, e.g. if the page can't reach an external font host.
		</div>
	</TableRow>
</Table>

<h4 id="testimonials-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { Testimonials } from "@hyvor/design/marketing";

    const reviews = [
        {
            type: 'text',
            name: 'Lionel S.',
            role: 'Blogger',
            quote: 'I need a simple, easy-to-use, fast, beautiful and mature blogging tool. Hyvor Blogs handles this beautifully.'
        },
        {
            type: 'video',
            name: 'Video testimonial',
            role: 'Coming soon'
        },
        {
            type: 'text',
            name: 'Manoj P.',
            role: 'Senior Application Engineer',
            quote: 'The platform offers a seamless and user-friendly experience for both bloggers and readers.'
        }
    ];
</script>

<Testimonials {reviews} />
`}
/>

<CodeResult white>
	<Testimonials
		reviews={[
			{
				type: 'text',
				name: 'Lionel S.',
				role: 'Blogger',
				quote:
					'I need a simple, easy-to-use, fast, beautiful and mature blogging tool. Hyvor Blogs handles this beautifully.'
			},
			{
				type: 'video',
				name: 'Video testimonial',
				role: 'Coming soon'
			},
			{
				type: 'text',
				name: 'Manoj P.',
				role: 'Senior Application Engineer',
				quote:
					'The platform offers a seamless and user-friendly experience for both bloggers and readers.'
			}
		]}
	/>
</CodeResult>

<h3 id="all-features-accordion">All Features Accordion</h3>

<p>
	A "catch-all" section for a long feature list that doesn't fit in the main
	<a href="#feature-split">Feature Split</a> sections — grouped into categories, each expandable into
	a grid of feature cards with a large, faint watermark icon.
</p>

<h4 id="all-features-accordion-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"And There's More..."</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>categories</code></div>
		<div></div>
		<div>
			An array of <code>{'{ label, icon, color?, features }'}</code>. <code>color</code> is any CSS
			color (e.g. <code>"var(--green)"</code> or <code>"#4b874b"</code>) and defaults to the theme
			accent. Each <code>features</code> entry is
			<code>{'{ icon, title, description }'}</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>defaultOpenIndex</code></div>
		<div><code>0</code></div>
		<div>Index of the category open by default. Pass <code>-1</code> for none.</div>
	</TableRow>
</Table>

<h4 id="all-features-accordion-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { AllFeaturesAccordion } from "@hyvor/design/marketing";
    import IconPencil from "@hyvor/icons/IconPencil";
    import IconImage from "@hyvor/icons/IconImage";
    import IconCode from "@hyvor/icons/IconCode";
    import IconSignpost2 from "@hyvor/icons/IconSignpost2";
    import IconTag from "@hyvor/icons/IconTag";
    import IconRss from "@hyvor/icons/IconRss";

    const categories = [
        {
            label: 'Post Editor',
            icon: IconPencil,
            color: 'var(--green)',
            features: [
                { icon: IconPencil, title: 'All the basics', description: 'Bold, italic, headings, lists, quotes, links, and more.' },
                { icon: IconImage, title: 'Images', description: 'Upload, paste, drag and drop, and more ways to add images.' },
                { icon: IconCode, title: 'Embeds', description: 'Easily embed from YouTube, X, Instagram, and 1000+ platforms.' }
            ]
        },
        {
            label: 'Your Blog',
            icon: IconSignpost2,
            color: 'var(--blue)',
            features: [
                { icon: IconTag, title: 'Tags', description: 'Organize your posts with tags.' },
                { icon: IconRss, title: 'Atom (RSS) Feed', description: 'Atom feeds are generated automatically.' }
            ]
        }
    ];
</script>

<AllFeaturesAccordion {categories} />
`}
/>

<CodeResult white>
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
					},
					{
						icon: IconCode,
						title: 'Embeds',
						description: 'Easily embed from YouTube, X, Instagram, and 1000+ platforms.'
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
</CodeResult>

<h3 id="faq">FAQ</h3>

<p>
	Renders a list of questions as an accordion, split into one or two columns. It also emits a
	matching <code>FAQPage</code> JSON-LD rich schema into <code>&lt;svelte:head&gt;</code>, generated
	from the same data that renders the accordion.
</p>

<h4 id="faq-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>items</code></div>
		<div></div>
		<div>
			An array of <code>{'{ q, a }'}</code>. <code>a</code> is answer HTML — used verbatim both as
			the rendered answer and as the rich schema's answer text, so keep it to the limited formatting
			<a
				href="https://developers.google.com/search/docs/appearance/structured-data/faqpage"
				target="_blank">Google's FAQPage guidelines</a
			>
			allow.
		</div>
	</TableRow>

	<TableRow>
		<div><code>columns</code></div>
		<div><code>2</code></div>
		<div>
			<code>1</code> or <code>2</code>. With 2, items are split left-to-right, top-to-bottom, and
			stack to a single column under 768px regardless.
		</div>
	</TableRow>

	<TableRow>
		<div><code>richSchema</code></div>
		<div><code>true</code></div>
		<div>Whether to emit the FAQPage JSON-LD script.</div>
	</TableRow>
</Table>

<h4 id="faq-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { FAQ } from "@hyvor/design/marketing";

    const items = [
        { q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
        { q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
        { q: 'Do you offer discounts?', a: 'Yes, see our <a href="/pricing">pricing page</a>.' },
        { q: 'Is my data secure?', a: 'Yes, see our <a href="/security">security page</a>.' }
    ];
</script>

<FAQ {items} />
`}
/>

<CodeResult white>
	<FAQ
		items={[
			{ q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
			{ q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
			{
				q: 'Do you offer discounts?',
				a: 'Yes, see our <a href="/pricing">pricing page</a>.'
			},
			{ q: 'Is my data secure?', a: 'Yes, see our <a href="/security">security page</a>.' }
		]}
	/>
</CodeResult>

<h3 id="full-trial-signup">Full Trial Signup</h3>

<p>
	A full-width, centered call-to-action section — typically used near the bottom of a marketing page
	— with a title, a description, one or more buttons, and a row of reassurance checks (e.g. "No
	credit card required").
</p>

<h4 id="full-trial-signup-props">Properties</h4>

<Table columns="1fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>badge</code></div>
		<div><code>null</code></div>
		<div>An optional pill shown above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"Start your trial today"</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div></div>
		<div>Paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div></div>
		<div>
			A button config (<code>{'{ href, label, external? }'}</code>), or an array of them.
		</div>
	</TableRow>

	<TableRow>
		<div><code>checks</code></div>
		<div><code>['14-day free trial', 'No credit card required', 'Cancel anytime']</code></div>
		<div>
			A row of short reassurance items, each shown with a checkmark. Pass <code>[]</code> to hide.
		</div>
	</TableRow>
</Table>

<h4 id="full-trial-signup-example">Example</h4>

<CodeBlock
	code={`
<` +
		`script>
    import { FullTrialSignup } from "@hyvor/design/marketing";
</script>

<FullTrialSignup
    badge="Open-source &amp; free to try"
    title="Start your blog today"
    description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
    button={{ href: '/console?signup', label: 'Start your blog →' }}
/>
`}
/>

<CodeResult white>
	<FullTrialSignup
		badge="Open-source &amp; free to try"
		title="Start your blog today"
		description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
		button={{ href: '/console?signup', label: 'Start your blog →' }}
	/>
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

<style>
	.visual-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 260px;
		color: var(--text-light);
	}

	:global(.heading-small) {
		font-size: 0.75em;
	}
</style>
