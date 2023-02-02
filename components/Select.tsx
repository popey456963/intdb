import Link from "next/link"
import styled from "styled-components"
import {
  faBarsSort,
  faChevronDown,
  faFireFlameCurved,
  IconDefinition,
  faHashtag,
  faAsterisk,
  faTimer,
  faPlus,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Button from "./Button"
import { searchOrderOptions, SearchOrder } from "interfaces"

const Container = styled.div`
  position: relative;
`

const SelectBox = styled.div`
  display: flex;
  gap: 21px;
  font-size: 14px;
  background: white;
  padding: 10px 23px;
  border-radius: 14px;
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;

  transition: 0.2s;
  &:hover {
    background: #fbfbfb;
    border: 1px solid #e1e1e1;
  }
`

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.coreGrey};
`

const Text = styled.div`
  min-width: 72px;
`

const DropArrow = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.coreGrey};
`

const DropOptions = styled.div`
  padding: 10px;
  background: white;
  border-radius: 14px;
  position: absolute;
  width: 100%;
  top: 51px;
  box-shadow: 0px 15px 14px #0000000f;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1;
`

const ClickHole = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const searchOrderToIcon: { [n: string]: IconDefinition } = {
  relevance: faFireFlameCurved,
  references: faAsterisk,
  number: faHashtag,
  modified: faTimer,
  created: faPlus,
}

type Props = {
  sort: SearchOrder
  onSelect: (sort: string) => void
}

export default function Select({ onSelect, sort }: Props) {
  const [dropped, setDropped] = useState<boolean>(false)

  return (
    <Container>
      <SelectBox
        onClick={() => {
          setDropped(!dropped)
        }}
      >
        <Icon icon={searchOrderToIcon[sort]} />
        <Text>{searchOrderOptions[sort]}</Text>
        <DropArrow icon={faChevronDown} />
      </SelectBox>
      {dropped && (
        <>
          <ClickHole
            onClick={() => {
              setDropped(false)
            }}
          />
          <DropOptions>
            {Object.entries(searchOrderOptions).map((val, index) => (
              <Button
                icon={searchOrderToIcon[val[0]]}
                key={index}
                selected={val[0] === sort}
                onClick={() => {
                  onSelect(val[0])
                  setDropped(false)
                }}
              >
                {val[1]}
              </Button>
            ))}
          </DropOptions>
        </>
      )}
    </Container>
  )
}
