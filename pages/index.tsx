import Head from "next/head"
import qs from "qs"
import styled from "styled-components"
import { useCallback, useEffect, useMemo, useState } from "react"
import Centerer from "components/Centerer"
import Search from "components/Search"
import NavLinks from "components/NavLinks"
import Logo from "components/Logo"

import { oeisFetcher, useGetOeisQueryInfinite } from "data/oeis"
import { Entry, SearchOrder } from "interfaces"
import ResultsList from "components/ResultsList"
import SearchMeta from "components/SearchMeta"
import { defaultQuery } from "data/defaultQuery"
import { useRouter } from "next/router"

const Container = styled.div``

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 48px;
`

const PAGE_SIZE = 10

export default function Home({ initialData, initialQuery }: any): any {
  const router = useRouter()
  const [query, setQuery] = useState<string>(initialQuery)
  const [search, setSearch] = useState<string>(initialQuery)
  const [sort, setSort] = useState<string>("relevance")
  const { data, size, setSize, isLoading, isValidating } =
    useGetOeisQueryInfinite(
      initialQuery,
      query,
      sort as SearchOrder,
      initialData
    )

  const { q } = router.query

  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === "undefined") ||
    false
  const isEmpty = data?.[0]?.count === 0
  const isReachingEnd =
    isEmpty ||
    (data && (data[data.length - 1]?.results?.length || 0) < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  const onSearch = useCallback(
    (key: string) => {
      setQuery(key)
    },
    [setQuery]
  )

  useEffect(() => {
    const onScroll = () => {
      if (isLoadingMore || isReachingEnd) {
        return
      }

      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight * 1.5 >= scrollHeight) {
        setSize(size + 1)
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [size, setSize, isLoadingMore, isReachingEnd])

  useEffect(() => {
    if (!q || Array.isArray(q)) {
      return
    }

    setQuery(q)
    setSearch(q)
  }, [q, setQuery])

  useEffect(() => {
    if (router.query.q === query) {
      return
    }

    router.push({ pathname: "/", query: { q: query } }, undefined, {
      shallow: true,
    })
  }, [router, query])

  const results = useMemo(() => {
    if (!data) return []

    return data
      .map((response) => response.results)
      .filter((result) => result !== null)
      .flat() as Entry[]
  }, [data])

  const resultCount = useMemo(() => {
    if (!data || data.length === 0) return undefined

    return data[0].count
  }, [data])

  return (
    <Container>
      <Head>
        <title>{query + " :: OEIS"}</title>
        <meta
          name="description"
          content={
            "Enter a sequence, word, or sequence number and find any usages of it across hundreds of thousands of sources."
          }
        />
      </Head>
      <Main>
        <Centerer>
          <Content>
            <Logo />
            <Search search={search} setSearch={setSearch} onSearch={onSearch} />
            <NavLinks />
            {resultCount !== 1 && (
              <SearchMeta
                sort={sort}
                setSort={setSort}
                resultCount={resultCount}
              />
            )}
            <ResultsList
              results={results}
              query={query}
              isEmpty={isEmpty}
              isLoadingMore={isLoadingMore}
            />
          </Content>
        </Centerer>
      </Main>
    </Container>
  )
}

// export async function getStaticProps() {
//   // `getStaticProps` is executed on the server side.
// const data = await oeisFetcher(
//   `https://oeis.org/search?${qs.stringify({
//     q: defaultQuery,
//     start: 0,
//     fmt: "json",
//   })}`
// )

// return {
//   props: {
//     initialData: [data],
//   },
//   revalidate: 3600 * 24,
// }
// }

export async function getServerSideProps({ res, query }: any) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, maxage=3600, stale-while-revalidate=7200"
  )

  const initialQuery = query.q || defaultQuery

  const data = await oeisFetcher(
    `https://oeis.org/search?${qs.stringify({
      q: initialQuery,
      start: 0,
      fmt: "json",
    })}`
  )

  return {
    props: {
      initialData: [data],
      initialQuery: initialQuery,
    },
  }
}
