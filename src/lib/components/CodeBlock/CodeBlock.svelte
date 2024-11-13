<script lang="ts">
	//import './prism.scss';
	import './hljs.scss';

	type InputLanguage = 'html' | 'css' | 'js' | 'ts' | 'yaml' | 'json' | 'svelte' | 'jsx' | 'php';


	const languagesMap: Partial<Record<InputLanguage, Language>> = {
		svelte: 'html',
		jsx: 'js'
	};

	import getCode, { type Language } from './getCode.js';
	interface Props {
		code: string;
		language?: InputLanguage;
	}

	let { code, language = 'html' }: Props = $props();
	const languageCode = (languagesMap[language] || language) as Language;
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
		line-height: 1.2;
	}
	pre code {
		all: unset;
		font-family:
			Consolas,
			Monaco,
			Andale Mono,
			Ubuntu Mono,
			monospace;
		font-size: 14px;
		line-height: 1.5!important;
		tab-size: 4;
		hyphens: none;
	}
</style>
