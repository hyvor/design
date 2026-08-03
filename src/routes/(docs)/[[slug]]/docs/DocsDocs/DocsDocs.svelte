<script>
	import DocImage from '$lib/marketing/Docs/DocsImage.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import img from './img.avif';
</script>

<h1>Docs</h1>

<p>
	The <code>Docs</code> component renders a full documentation site: a collapsible nav with breadcrumbs,
	the page content, and a table of contents sidebar generated from the page's headings. It is fully
	mobile responsive.
</p>

<h2 id="structure">Folder Structure</h2>

<p>Create a route structure like this:</p>

<CodeBlock
	code={`
    src/routes
    ├── my-docs
    │   ├── [[slug]]
    │   │   ├── docs
    │   │   │   ├── Introduction.svelte
    │   │   │   ├── Installation.svelte
    │   │   │   ├── ...
    │   │   ├── +page.svelte
    │   │   ├── +page.ts
`}
/>

<p>
	Each file in <code>docs</code> is a plain Svelte component that renders the content of a single
	page - headings, paragraphs, code blocks, images, or whatever else the page needs.
</p>

<h2 id="navigation">Defining the Navigation</h2>

<p>
	In <code>+page.ts</code>, build a <code>NavSectionConfig[]</code> tree describing every page and
	pass it, along with the current slug, to <code>loadDocsPage</code> inside the <code>load</code>
	function.
</p>

<CodeBlock
	code={`
    import { loadDocsPage } from '@hyvor/design/marketing';
    import type { NavSectionConfig } from '@hyvor/design/marketing';
    import Introduction from './docs/Introduction.svelte';
    import Installation from './docs/Installation.svelte';
    import Configuration from './docs/Configuration.svelte';

    const SECTIONS: NavSectionConfig[] = [
        {
            navs: [
                { type: 'page', name: 'Introduction', slug: '', content: Introduction }
            ]
        },
        {
            name: 'Getting Started',
            navs: [
                { type: 'page', name: 'Installation', slug: 'installation', content: Installation },
                { type: 'page', name: 'Configuration', slug: 'configuration', content: Configuration }
            ]
        }
    ];

    export async function load({ params }) {
        return loadDocsPage({
            basepath: '/my-docs',
            sections: SECTIONS,
            slug: params.slug ?? ''
        });
    }
`}
	language="ts"
/>

<p>
	A <code>NavSectionConfig</code> is a group of nav items with an optional <code>name</code>, shown
	as a heading above the group (omit it for an untitled top group, as with "Introduction" above).
	Each item inside <code>navs</code> is a <code>NavConfig</code>, one of three types:
</p>

<ul>
	<li>
		<code>page</code> - a leaf page. Needs a unique <code>slug</code> and a <code>content</code>
		component. Set <code>wide: true</code> on a page to make it take the full content width, with
		no fixed reading column and no table of contents sidebar - useful for API references.
	</li>
	<li>
		<code>folding-section</code> - a collapsible group of nav items, nested inline in the same nav
		list.
	</li>
	<li>
		<code>sub-section</code> - an entirely separate <code>NavSectionConfig[]</code> tree, reached by
		navigating to it. The nav swaps to show only that sub-section's own items, and a breadcrumb
		(e.g. "Docs -&gt; Self Hosting") appears above it to navigate back out. Useful for keeping large,
		self-contained parts of the docs out of the main nav list. Sub-sections can be nested within
		each other, and within folding sections.
	</li>
</ul>

<CodeBlock
	code={`
    {
        type: 'folding-section',
        name: 'Guides',
        navs: [
            { type: 'page', name: 'Overview', slug: 'guides-overview', content: GuidesOverview }
        ]
    }

    {
        type: 'sub-section',
        name: 'Self Hosting',
        sections: [
            {
                navs: [
                    {
                        type: 'page',
                        name: 'Installation',
                        slug: 'self-hosting-installation',
                        content: SelfHostingInstallation
                    }
                ]
            }
        ]
    }
`}
	language="ts"
/>

<p>
	The root breadcrumb label defaults to "Docs" - pass <code>rootName</code> to
	<code>loadDocsPage</code> to customize it.
</p>

<h2 id="page">The Page Component</h2>

<p>
	In <code>+page.svelte</code>, render the <code>Docs</code> component with the data returned by
	<code>load</code>. Wrap it with your own header/footer as needed (see
	<a href="/page-structure">Page Structure</a>).
</p>

<CodeBlock
	code={`
    <` +
		`script lang="ts">
        import { Docs } from '@hyvor/design/marketing';
        let { data } = $props();
    </` +
		`script>

    <Docs {...data} />
`}
	language="svelte"
/>

<h2 id="content-components">Content Components</h2>

<p>There are a few components to use inside your content pages.</p>

<h3 id="image">DocsImage</h3>

<CodeBlock
	code={`
    <` +
		`script>
        import { DocsImage } from '@hyvor/design/marketing';
        import img from './img.png';
    </script>

    <DocsImage src={img} alt="Desert" />
`}
/>

<DocImage src={img} alt="img" />
