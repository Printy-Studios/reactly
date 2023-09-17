import input from '@inquirer/input'

type ConsoleInputConfig = {
    message: string, 
    default: boolean
}

const consoleInput = {
    confirm: async (config: ConsoleInputConfig = { message: 'Confirm?', default: false} ) => {

        const default_str:string = config.default ? 'y' : 'n'

        //const hint_str = config.default ? '(Y/n)' : '(y/N)'

        const message = config.message + "(y/n)"

        const res = await input({
            message,
            default: default_str,
            validate: (answer): string | boolean => {
                if(!['y', 'n'].includes(answer.toLowerCase())){
                    return "Please enter 'y' for yes or 'n' for no"
                }
                return true
            }
        })

        if(res.toLowerCase() === 'y') {
            return true
        } else {
            return false
        }
    }
}

export default consoleInput