import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { OeisResponse, SearchOrder } from 'interfaces'
import { defaultQuery } from './defaultQuery'

export async function oeisFetcher(url: string) {
    return fetch(url)
        .then(res => res.json())
}

export function useGetOeisQuery(q?: string, order: SearchOrder = SearchOrder.Relevance, start: number = 0) {
    const query = qs.stringify({
        q, start
    })

    return useSWR<OeisResponse>(q ? `api/search?${query}` : null, oeisFetcher)
}

export function useGetLatest() {

}

export function useGetOeisQueryInfinite(q?: string, initialQuery?: string, sort: SearchOrder = SearchOrder.Relevance, initialValue?: OeisResponse) {
    function oeisInfiniteKey(index: number, previous: OeisResponse) {
        if (previous && previous.count <= index * 10) {
            return null
        }

        const query = qs.stringify({
            sort, q, start: index * 10
        })

        return `api/search?${query}`
    }

    return useSWRInfinite<OeisResponse>(oeisInfiniteKey, oeisFetcher, {
        fallbackData: q === initialQuery && sort === SearchOrder.Relevance ? initialValue as any : undefined,
        revalidateFirstPage: false
    })

}