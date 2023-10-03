<script>
    import CodeBlock from "$lib/pages/Docs/Content/CodeBlock.svelte";

</script>
<h1>HDS</h1>

<p>
    HDS, Hyvor Design System, is a collection of <a href="https://svelte.dev" target="_blank">Svelte</a> UI components for building HYVOR products. It is open-source and you can view the source code on <a href="https://github.com/hyvor/design" target="_blank">Github</a>. However, as it is not a general purpose UI library, it is not recommended to use it in non-HYVOR products.
</p>

<h2 id="dependencies">
    Dependencies
</h2>

<ul>
    <li>
        UI Library: <a href="https://svelte.dev" target="_blank">Svelte</a>
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

Each HYVOR product has a different accent color scheme, while most of the other colors are the same. See <code>src/lib/variables.css</code> for all available variables. In most cases, you will only have to change the following variables for each product:

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