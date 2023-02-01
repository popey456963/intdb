import type { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { useEffect, useState } from "react"
import GridLoader from "react-spinners/GridLoader"

import Centerer from "components/Centerer"
import Search from "components/Search"
import NavLinks from "components/NavLinks"
import Logo from "components/Logo"
import Card from "components/Card"

import { useGetOeisQuery, useGetOeisQueryInfinite } from "data/oeis"
import theme from "styles/theme"

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

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SearchMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 40px;
`

const Results = styled.div`
  color: ${(props) => props.theme.colors.coreGrey};
`

const Loader = styled(GridLoader)`
  padding-top: 48px;
  margin: auto;
`

// const Background = styled.div``

const PAGE_SIZE = 10

const Home: NextPage = () => {
  const [query, setQuery] = useState<string | undefined>("id:A000055")
  // const { data, isLoading, error } = useGetOeisQuery(query)
  const { data, size, setSize, isLoading, isValidating } =
    useGetOeisQueryInfinite(query)

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined")
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

  return (
    <Container>
      <Head>
        <title>Online Encyclopedia of Integer Sequences</title>
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
            <Search defaultValue="id:A000055" onSearch={onSearch} />
            <NavLinks />
            <SearchMeta>
              <div />
              {data && !isEmpty && (
                <Results>
                  {data[0].count} result{data[0].count !== 1 ? "s" : ""} found
                </Results>
              )}
            </SearchMeta>
            <CardList>
              {data &&
                data.map(
                  (response) =>
                    response?.results &&
                    response.results.map((entry) => (
                      <Card card={entry} key={entry.number} query={query} />
                    ))
                )}
            </CardList>
            {isEmpty && <p>No results found</p>}
            {isLoadingMore && <Loader color={theme.colors.primary} />}
          </Content>
        </Centerer>
      </Main>
    </Container>
  )
}

export default Home
