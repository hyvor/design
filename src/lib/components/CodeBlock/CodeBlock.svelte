<script lang="ts">
	import Button from '../Button/Button.svelte';
	import IconCopy from '@hyvor/icons/IconCopy';
	import toast from '../Toast/toast.js';
	import { highlightCode, sanitizeLines } from './getCode.js';
	import type { Language } from './types.codeblock.js';

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

<div class="hds-code-block">
	<div class="copy-button">
		<Button color="input" size="x-small" onclick={copyToClipboard}>
			<IconCopy size={10} />
		</Button>
	</div>
	{@html await highlightCode(sanitizedCode, language)}
</div>

<style>
	/*styles for CodeBlock component */
	.hds-code-block {
		position: relative;
	}

	.copy-button {
		position: absolute;
		top: 0px;
		right: 12px;
		transform: translateY(-40%);
		z-index: 10;
	}

	.copy-button :global(button) {
		border: 1px solid var(--border);
	}
</style>
