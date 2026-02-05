import { glob } from "glob";
import fs from 'fs';
import path from "path";

create();

async function create() {

    const svgFiles = await glob('node_modules/bootstrap-icons/icons/*.svg');

    let names: string[] = [];

    svgFiles.forEach(filePath => {
        const source = fs.readFileSync(filePath, 'utf-8');
        const { name } = path.parse(filePath);

        fs.writeFileSync(`src/lib/icons/${name}.svg`, source);
        names.push(name);
    });

    const nameTypes = names
        .map(n => `'${n}'`)
        .join(" |\n\t");

    const types = `// auto-generated via copy.ts    
export type IconName = ${nameTypes};
`;

    fs.writeFileSync('src/lib/types.ts', types);

}
