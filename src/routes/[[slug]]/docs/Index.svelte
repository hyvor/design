<script lang="ts">
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "$lib/pages/Docs/Content/CodeBlock.svelte";
    import ColorDot from "./Helper/ColorDot.svelte";
</script>
<h1>HDS</h1>

<p>
    HDS, Hyvor Design System, is a collection of <a href="https://svelte.dev" target="_blank">Svelte</a> UI components for building HYVOR products. It is open-source and you can view the source code on <a href="https://github.com/hyvor/design" target="_blank">Github</a>. However, as it is not a general purpose UI library, it is not recommended to use it in non-HYVOR products.
</p>

<h2 id="usage">Usage</h2>

<p>
    Here is the usage of HDS in HYVOR products.
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
        <div>No (React)</div>
        <div class="color-dots">
            <ColorDot color="#896c6b" />
            <ColorDot color="#f1e8e8" />
            <ColorDot color="#fffaf8" />
        </div>
    </TableRow>
    <TableRow>
        <div>
            <a href="https://reader.hyvor.com" target="_blank">Hyvor Reader</a>
        </div>
        <div>100%</div>
        <div class="color-dots">
            <ColorDot color="#354f52" />
            <ColorDot color="#bdc5c6" />
            <ColorDot color="#eaebe9" />
        </div>
    </TableRow>
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

<h2 id="icons">Icons</h2>

<p>
    HDS uses <a href="https://icons.getbootstrap.com/" target="_blank">Bootstrap Icons</a> for icons. You can import SVG icons from <code>@hyvor/design/icons/{"{Name}"}.svelte</code>. Any SVG property, like <code>width</code>, can be set in the component.
</p>

<CodeBlock code={`
    <script>
        import Search from "@hyvor/design/icons/Search.svelte";
    </script>

    <Search width={14} />
`} />

<style>
    .color-dots {
        display: flex;
    }
</style>