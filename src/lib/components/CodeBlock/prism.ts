import Prism from 'prismjs';

/**
 * This is to prevent Prism not defined error in development
 * in SvelteKit
 */
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Prism = Prism;
}

import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-tsx.js';

export type Language = 'html' | 'css' | 'js' | 'ts' | 'jsx' | 'tsx';

export default function getCode(code: string, language: Language) {

    let ret = code;

    // remove the first empty line
    ret = ret.replace(/^[^\S\r\n]*\n/, "");
    // remove the last empty line
    ret = ret.replace(/\n[^\S\r\n]*$/, "");

    let lines = ret.split("\n");
    let indent : null | number = null; // number of spaces to remove from each line

    lines = lines.map(line => {
        if (indent === null) {
            // find the indent
            const match = line.match(/^(\s*)/);
            indent = match ? match[1].length : 0;
        }

        if (line.substring(0, indent).trim() !== "") {
            return line;
        }

        // remove the indent
        line = line.substring(indent);

        return line;
    });

    ret = lines.join("\n");

    return Prism.highlight(ret, Prism.languages[language], language);

}