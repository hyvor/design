import { mdsvex, escapeSvelte } from 'mdsvex';
import { highlightCode } from '../components/CodeBlock/getCode.js';

// this is a JS file because we can use it in svelte.config.js locally

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function markdownPlugin() {
	return mdsvex({
		extensions: ['.md'],
		highlight: {
			highlighter: async (code, lang) => {
				const highlitedCode = await highlightCode(code, lang || null);
				const html = `<div class="hds-code-block">${highlitedCode}</div>`;
				return escapeSvelte(html);
			}
		}
	});
}
