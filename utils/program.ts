import languages from './languages'

const languageRegex = /^\((.*?)\)[ ]?/

interface Program {
    language: string,
    code: Array<string>
}

export function getHighlightLanguage(userLanguage: string) {
    const language = userLanguage.toLowerCase()

    const highlight = languages.find(item => item.toLowerCase() === language)
    if (highlight) {
        return highlight
    }

    // switch (language) {
    //     case 'pari': return 'maxima'
    // }

    return 'text'
}

export function parseProgramString(program: Array<string>) {
    const programs = []

    let current: Program = {
        language: 'text',
        code: []
    }
    for (let line of program) {
        if (languageRegex.test(line)) {
            programs.push(current)

            const language = (line.match(languageRegex) || [])[1]
            const code = line.replace(languageRegex, '')

            current = {
                language,
                code: []
            }

            if (code) {
                current.code.push(code)
            }
        } else {
            current.code.push(line)
    }
    }

    programs.push(current)

    return programs.filter((program) => program.code.length)
}