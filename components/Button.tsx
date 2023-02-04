import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

const Container = styled.div<{ selected?: boolean }>`
  border: 1px solid
    ${(props) =>
      props.selected ? "#BCC0F0 !important" : props.theme.colors.border};
  padding: 8px 28px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0px 1px
    ${(props) =>
      props.selected ? "#BCC0F0 !important" : props.theme.colors.border};
  background: ${(props) => (props.selected ? "#F8F9FD !important" : "white")};

  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #dcdcdc30;
    border: 1px solid #d7d6d6;
  }
`

const Icon = styled(FontAwesomeIcon)<{ selected?: boolean }>`
  margin-right: 8px;
  color: ${(props) =>
    props.selected ? "#6F72B4" : props.theme.colors.coreGrey};
`

type Props = {
  children: any
  icon?: any
  selected?: boolean
  onClick?: () => void
}

export default function Search({
  children,
  icon,
  selected = false,
  onClick = () => {},
}: Props) {
  return (
    <Container selected={selected} onClick={onClick}>
      {icon && <Icon icon={icon} selected={selected} />}
      {children}
    </Container>
  )
}
