import { Entry } from "interfaces"
import Card from "./Card"
import styled from "styled-components"
import GridLoader from "react-spinners/GridLoader"
import theme from "styles/theme"

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Loader = styled(GridLoader)`
  padding-top: 48px;
  margin: auto;
`

const NotFoundCenterer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
`

const NotFound = styled.img`
  width: 249px;
`

interface Props {
  results: Array<Entry>
  query?: string
  isEmpty?: boolean
  isLoadingMore?: boolean
  setIsRedirecting?: (isRedirecting: boolean) => void
}

export default function ResultsList({
  results,
  query,
  isEmpty = false,
  isLoadingMore = false,
  setIsRedirecting,
}: Props) {
  return (
    <>
      <CardList>
        {results.map((entry) => (
          <Card
            card={entry}
            key={entry.number}
            query={query}
            mainEntry={results.length === 1}
            setIsRedirecting={setIsRedirecting}
          />
        ))}
      </CardList>
      {isEmpty && (
        <NotFoundCenterer>
          <NotFound src="notFound.svg" />
        </NotFoundCenterer>
      )}
      {isLoadingMore && <Loader color={theme.colors.primary} />}
    </>
  )
}
