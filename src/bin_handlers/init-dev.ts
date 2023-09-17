import * as fs from 'fs'
import * as path from 'path'

import init from 'functions/init'
import consoleInput from 'functions/consoleInput'

export const command = 'init-dev <folder_name>'

//Run initialization in console
const consoleInit = (target_folder_name: string) => {
    const target_dir = path.join(process.env.INIT_CWD, target_folder_name)
    const package_json_exists = fs.existsSync(path.join(target_dir, 'package.json'))
    if(package_json_exists) {
        const do_overwrite = consoleInput.confirm({
            message: 'This folder already has a package.json, do you want to overwite this folder with a new project?',
            default: false
        })

        if(!do_overwrite) {
            console.log('Initialization cancelled')
            process.exitCode = 1
            return
        }
    }

    let project_name = target_folder_name

    if (project_name == '.') {
        project_name = path.basename(process.env.INIT_CWD)
    }

    init(
        target_dir,
        {
            name: project_name
        }
    )
}

export const handler = (argv) => {
    console.log('Initializing Reactly in dev mode')

    consoleInit(argv.folder_name)

    //init()
}