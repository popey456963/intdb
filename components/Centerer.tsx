import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ verticalAlign?: boolean }>`
  display: flex;
  justify-content: center;
  margin: 0px 40px;
  @media (max-width: 768px) {
    margin: 0px 15px;
  }
  align-items: center;

  ${(props) =>
    props.verticalAlign &&
    `height:100%;
  margin: 0px 40px;
  padding-bottom: 70px;`}
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  ${(props) => props.theme.queries.mainWidth}
`;

const ThinInner = styled.div`
  display: flex;
  width: 750px;
  @media (max-width: 1000px) {
    max-width: 750px;
  }
`;

type Props = {
  children: React.ReactNode;
  thin?: boolean;
  verticalAlign?: boolean;
};

export default function Centerer({ children, thin, verticalAlign }: Props) {
  const InnerComp = thin ? ThinInner : Inner;
  return (
    <Container verticalAlign={verticalAlign}>
      <InnerComp>{children}</InnerComp>
    </Container>
  );
}
