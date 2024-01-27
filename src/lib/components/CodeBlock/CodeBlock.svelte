<script lang="ts">

    //import './prism.scss';
    import './hljs.scss';

    type InputLanguage = 
        'html' |
        'css' |
        'js' |
        'ts' |
        'yaml' |
        'json' |
        'svelte' |
        'jsx';

    export let code: string;
    export let language: InputLanguage = 'html';

    const languagesMap : Partial<Record<InputLanguage, Language>> = {
        svelte: 'html',
        jsx: 'js'
    }
    const languageCode = (languagesMap[language] || language) as Language;

    import getCode, { type Language } from './getCode.js';

</script>

<pre class="language-{languageCode} hljs"><code>{@html getCode(code, languageCode)}</code></pre>

<style>
    /*styles for CodeBlock component */
    pre {
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        overflow: auto;
        border-radius: 20px;
        padding: 20px;
        line-height: 1.1;
    }
    pre code {
        all: unset;
        font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
        font-size: 14px;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
    }


</style>