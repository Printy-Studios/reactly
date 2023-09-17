//Core
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process';

//Constants
import { dev_deps, deps } from 'const/package_json_deps';

export default async function init(
    project_path: string,
    package_json = {
        name: 'My Reactly project'
    }
) {
    if (!fs.existsSync(project_path)) {
        console.log('Creating folder @ ' + project_path)
        fs.mkdirSync(project_path);
    }
    console.log('Creating package.json')
    
    const _package_json = {
        devDependencies: dev_deps,
        dependencies: deps,
        ...package_json
    }

    await fs.writeFileSync(path.join(project_path, 'package.json'), JSON.stringify(_package_json, null, 4))

    console.log('Installing NPM dependencies')

    execSync('npm install')
}