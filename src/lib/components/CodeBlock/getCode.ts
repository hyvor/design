// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import xml from 'highlight.js/lib/languages/xml';
// import css from 'highlight.js/lib/languages/css';
// import ts from 'highlight.js/lib/languages/typescript';
// import yaml from 'highlight.js/lib/languages/yaml';
// import json from 'highlight.js/lib/languages/json';
// import php from 'highlight.js/lib/languages/php';

// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('css', css);
// hljs.registerLanguage('ts', ts);
// hljs.registerLanguage('yaml', yaml);
// hljs.registerLanguage('json', json);
// hljs.registerLanguage('php', php);

// export type Language = 'html' | 'css' | 'js' | 'ts';

// export default function getCode(code: string, language: Language | null): string {
// 	let ret = code;

// 	// remove the first empty line
// 	ret = ret.replace(/^[^\S\r\n]*\n/, '');
// 	// remove the last empty line
// 	ret = ret.replace(/\n[^\S\r\n]*$/, '');

// 	let lines = ret.split('\n');
// 	let indent: null | number = null; // number of spaces to remove from each line

// 	lines = lines.map((line) => {
// 		if (indent === null) {
// 			// find the indent
// 			const match = line.match(/^(\s*)/);
// 			indent = match ? match[1].length : 0;
// 		}

// 		if (line.substring(0, indent).trim() !== '') {
// 			return line;
// 		}

// 		// remove the indent
// 		line = line.substring(indent);

// 		return line;
// 	});

// 	ret = lines.join('\n');

// 	return language === null ?
// 		encodeHtml(ret) : 
// 		hljs.highlight(ret, { language }).value;
// }

// function encodeHtml(str: string): string {
// 	return str.replace(/&/g, '&amp;')
// 		.replace(/</g, '&lt;')
// 		.replace(/>/g, '&gt;')
// 		.replace(/"/g, '&quot;')
// 		.replace(/'/g, '&#39;');
// }

// src/lib/getCode.ts
import Prism from 'prismjs';
import 'prism-svelte';
import loadLanguages from 'prismjs/components/index.js';

loadLanguages(['html', 'css', 'javascript', 'json', 'yaml', 'typescript', 'go', 'php']);

export type Language =
  | 'html'
  | 'css'
  | 'js'
  | 'ts'
  | 'json'
  | 'yaml'
  | 'php'
  | 'go'
  | 'svelte';

export default function getCode(code: string, language: Language | null): string {
  let ret = code;

  // Remove first empty line
  ret = ret.replace(/^[^\S\r\n]*\n/, '');
  // Remove last empty line
  ret = ret.replace(/\n[^\S\r\n]*$/, '');

  // Normalize indentation
  const lines = ret.split('\n');
  let indent: number | null = null;
  const normalizedLines = lines.map((line) => {
    if (indent === null) {
      const match = line.match(/^(\s*)/);
      indent = match ? match[1].length : 0;
    }
    return line.substring(indent);
  });
  ret = normalizedLines.join('\n');

  // Highlight with Prism
  if (!language || !Prism.languages[language]) {
    return encodeHtml(ret);
  }

  return Prism.highlight(ret, Prism.languages[language], language);
}

// Escape HTML for plain text code
function encodeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
