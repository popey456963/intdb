import styled from "styled-components"
import Select from "components/Select"
import { SearchOrder } from "interfaces"

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Results = styled.div`
  color: ${(props) => props.theme.colors.coreGrey};
  align-self: flex-end;
`

interface Props {
  sort: string
  setSort: (sort: string) => void
  resultCount?: number
}

export default function SearchMeta({ setSort, resultCount, sort }: Props) {
  function onSelect(option: string) {
    setSort(option)
  }

  return (
    <MetaRow>
      <Select onSelect={onSelect} sort={sort as SearchOrder} />
      {resultCount !== undefined && (
        <Results>
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </Results>
      )}
    </MetaRow>
  )
}
