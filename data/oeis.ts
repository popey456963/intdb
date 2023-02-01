import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { OeisResponse, SearchOrder } from 'interfaces'

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

export function useGetOeisQueryInfinite(q?: string, sort: SearchOrder = SearchOrder.Relevance) {
    function oeisInfiniteKey(index: number, previous: OeisResponse) {
        if (previous && previous.count <= index * 10) {
            return null
        }

        const query = qs.stringify({
            q, sort, start: index * 10
        })

        return `api/search?${query}`
    }

    return useSWRInfinite<OeisResponse>(oeisInfiniteKey, oeisFetcher)

}