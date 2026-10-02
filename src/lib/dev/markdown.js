import { mdsvex, escapeSvelte } from 'mdsvex';
import { highlightCode } from '../components/CodeBlock/getCode.js';

// this is a JS file because we can use it in svelte.config.js locally

const OWN_HOSTS = ['hyvor.com'];

/** @param {string} href */
function isOwnLink(href) {
	try {
		const host = new URL(href).hostname;
		return OWN_HOSTS.some((h) => host === h || host.endsWith('.' + h));
	} catch {
		return false;
	}
}

// mdsvex adds rel="nofollow" to all absolute links.
// Links to our own sites (hyvor.com and its subdomains) should be followed.
function rehypeFollowOwnLinks() {
	/** @param {any} node */
	const walk = (node) => {
		if (node.type === 'element' && node.tagName === 'a' && node.properties) {
			const href = node.properties.href;
			const rel = node.properties.rel;
			if (typeof href === 'string' && isOwnLink(href) && Array.isArray(rel)) {
				const filtered = rel.filter((r) => r !== 'nofollow');
				if (filtered.length) node.properties.rel = filtered;
				else delete node.properties.rel;
			}
		}
		node.children?.forEach(walk);
	};
	return walk;
}

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function markdownPlugin() {
	return mdsvex({
		extensions: ['.md'],
		rehypePlugins: [rehypeFollowOwnLinks],
		highlight: {
			highlighter: async (code, lang) => {
				const highlitedCode = await highlightCode(code, lang || null);
				const html = `<div class="hds-code-block">${highlitedCode}</div>`;
				return escapeSvelte(html);
			}
		}
	});
}
