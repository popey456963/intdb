import type { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"

import Centerer from "components/Centerer"
import Search from "components/Search"
import NavLinks from "components/NavLinks"
import Logo from "components/Logo"
import Card from "components/Card"

import { useGetOeisQuery } from "data/oeis"

const Container = styled.div``

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/background.png);
  background-size: cover;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Home: NextPage = () => {
  const { data, isLoading, error } = useGetOeisQuery("ID:A250159")

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
            <Search />
            <NavLinks />
            <Card />
          </Content>
        </Centerer>
      </Main>
    </Container>
  )
}

export default Home
