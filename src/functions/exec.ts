import { ExecSyncOptionsWithBufferEncoding, execSync } from 'child_process';


export default function ExecInstance(config: ExecSyncOptionsWithBufferEncoding) {
    return (command: string) => {
        return execSync(command, config)
    }
}

// export default function exec(command: string, show_output: boolean = true) {
//     return execSync(command, {
//         stdio: show_output ? 'inherit' : 'pipe'
//     })
// }