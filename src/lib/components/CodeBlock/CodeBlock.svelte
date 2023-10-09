<script lang="ts">

    import './prism.scss';

    type InputLanguage = 'html' | 'js' | 'css' | 'svelte' | 'jsx';

    export let code: string;
    export let language: InputLanguage = 'html';

    const languagesMap : Partial<Record<InputLanguage, Language>> = {
        svelte: 'jsx',
    }
    const languageCode = (languagesMap[language] || language) as Language;

    import getCode, { type Language } from './prism.js';

</script>

<pre class="language-{language}"><code>{@html getCode(code, languageCode)}</code></pre>