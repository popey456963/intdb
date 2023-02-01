import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 40px;
  @media (max-width: 380px) {
    margin: 0px 30px;
  }
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  ${(props) => props.theme.queries.mainWidth}
`

const ThinInner = styled.div`
  display: flex;
  width: 750px;
  @media (max-width: 1000px) {
    max-width: 750px;
  }
`

type Props = { children: React.ReactNode; thin?: boolean }

export default function Centerer({ children, thin }: Props) {
  const InnerComp = thin ? ThinInner : Inner
  return (
    <Container>
      <InnerComp>{children}</InnerComp>
    </Container>
  )
}
