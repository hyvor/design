import { codeToHtml } from 'shiki';

export type Language =
	| 'html'
	| 'css'
	| 'js'
	| 'ts'
	| 'yaml'
	| 'json'
	| 'svelte'
	| 'jsx'
	| 'php'
	| 'sh'
	| string; // see https://shiki.style/languages

export function sanitizeLines(code: string) {
	let ret = code;

	// remove the first empty line
	ret = ret.replace(/^[^\S\r\n]*\n/, '');
	// remove the last empty line
	ret = ret.replace(/\n[^\S\r\n]*$/, '');

	let lines = ret.split('\n');
	let indent: null | number = null; // number of spaces to remove from each line

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

export async function getCode(code: string, language: Language | null): Promise<string> {
	return await codeToHtml(code, {
		lang: language || 'text',
		themes: {
			light: 'vitesse-light',
			dark: 'nord'
		}
	});
}
