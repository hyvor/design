<script lang="ts">

    import './prism.scss';

    type InputLanguage = 'html' | 'ts' | 'css' | 'svelte' | 'jsx';

    export let code: string;
    export let language: InputLanguage = 'html';

    const languagesMap : Partial<Record<InputLanguage, Language>> = {
        svelte: 'tsx',
    }
    const languageCode = (languagesMap[language] || language) as Language;

    import getCode, { type Language } from './prism.js';

</script>

<pre class="language-{languageCode}"><code>{@html getCode(code, languageCode)}</code></pre>