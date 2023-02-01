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
  z-index: 1;
`

const Input = styled.input`
  flex: 1;
  margin: 0px 20px;
  border: none;
  outline: None;
  font-size: 16px;
  height: 40px;
  width: 100%;
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
  border: 1px solid white;

  &:focus {
    border: inherit;
  }

  transition: all 0.1s;
  &:hover {
    border: 1px solid gainsboro;
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
  flex-wrap: wrap;
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
    background: ${(props) => props.theme.colors.lightGrey};
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

const ClickHole = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const Form = styled.form`
  width: 100%;
`

const HiddenInput = styled.input`
  display: none;
`

type Props = {
  defaultValue: string
  onSearch?: (query: string) => void
}

export default function Search({
  defaultValue = "",
  onSearch = () => {},
}: Props) {
  const [dropped, setDropped] = useState<boolean>(false)
  const [search, setSearch] = useState<string>(defaultValue)

  const textInput = useRef<any>(null)

  const buttons = [
    {
      icon: faFireFlameCurved,
      name: "Hot",
      onClick: () => {
        setDropped(false)
        setSearch("keyword:nice ")
        onSearch("keyword:nice ")
      },
      isSelected: () => search.includes("keyword:nice"),
    },
    {
      icon: faTimer,
      name: "Latest",
      onClick: () => {
        setDropped(false)
        setSearch("get:latest")
        onSearch("get:latest")
      },
      isSelected: () => search.includes("get:latest"),
    },
    {
      icon: faDiceThree,
      name: "Random",
      onClick: () => {
        setDropped(false)
        setSearch("get:random")
        onSearch("get:random")
      },
      isSelected: () => search.includes("get:random"),
    },
  ]

  function handleTag(tag: string) {
    setSearch(search + (search ? " " : "") + tag + ":")
    textInput.current?.focus()
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    onSearch(search)
    setDropped(false)
    textInput?.current?.blur()
  }

  return (
    <>
      {dropped && <ClickHole onClick={() => setDropped(false)} />}
      <Container>
        <Mag icon={faMagnifyingGlass} />
        <Form onSubmit={onSubmit}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setDropped(true)
            }}
            ref={textInput}
          />
          <HiddenInput type="submit" value="Submit" />
        </Form>
        {search.length !== 0 && (
          <CancelButton
            onClick={() => {
              setSearch("")
              textInput?.current?.focus()
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CancelButton>
        )}
        {dropped && (
          <>
            <Dropdown>
              <Categories>
                {buttons.map((item, index) => (
                  <Button
                    icon={item.icon}
                    key={item.name}
                    selected={item.isSelected()}
                    onClick={() => {
                      item.onClick()
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Categories>
              <SearchFor>
                <LabelText>Search for:</LabelText>
                <SearchField onClick={() => handleTag("author")}>
                  <SearchFieldIcon icon={faUser} />
                  <SearchFieldText>Author</SearchFieldText>
                </SearchField>
                <SearchField onClick={() => handleTag("keyword")}>
                  <SearchFieldIcon icon={faKeyboard} />
                  <SearchFieldText>Keyword</SearchFieldText>
                </SearchField>
                <SearchField onClick={() => handleTag("id")}>
                  <SearchFieldIcon icon={faFingerprint} />
                  <SearchFieldText>ID</SearchFieldText>
                </SearchField>
              </SearchFor>
            </Dropdown>
          </>
        )}
      </Container>
    </>
  )
}
