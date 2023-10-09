<script lang="ts">

    import './prism.scss';

    export let code: string;
    export let language: 
        'html' | 'js' | 'css' | 'svelte'
        = 'html';

    import getCode from './prism.js';

</script>

<pre class="language-{language}"><code>{@html getCode(code, language)}</code></pre>