import { codeToHtml } from 'shiki';

/**
 * @param {string} code
 * @returns {string}
 */
export function sanitizeLines(code) {
	let ret = code;

	// remove the first empty line
	ret = ret.replace(/^[^\S\r\n]*\n/, '');
	// remove the last empty line
	ret = ret.replace(/\n[^\S\r\n]*$/, '');

	let lines = ret.split('\n');

	/**
	 * @type {null | number}
	 */
	let indent = null; // number of spaces to remove from each line

	lines = lines.map((line) => {
		if (indent === null) {
			// find the indent
			const match = line.match(/^(\s*)/);
			indent = match ? match[1].length : 0;
		}

		if (line.substring(0, indent).trim() !== '') {
			return line;
		}

		// remove the indent
		line = line.substring(indent);

		return line;
	});

	return lines.join('\n');
}

/**
 * @param {string} code
 * @param {import('./types.codeblock.ts').Language | null} language
 * @returns {Promise<string>}
 */
export async function highlightCode(code, language) {
	return await codeToHtml(code, {
		lang: language || 'text',
		themes: {
			light: 'vitesse-light',
			dark: 'nord'
		}
	});
}
