import {
  faMagnifyingGlass,
  faTimes,
  faTimer,
  faDiceThree,
  faFireFlameCurved,
  faUser,
  faKeyboard,
  faFingerprint,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef } from "react"
import styled from "styled-components"
import Button from "./Button"

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 15px;
  padding: 7px 23px;
  display: flex;
  align-items: center;
  position: relative;
  background: white;
`

const Input = styled.input`
  flex: 1;
  margin: 0px 20px;
  border: none;
  outline: None;
  font-size: 16px;
  height: 40px;
`

const Mag = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.coreGrey};
`

const CancelButton = styled.button`
  background: #f0f0f4;
  padding: 3px 8px;
  border-radius: 4px;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: ${(props) => props.theme.colors.coreGrey};

  &:focus {
    border: inherit;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 42px;
  width: calc(100% + 2px);
  background: white;
  padding-top: 12px;
  left: -1px;
  border-left: 1px solid ${(props) => props.theme.colors.border};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px 15px 14px #0000000f;
`

const Categories = styled.div`
  display: flex;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding: 14px 23px;
  grid-gap: 15px;
`

const SearchFor = styled.div`
  padding: 25px 20px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`

const LabelText = styled.div`
  color: ${(props) => props.theme.colors.coreGrey};
  font-size: 14px;
  margin-bottom: 14px;
`

const SearchField = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  padding: 8px;
  border-radius: 10px;

  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`

const SearchFieldIcon = styled(FontAwesomeIcon)`
  background: ${(props) => props.theme.colors.border};
  width: 30px;
  height: 30px;
  padding: 8px;
  box-sizing: border-box !important;
  border-radius: 6px;
`

const SearchFieldText = styled.div`
  font-size: 14px;
`

type Props = {
  onSearch?: (query: string) => void
}

export default function Search({ onSearch = () => {} }: Props) {
  const [buttonSelected, setButtonSelected] = useState<number | undefined>(
    undefined
  )
  const [dropped, setDropped] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const textInput = useRef<any>(null)

  const buttons = [
    {
      icon: faFireFlameCurved,
      name: "Hot",
    },
    {
      icon: faTimer,
      name: "Latest",
    },
    {
      icon: faDiceThree,
      name: "Random",
    },
  ]

  return (
    <Container>
      <Mag icon={faMagnifyingGlass} />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            onSearch(search)
            textInput?.current?.blur()
          }
        }}
        onFocus={() => {
          setDropped(true)
        }}
        onBlur={() => {
          setDropped(false)
        }}
        ref={textInput}
      />
      {search.length !== 0 && (
        <CancelButton onClick={() => setSearch("")}>
          <FontAwesomeIcon icon={faTimes} />
        </CancelButton>
      )}
      {dropped && (
        <Dropdown>
          <Categories>
            {buttons.map((item, index) => (
              <Button
                icon={item.icon}
                key={item.name}
                selected={buttonSelected === index}
                onClick={() => {
                  setButtonSelected(index)
                }}
              >
                {item.name}
              </Button>
            ))}
          </Categories>
          <SearchFor>
            <LabelText>Search for:</LabelText>
            <SearchField>
              <SearchFieldIcon icon={faUser} />
              <SearchFieldText>Author</SearchFieldText>
            </SearchField>
            <SearchField>
              <SearchFieldIcon icon={faKeyboard} />
              <SearchFieldText>Keyword</SearchFieldText>
            </SearchField>
            <SearchField>
              <SearchFieldIcon icon={faFingerprint} />
              <SearchFieldText>ID</SearchFieldText>
            </SearchField>
          </SearchFor>
        </Dropdown>
      )}
    </Container>
  )
}
