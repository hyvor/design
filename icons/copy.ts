import { glob } from "glob";
import fs from 'fs';
import path from "path";

create();

async function create() {

    const svgFiles = await glob('node_modules/bootstrap-icons/icons/*.svg');

    svgFiles.forEach(filePath => {
        const source = fs.readFileSync(filePath, 'utf-8');
        const { name } = path.parse(filePath);

        fs.writeFileSync(`src/lib/icons/${name}.svg`, source);
    });

}
