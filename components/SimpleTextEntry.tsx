import styled from "styled-components"
import React from "react"
import RenderText from "./RenderText"

const Monospace = styled.pre`
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  font-family: "roboto mono";
  margin: 2px 0px;

  padding-left: 1em;
  text-indent: -1em;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`

type Props = {
    contents: string[]
}

export default function SimpleTextEntry({
    contents
}: Props) {
    return <div>{
        contents.map((line, index) => (
            <Monospace key={index}>
                <RenderText text={line} />
            </Monospace>
        ))
    }</div>

}