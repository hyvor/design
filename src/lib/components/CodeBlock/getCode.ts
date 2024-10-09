import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import ts from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("ts", ts);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("json", json);

export type Language = "html" | "css" | "js" | "ts";

export default function getCode(code: string, language: Language) {
  let ret = code;

  // remove the first empty line
  ret = ret.replace(/^[^\S\r\n]*\n/, "");
  // remove the last empty line
  ret = ret.replace(/\n[^\S\r\n]*$/, "");

  let lines = ret.split("\n");
  let indent: null | number = null; // number of spaces to remove from each line

  lines = lines.map((line) => {
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

  return hljs.highlight(ret, { language }).value;
}
