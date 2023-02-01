import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPresentationScreen,
  faChevronDown,
} from "@fortawesome/pro-solid-svg-icons"
import React, { useState } from "react"

const Container = styled.div``

const Header = styled.div<{ dropped: boolean }>`
  display: flex;
  align-items: center;
  padding: 13px;
  border-radius: 8px;

  cursor: pointer;

  background: ${(props) =>
    props.dropped ? props.theme.colors.lightGrey : "white"};

  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.lightGrey};
  }
`

const Icon = styled(FontAwesomeIcon)`
  min-width: 20px;
`

const Name = styled.div`
  flex: 1;
  margin-left: 16px;
  font-size: 14px;
  font-weight: 500;
`

const DropArrow = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.coreGrey};
`

const Content = styled.div<{ dropped: boolean }>`
  margin: ${(props) => (props.dropped ? "13px" : "0px")};
  overflow: hidden;
  height: ${(props) => (props.dropped ? "fit-content" : "0px")};
  font-size: 14px;
`

type Props = {
  defaultDropped?: boolean
  icon?: any
  name: string
  children: any
}

export default function DropSection({
  defaultDropped = false,
  icon,
  name,
  children,
}: Props) {
  const [dropped, setDropped] = useState(defaultDropped)

  return (
    <Container>
      <Header
        dropped={dropped}
        onClick={() => {
          setDropped(!dropped)
        }}
      >
        {icon && <Icon icon={icon} />}
        <Name>{name}</Name>
        <DropArrow icon={faChevronDown} />
      </Header>
      <Content dropped={dropped}>{children}</Content>
    </Container>
  )
}
