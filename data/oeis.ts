import useSWR from 'swr'
import qs from 'qs'
import { OeisResponse } from 'interfaces'

export function oeisFetcher(url: string) {
    return fetch(url)
        .then(res => res.json())
}

export function useGetOeisQuery(q: string, start: number = 0) {
    const query = qs.stringify({
        q, start
    })

    return useSWR<OeisResponse>(q ? `api/search?${query}` : null, oeisFetcher)
}