<script lang="ts">
	import Button from '../Button/Button.svelte';
	import IconCopy from '@hyvor/icons/IconCopy';
	import toast from '../Toast/toast.js';
	import { getCode, sanitizeLines, type Language } from './getCode.js';

	interface Props {
		code: string;
		language?: Language | null;
	}

	let { code, language = 'html' }: Props = $props();

	let sanitizedCode = $derived(sanitizeLines(code));

	function copyToClipboard() {
		navigator.clipboard.writeText(sanitizedCode);
		toast.success('Copied');
	}
</script>

<div class="code-container">
	<div class="copy-button">
		<Button color="input" size="x-small" onclick={copyToClipboard}>
			<IconCopy size={10} />
		</Button>
	</div>
	{@html await getCode(sanitizedCode, language)}
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

	.copy-button :global(button) {
		border: 1px solid var(--border);
	}

	.code-container :global(pre) {
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		overflow: auto;
		border-radius: 20px;
		padding: 20px;
		line-height: 1.2;
		background-color: #f4f2f0 !important;
	}

	.code-container :global(pre code) {
		all: unset;
		font-size: 14px;
		line-height: 1.5 !important;
		tab-size: 4;
		hyphens: none;
	}

	:global(:root.dark .shiki, :root.dark .shiki span) {
		color: var(--shiki-dark) !important;
		background-color: var(--shiki-dark-bg) !important;
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}
</style>
