<script lang="ts">
	 import './prism.scss';

	import getCode, { type Language } from './getCode.js';
	interface Props {
		code: string;
		language?: Language | null;
	}

	let { code, language = 'html' }: Props = $props();

	let languageCode = $derived(language ? (language) : null) as Language | null;
</script>

<pre class="language-{languageCode}"><code>{@html getCode(code, languageCode)}</code></pre>

<style>
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
		line-height: 1.5 !important;
		tab-size: 4;
		hyphens: none;
	}
</style>
