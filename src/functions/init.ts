//Core
import * as fs from 'fs-extra'
import * as path from 'path'
import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';

//Util
import ExecInstance from './exec';

//Constants
import * as package_json_defaults from 'const/package_json_defaults';

/**
 * Initialize a Reactly project
 * @param { boolean } overwrite If true, this will overwrite the target directory, otherwise will cancel initialization
 * @param { string } project_path Target directory where the project will be initialized
 * @param { PackageJSONOptions } package_json 
 *  The contents of package.json that will be created (as object)
 *  All the properties are optional and have default values
 */
export default async function init(
    overwrite: boolean = false,
    project_path: string,
    package_json = {
        name: 'My Reactly project',
    }
) {
    const exec_config:ExecSyncOptionsWithBufferEncoding = {
        stdio: 'inherit',
        cwd: project_path
    }

    const exec = ExecInstance(exec_config)

    fs.emptyDirSync(project_path)

    // if (!fs.existsSync(project_path)) {
    //     console.log('Creating folder @ ' + project_path)
    //     fs.mkdirSync(project_path);
    // } else {
        
    // }
    console.log('Creating package.json')
    
    const _package_json = {
        ...package_json,
        scripts: package_json_defaults.scripts,
        devDependencies: package_json_defaults.dev_deps,
        dependencies: package_json_defaults.deps,
    }

    await fs.writeFileSync(path.join(project_path, 'package.json'), JSON.stringify(_package_json, null, 4))

    console.log('Installing NPM dependencies')

    exec('npm install')

    console.log('Adding template')

    //Make sure you update this if you change the location of init.ts(this file)
    const template_path_relative = path.join(__dirname, '../../template')
    fs.copySync(template_path_relative, project_path)
}