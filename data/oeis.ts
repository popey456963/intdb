import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { OeisResponse } from 'interfaces'

const pause = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export async function oeisFetcher(url: string) {
    await pause(200)

    return fetch(url)
        .then(res => res.json())
}

export function useGetOeisQuery(q?: string, start: number = 0) {
    const query = qs.stringify({
        q, start
    })

    return useSWR<OeisResponse>(q ? `api/search?${query}` : null, oeisFetcher)
}

export function useGetOeisQueryInfinite(q?: string) {
    function oeisInfiniteKey(index: number, previous: OeisResponse) {
        if (previous && previous.count <= index * 10) {
            return null
        }

        const query = qs.stringify({
            q, start: index * 10
        })

        return `api/search?${query}`
    }

    return useSWRInfinite<OeisResponse>(oeisInfiniteKey, oeisFetcher)

}