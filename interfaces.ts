export interface Entry {
    number: number
    data: string
    name: string
    keyword: string
    author: string
    time: string
    created: string

    references: number
    revision: number

    offset?: string
    id?: string

    example?: Array<string>
    link?: Array<string>
    formula?: Array<string>
    maple?: Array<string>
    mathematica?: Array<string>
    program?: Array<string>
    xref?: Array<string>
    ext?: Array<string>
    comment?: Array<string>
    reference?: Array<string>
}

export interface OeisResponse {
    greeting: string
    query: string
    count: number
    start: number

    results: Array<Entry> | null
}

export enum SearchOrder {
    Relevance = 'relevance',
    References = 'references',
    Number = 'number',
    Modified = 'modified',
    Created = 'created'
}

export const searchOrderOptions = {
    relevance: 'Relevance',
    references: 'References',
    number: 'Number',
    modified: 'Modified',
    created: 'Created',
}

export interface Program {
    language: string,
    code: Array<string>
}