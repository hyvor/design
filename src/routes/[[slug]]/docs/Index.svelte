<script lang="ts">
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import ColorDot from "./Helper/ColorDot.svelte";
</script>

<h1>Hyvor Design System (HDS)</h1>

<p>
    Hyvor Design System, HDS, is a collection of <a href="https://svelte.dev" target="_blank">Svelte</a> UI components for building HYVOR products. It is open-source and you can view the source code on <a href="https://github.com/hyvor/design" target="_blank">Github</a>. However, it is not recommended to use HDS on non-HYVOR projects as it is not designed to be a general-purpose UI library.
</p>

<h2 id="adoption">HDS across HYVOR</h2>

<p>
    We are incrementally adopting HDS in our products. Here is the current status:
</p>

<Table columns="1fr 1fr 1fr">
    <TableRow head>
        <div>Product</div>
        <div>Usage</div>
        <div>Accent Colors</div>
    </TableRow>
    <TableRow>
        <div>
            <a href="https://talk.hyvor.com" target="_blank">Hyvor Talk</a>
        </div>
        <div>Low (Svelte)</div>
        <div class="color-dots">
            <ColorDot color="#ffd969" />
            <ColorDot color="#fff1cb" />
            <ColorDot color="#fffaec" />
        </div>
    </TableRow>
    <TableRow>
        <div>
            <a href="https://blogs.hyvor.com" target="_blank">Hyvor Blogs</a>
        </div>
        <div>100%</div>
        <div class="color-dots">
            <ColorDot color="#896c6b" />
            <ColorDot color="#f1e8e8" />
            <ColorDot color="#fffaf8" />
        </div>
    </TableRow>
    <!-- <TableRow>
        <div>
            <a href="https://reader.hyvor.com" target="_blank">Hyvor Reader</a>
        </div>
        <div>100%</div>
        <div class="color-dots">
            <ColorDot color="#354f52" />
            <ColorDot color="#bdc5c6" />
            <ColorDot color="#eaebe9" />
        </div>
    </TableRow> -->
    <TableRow>
        <div>
            <a href="https://shield.hyvor.com" target="_blank">Hyvor Shield</a>
        </div>
        <div>100%</div>
        <div class="color-dots">
            <ColorDot color="#836096" />
            <ColorDot color="#DFCCFB" />
            <ColorDot color="#fbf7ff" />
        </div>
    </TableRow>
</Table>

<h2 id="dependencies">
    Dependencies
</h2>

<ul>
    <li>
        Front-end: <a href="https://svelte.dev" target="_blank">Svelte</a> and <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a> (static only)
    </li>
    <li>
        Font: <a href="https://fonts.bunny.net/family/readex-pro" target="_blank">Readex Pro</a> (via <a href="https://www.npmjs.com/package/@fontsource/readex-pro">@fontsource/readex-pro</a>)
    </li>
    <li>
        Icons: <a href="https://icons.getbootstrap.com/" target="_blank">Bootstrap Icons</a>
    </li>
</ul>

<h2 id="variables">
    Variables
</h2>

<p>
Each HYVOR product has a different accent color scheme, while most of the other colors are the same. See <code>src/lib/variables.css</code> for all available variables. In most cases, you will only have to change the following variables for each product:
</p>

<CodeBlock code={`
    :root {
        --accent: #000;
        --accent-light: #bdbdbd;
        --accent-lightest: #fafafa;
    }
`} language="css" /> 

<ul>
    <li>
        <code>--accent</code> - The accent color of the product. Used for buttons, links, etc. Must be a dark color to be used with white text.
    </li>
    <li>
        <code>--accent-light</code> - A lighter version of the accent color. Used for hover effects. Must be a light color to be used with dark text.
    </li>
    <li>
        <code>--accent-lightest</code> - A very light version of the accent color. Used for backgrounds. Must be closer to white.
    </li>
</ul>

<h2 id="install">Installation</h2>

<p>
    First, install these two packages:
</p>

<CodeBlock code={`
    npm i @hyvor/design
    npm i @hyvor/icons
`} />

<p>
    Next, wrap the main layout with <code>{"<Base>"}</code>. This component handles a few features like <a href="/dark">dark mode</a> and <a href="/i18n">internationalization</a>.
</p>

<CodeBlock code={`
    // src/routes/+layout.svelte
    <`+`script>
        import { Base } from "@hyvor/design/components";
    </script>

    <Base>
        <slot />
    </Base>
`} />

<p>
    Then, use the other components as you need!
</p>

<ul>
    <li>
        Import basic components from <code>@hyvor/design/components</code>
    </li>
    <li>
        Import marketing components from <code>@hyvor/design/marketing</code>
    </li>
    <li>
        Import icons from <code>@hyvor/icons</code>. See <a href="#icons">Icons</a> below for more information.
    </li>
</ul>

<CodeBlock code={`
    <` + `script>
        import { TextInput, Checkbox } from "@hyvor/design/components";
        import { DocsNav, Header } from '@hyvor/design/marketing';
        import { IconSearch } from '@hyvor/icons';
    </script>

    <IconSearch size={14} />
`} />

<h2 id="icons">Icons</h2>

<p>
    HDS uses <a href="https://icons.getbootstrap.com/" target="_blank">Bootstrap Icons</a> for icons, which contains over 2000 icons. Svelte components for each icon are available in the <code>@hyvor/icons</code> package. In addition to general SVG attributes, the svelte component supports <code>size</code> to set the width and height of the icon.
</p>

<CodeBlock code={`
    <` + `script>
        import { IconSearch } from "@hyvor/icons";
    </script>

    <Search size={14} />
`} />

<style>
    .color-dots {
        display: flex;
    }
</style>

<h2 id="events">Events</h2>

<p>
    Form elements in HDS forward the following events from the underlying HTML elements:
</p>

<ul>
    <li><code>on:keyup</code></li>
    <li><code>on:keydown</code></li>
    <li><code>on:keypress</code></li>
    <li><code>on:focus</code></li>
    <li><code>on:blur</code></li>
    <li><code>on:click</code></li>
    <li><code>on:mouseover</code></li>
    <li><code>on:mouseenter</code></li>
    <li><code>on:mouseleave</code></li>
    <li><code>on:change</code></li>
    <li><code>on:input</code> (only <code>{"<TextInput>"}</code> and <code>{"<Textarea>"}</code>)</li>
</ul>

<CodeBlock code={`
    <Checkbox on:change={handleFocus} />
`} />