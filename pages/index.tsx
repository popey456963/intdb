import type { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { useEffect, useMemo, useState } from "react"

import Centerer from "components/Centerer"
import Search from "components/Search"
import NavLinks from "components/NavLinks"
import Logo from "components/Logo"

import { useGetOeisQueryInfinite } from "data/oeis"
import { Entry, SearchOrder } from "interfaces"
import ResultsList from "components/ResultsList"
import SearchMeta from "components/SearchMeta"

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

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("1, 2, 3, 6, 11")
  const [sort, setSort] = useState<string>("relevance")
  const { data, size, setSize, isLoading, isValidating } =
    useGetOeisQueryInfinite(query, sort as SearchOrder)

  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === "undefined") ||
    false
  const isEmpty = data?.[0]?.count === 0
  const isReachingEnd =
    isEmpty ||
    (data && (data[data.length - 1]?.results?.length || 0) < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  const onSearch = (key: string) => {
    setQuery(key)
  }

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
            <Search defaultValue="1, 2, 3, 6, 11" onSearch={onSearch} />
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

export default Home
