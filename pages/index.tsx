import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
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

import { oeisFetcher, useGetOeisQueryInfinite } from 'data/oeis';
import { Entry, SearchOrder } from 'interfaces';
import ResultsList from 'components/ResultsList';
import SearchMeta from 'components/SearchMeta';
import { defaultQuery } from 'data/defaultQuery';

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

const PAGE_SIZE = 10;

export default function Home({ initialData, initialQuery }: any): any {
  const router = useRouter();
  const [search, setSearch] = useState<string>(initialQuery);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const { data, size, setSize, isLoading } = useGetOeisQueryInfinite(
    initialQuery,
    initialQuery,
    'relevance' as SearchOrder,
    initialData
  );

  function onSearch(newSearch: string) {
    setIsRedirecting(true);
    router.push(`/search?q=${newSearch}&sort=relevance`);
  }

  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined') ||
    false;
  const isEmpty = data?.[0]?.count === 0;
  const isReachingEnd =
    isEmpty ||
    (data && (data[data.length - 1]?.results?.length || 0) < PAGE_SIZE);

  useEffect(() => {
    const onScroll = () => {
      if (isLoadingMore || isReachingEnd) {
        return;
      }

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight * 1.5 >= scrollHeight) {
        setSize(size + 1);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [size, setSize, isLoadingMore, isReachingEnd]);

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
        <title>{initialQuery + ' :: intdb'}</title>
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

export async function getStaticProps() {
  return {
    props: {
      initialData: [],
      initialQuery: '',
    },
    revalidate: 3600 * 24,
  };
}
