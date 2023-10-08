import { parse, walk } from "svelte/compiler";
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

/**
 * Inspired by svelvg
 */

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-circle" viewBox="0 0 16 16">
<path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
</svg>`;

create();

async function create() {

    const svgFiles = await glob('node_modules/bootstrap-icons/icons/*.svg');
    const modules : string[] = [];

    svgFiles.forEach((filePath) => {

        const source = fs.readFileSync(filePath, 'utf-8');
        const { name } = path.parse(filePath);

        const moduleName = toModuleName(name);
        const svelte = svgFileToSvelte(source, filePath);

        fs.writeFileSync(`src/lib/${moduleName}.svelte`, svelte);

        modules.push(moduleName);

    });

    const indexContent = modules
        .map(name => `export { default as ${name} } from './${name}.svelte';`)
        .join('\n');

    fs.writeFileSync('src/lib/index.ts', indexContent);

}


function svgFileToSvelte(source: string, filename: string) {

    const ast = parse(source, { filename });

    let content = '';

    const svg = ast.html.children![0];

    if (svg.name !== 'svg') {
        throw new Error(`Expected <svg>, got <${svg.name}>`);
    }

    svg.children!.forEach((node) => {
        content += source.slice(node.start, node.end);
    });


    /**
     * A check to make sure we have all the attributes we expect.
     * Maybe bootstrap can change this in the future.
     */
    const attrNames = svg.attributes!.map((attr: any) => attr.name);
    [ 'xmlns', 'width', 'height', 'fill', 'class', 'viewBox' ].forEach((name) => {
        if (!attrNames.includes(name)) {
            throw new Error(`Expected <svg> to have a ${name} attribute`);
        }
    });
    if (attrNames.length !== 6) {
        throw new Error(`Expected <svg> to have 6 attributes, got ${attrNames.length}`);
    }

    const svelte = `<script lang="ts">
    export let size: number = 16;
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...$$restProps}>${content.trim()}</svg>`;

    return svelte;

}

function toModuleName(name: string) {

    return ('icon-' + name)
        .replace(/\-+/g, " ")
        .replace(/\.svg/g, "")
        .split(" ")
        .map(v => v.charAt(0).toUpperCase() + v.slice(1))
        .join('');

}