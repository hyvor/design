<script lang="ts">

    //import './prism.scss';
    import './hljs.scss';

    type InputLanguage = 
        'html' |
        'css' |
        'js' |
        'ts' |
        
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