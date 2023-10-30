<script>
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
</script>
<h1>i18n</h1>

<p>
    HDS comes with a built-in internationalization (i18n) system. The <code>{`<T>`}</code> component is used to translate text.
</p>

<CodeBlock code={`
    <T key="home.title" />
`}></CodeBlock>

<h2 id="">
    Scenarios
</h2>

<p>
    HDS designs internationalization around the following two scenarios:
</p>

<ol>
    <li>
        <b>Landing Pages</b>: Translated statically. The language is determined by the URL prefix. 
        <ul>
            <li>
                <code>/</code> is <code>en-US</code>
            </li>
            <li>
                <code>/fr-FR</code> is <code>fr-FR</code>
            </li>
            <li>
                etc.
            </li>
        </ul>
    </li>
    <li>
        <b>Apps</b> (ex: Console): Translated at runtime. The language is initially determined by the user's browser settings and then saved as a user preference (in Svelte stores and Local Storage).
    </li>
</ol>

<h2 id="language-files">Language Files</h2>

<p>
    Translated texts are stored in <a href="#language-files">language files</a>.
</p>
