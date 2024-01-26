<script>
	import DocImage from '../../../../lib/marketing/Docs/Content/DocsImage.svelte';
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";

    import img from './img.avif';
</script>

<h1>Docs</h1>

<p>
    There are a few components to create documentation pages.
</p>

<h2 id="structure">Docs Structure</h2>

<p>
    Create a route structure like this:
</p>

<CodeBlock code={`
    src/routes
    ├── docs
    |   ├── [[slug]]
    |   |   ├── content
    |   |   |   ├── Index.svelte
    |   |   |   ├── ...
    |   |   ├── +page.svelte
    |   |   ├── +page.ts
    |   |   ├── docs.ts
`} />

<p>
    First, define the docs categories and pages in the <code>docs.ts</code> file.
</p>

<CodeBlock code={`
    export const categories = [
        {
            name: 'Getting Started',
            pages: [
                {
                    name: 'Introduction',
                    slug: 'introduction'
                },
                {
                    name: 'Installation',
                    slug: 'installation'
                }
            ]
        },
        ...
    ] as Category[];
    export const pages = categories.reduce((acc, category) => acc.concat(category.pages), [] as Page[]);

    interface Category {
        name: string,
        pages: Page[]
    }

    interface Page {
        slug: string,
        name: string,
        component: ComponentType
    }
`} language="ts" />

<p>
    Then, load the docs content in the <code>page.ts</code> file.
</p>

<CodeBlock code={`
    import { error } from "@sveltejs/kit";
    import { pages } from "./docs";

    export async function load({ params }) {
        const slug = params.slug;
        const page = slug === undefined ? pages[0] : pages.find(p => p.slug === slug);

        if(!page) {
            error(404, 'Not found');
        }

        return {
            slug: params.slug,
            name: page.name,
            component: page.component
        }
    }
`} language="ts" />

<p>
    Then, design the layout in the <code>+page.svelte</code> file using the data from the previous step.
</p>

<CodeBlock code={`
    <` + `script lang="ts">
        import { 
            Docs, 
            DocsNav as Nav, 
            DocsNavCategory as NavCategory, 
            DocsNavItem as NavItem, 
            DocsContent as Content
        } from '@hyvor/design/marketing';
        import { categories } from "./docs";
        export let data;
    </` + `script>
    <Docs>
        <Nav slot="nav">
            {#each categories as category}
                <NavCategory name={category.name}>
                    {#each category.pages as page}
                        <NavItem 
                            href={page.slug === '' ? '/docs' : ` + '`/docs/${page.slug}`' + `}
                        >{page.name}</NavItem>
                    {/each}
                </NavCategory>
            {/each}
        </Nav>
        <Content slot="content">
            <svelte:component this={data.component} />
        </Content>
    </Docs>
`} language="svelte" />

<h2 id="content-components">
    Content Components
</h2>

<p>
    There are a few components to create content pages.
</p>

<h3 id="image">DocsImage</h3>

<CodeBlock code={`
    <` + `script>
        import { DocsImage } from '@hyvor/design/marketing';
        import img from './img.png';
    </script>

    <DocsImage src={img} alt="Desert" />
`} />

<DocImage src={img} alt="img" />