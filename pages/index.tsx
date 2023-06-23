import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import Centerer from 'components/Centerer';
import Search from 'components/Search';
import NavLinks from 'components/NavLinks';
import Logo from 'components/Logo';
import GridLoader from 'react-spinners/GridLoader';
import theme from 'styles/theme';
import {
  faMagnifyingGlass,
  faTimes,
  faTimer,
  faDiceThree,
  faFireFlameCurved,
  faUser,
  faKeyboard,
  faFingerprint,
} from '@fortawesome/pro-solid-svg-icons';

const Loader = styled(GridLoader)`
  padding-top: 48px;
  margin: auto;
`;

const Container = styled.div``;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 48px;
`;

export default function Home(): any {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  function onSearch(newSearch: string) {
    setIsRedirecting(true);
    router.push(`/search?q=${newSearch}&sort=relevance`);
  }

  const buttons = [
    {
      icon: faFireFlameCurved,
      name: 'Hot',
      onClick: () => {
        setSearch('keyword:nice ');
        onSearch('keyword:nice ');
      },
      isSelected: () => search.includes('keyword:nice'),
    },
    {
      icon: faTimer,
      name: 'Latest',
      onClick: () => {
        setSearch('get:latest');
        onSearch('get:latest');
      },
      isSelected: () => search.includes('get:latest'),
    },
    {
      icon: faDiceThree,
      name: 'Random',
      onClick: () => {
        setSearch('get:random');
        onSearch('get:random');
      },
      isSelected: () => search.includes('get:random'),
    },
  ];
  return (
    <Container>
      <Head>
        <title>Search :: intdb</title>
        <meta
          name='description'
          content={
            'Enter a sequence, word, or sequence number and find any usages of it across hundreds of thousands of sources.'
          }
        />
      </Head>
      <Main>
        <Centerer verticalAlign>
          <Content>
            <Logo />
            <Search search={search} setSearch={setSearch} onSearch={onSearch} />
            <NavLinks />
            {isRedirecting && <Loader color={theme.colors.primary} />}
          </Content>
        </Centerer>
      </Main>
    </Container>
  );
}
