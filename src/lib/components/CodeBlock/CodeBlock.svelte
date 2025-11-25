<script lang="ts">
	//import './prism.scss';
	import './hljs.scss';
	import Button from '../Button/Button.svelte';
	import IconCopy from '@hyvor/icons/IconCopy';

	type InputLanguage = 'html' | 'css' | 'js' | 'ts' | 'yaml' | 'json' | 'svelte' | 'jsx' | 'php';
	const languagesMap: Partial<Record<InputLanguage, Language>> = {
		svelte: 'html',
		jsx: 'js'
	};
	import getCode, { type Language } from './getCode.js';

	interface Props {
		code: string;
		language?: InputLanguage | null;
	}

	let { code, language = 'html' }: Props = $props();
	let languageCode = $derived(
		language ? languagesMap[language] || language : null
	) as Language | null;

	function copyToClipboard() {
		navigator.clipboard.writeText(code);
	}
</script>

<div class="code-container">
	<div class="copy-button">
		<Button variant="fill" onclick={copyToClipboard}>
			<IconCopy />
		</Button>
	</div>
	<pre class="language-{languageCode} hljs"><code>{@html getCode(code, languageCode)}</code></pre>
</div>

<style>
	/*styles for CodeBlock component */
	.code-container {
		position: relative;
	}

	.code-container .copy-button {
		position: absolute;
		top: 0px;
		right: 12px;
		transform: translateY(-40%);
		z-index: 10;
	}

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
