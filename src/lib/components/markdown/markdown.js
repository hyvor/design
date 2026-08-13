import { mdsvex, escapeSvelte } from "mdsvex";
import { highlightCode } from "../CodeBlock/getCode.js";

// this is a JS file because we can use it in svelte.config.js locally

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