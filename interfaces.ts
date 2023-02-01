export interface Entry {
    number: number
    data: string
    name: string
    example: string
    keyword: string
    author: string
    time: string
    created: string

    references: number
    revision: number

    offset?: string


    link?: Array<string>
    formula?: Array<string>
    maple?: Array<string>
    mathematica?: Array<string>
    program?: Array<string>
    xref?: Array<string>
    ext?: Array<string>


}

export interface OeisResponse {
    greeting: string
    query: string
    count: number
    start: number

    results: Array<Entry> | null
}