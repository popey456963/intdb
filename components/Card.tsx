import styled from "styled-components"
import {
  faChevronDown,
  faPresentationScreen,
  faComment,
  faAsterisk,
  faFunction,
  faBinary,
  faLink,
  faAnglesRight,
  faCircle,
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Entry } from "interfaces"
import DropSection from "components/DropSection"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { atelierDuneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { getHighlightLanguage, parseProgramString } from "utils/program"

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 14px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 6px 20px #0000000d;
`

const Content = styled.div`
  padding: 23px 23px 0px 23px;
  cursor: pointer;
`

const Misc = styled.div`
  display: flex;
  justify-content: space-between;
`

const ID = styled.div`
  font-size: 15px;
`

const ProgIcons = styled.div`
  display: flex;
  grid-gap: 10px;
`

const ProgIcon = styled.img`
  width: 17px;
`

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 12px 0px;
`

const Values = styled.p`
  font-family: "Roboto Mono", sans-serif;
  font-size: 14px;
  color: ${(props) => props.theme.colors.coreGrey};
`

const Bold = styled.span`
  font-weight: 800;
  font-size: 16px;
  color: #5049f2;
`

const Expander = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.coreGrey};
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #fafafa;
  }
`

const FullContent = styled.div<{ dropped: boolean }>`
  margin: ${(props) => (props.dropped ? "23px 23px 35px 23px" : "0px")};
  height: ${(props) => (props.dropped ? "fit-content" : "0px")};
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Monospace = styled.pre`
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  font-family: "roboto mono";
  margin: 2px 0px;
`

const ExpandChevron = styled(FontAwesomeIcon)<{ dropped: boolean }>`
  transition: all 0.3s;
  ${(props) => props.dropped && `transform: rotate(180deg);`}
`

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"))

function isIndexInIndices(index: number, indices: Array<[number, number]>) {
  for (let set of indices) {
    if (index >= set[0] && index < set[1]) {
      return true
    }
  }

  return false
}

function DataValues({ data, query }: { data: string; query?: string }) {
  const values = data.split(",")

  let indices: Array<[number, number]> = []
  if (query) {
    const parsedQuery = query
      .split(/[, ]/)
      .filter((item) => item !== "" && !isNaN(Number(item)))

    if (parsedQuery.length) {
      outer: for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < parsedQuery.length; j++) {
          if (values[i + j] !== parsedQuery[j]) {
            continue outer
          }
        }

        // we have found a match
        indices.push([i, i + parsedQuery.length])
      }
    }
  }

  return (
    <>
      {values.map((value, i) => (
        <span key={i}>
          {i > 0 && ", "}
          {isIndexInIndices(i, indices) ? <Bold>{value}</Bold> : value}
        </span>
      ))}
    </>
  )
}

function CodeDisplay({
  program,
  maple,
  mathematica,
}: {
  program: Array<string>
  maple?: Array<string>
  mathematica?: Array<string>
}) {
  let programs = []

  if (maple) {
    programs.push({
      language: "maple",
      code: maple,
    })
  }

  if (mathematica) {
    programs.push({
      language: "mathematica",
      code: mathematica,
    })
  }

  programs = [...programs, ...parseProgramString(program)]
  console.log(atelierDuneDark)

  atelierDuneDark["hljs-name"] = { color: "#045FFE" }
  atelierDuneDark["hljs-variable"] = { color: "#045FFE" }

  atelierDuneDark["hljs-attribute"] = { color: "#8891FF" }
  atelierDuneDark["hljs-built_in "] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-builtin-name"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-bullet"] = { color: "#60ac39" }
  atelierDuneDark["hljs-comment"] = { color: "#5692FC" }
  atelierDuneDark["hljs-emphasis"] = { fontStyle: "italic" }
  atelierDuneDark["hljs-keyword"] = { color: "#045FFE" }
  atelierDuneDark["hljs-link"] = { color: "#8891FF" }
  atelierDuneDark["hljs-literal"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-meta"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-name"] = { color: "#045FFE" }
  atelierDuneDark["hljs-number"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-params"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-quote"] = { color: "#5692FC" }
  atelierDuneDark["hljs-regexp"] = { color: "#8891FF" }
  atelierDuneDark["hljs-section"] = { color: "#045FFE" }
  atelierDuneDark["hljs-selector-class"] = { color: "#8891FF" }
  atelierDuneDark["hljs-selector-id"] = { color: "#8891FF" }
  atelierDuneDark["hljs-selector-tag"] = { color: "#045FFE" }
  atelierDuneDark["hljs-string"] = { color: "#60ac39" }
  atelierDuneDark["hljs-strong"] = { fontWeight: "bold" }
  atelierDuneDark["hljs-symbol"] = { color: "#60ac39" }
  atelierDuneDark["hljs-tag"] = { color: "#8891FF" }
  atelierDuneDark["hljs-template-variable"] = { color: "#8891FF" }
  atelierDuneDark["hljs-title"] = { color: "#045FFE" }
  atelierDuneDark["hljs-type"] = { color: "rgb(64 181 81)" }
  atelierDuneDark["hljs-variable"] = { color: "#8891FF" }
  return (
    <>
      {programs.map((program, index) => (
        <SyntaxHighlighter
          key={index}
          language={getHighlightLanguage(program.language)}
          wrapLongLines={true}
          style={atelierDuneDark}
          customStyle={{
            background:
              "linear-gradient(225deg, rgba(8,6,16,1) 0%, rgba(26,24,52,1) 100%)",
            color: "rgb(129 125 162)",
            fontFamily: "Roboto Mono",
            padding: "32px",
            borderRadius: "14px",
          }}
        >
          {program.code.join("\n")}
        </SyntaxHighlighter>
      ))}
    </>
  )
}

const cardProperties: Array<keyof Entry> = [
  "example",
  "link",
  "formula",
  "maple",
  "mathematica",
  "program",
  "xref",
  "ext",
  "comment",
  "reference",
]

export default function Card({ card, query }: { card: Entry; query?: string }) {
  const [dropped, setDropped] = useState(false)

  const cardSize = cardProperties.reduce(
    (sum, parameter) =>
      sum + (card[parameter] ? (card[parameter] as any)?.length : 0),
    0
  )
  const defaultDropped = cardSize < 20
  console.log(defaultDropped)

  return (
    <Container>
      <Content
        onClick={() => {
          setDropped(!dropped)
        }}
      >
        <Misc>
          <ID>A{String(card.number).padStart(6, "0")}</ID>
          <ProgIcons>
            {card.program && <ProgIcon src={"/code.svg"} />}
            {card.maple && <ProgIcon src={"/maple.svg"} />}
            {card.mathematica && <ProgIcon src={"/mathmatica.svg"} />}
          </ProgIcons>
        </Misc>
        <Title>{card.name}</Title>
        <Values>
          <DataValues data={card.data} query={query} />
        </Values>
      </Content>
      <FullContent dropped={dropped}>
        {card.example && (
          <DropSection
            icon={faPresentationScreen}
            name={"Example"}
            defaultDropped
          >
            {card.example?.map((line, index) => (
              <Monospace key={index}>{line}</Monospace>
            ))}
          </DropSection>
        )}
        {card.comment && (
          <DropSection
            icon={faComment}
            name={"Comment"}
            defaultDropped={defaultDropped}
          >
            {card.comment?.map((line, index) => (
              <Monospace key={index}>{line}</Monospace>
            ))}
          </DropSection>
        )}
        {card.formula && (
          <DropSection
            icon={faFunction}
            name={"Formula"}
            defaultDropped={defaultDropped}
          >
            <Monospace>{card.formula}</Monospace>
          </DropSection>
        )}
        {dropped && card.program && (
          <DropSection
            icon={faBinary}
            name={"Programs"}
            defaultDropped={defaultDropped}
          >
            <CodeDisplay
              program={card.program}
              maple={card.maple}
              mathematica={card.mathematica}
            />
          </DropSection>
        )}
        {card.reference && (
          <DropSection
            icon={faAsterisk}
            name={`References (${card.references})`}
            defaultDropped={defaultDropped}
          >
            {card.reference?.map((line, index) => (
              <Monospace key={index}>{line}</Monospace>
            ))}
          </DropSection>
        )}
        {card.link && (
          <DropSection
            icon={faLink}
            name={"Links"}
            defaultDropped={defaultDropped}
          >
            <Monospace>{card.link}</Monospace>
          </DropSection>
        )}
        {card.xref && (
          <DropSection
            icon={faAsterisk}
            name={"Cross References"}
            defaultDropped={defaultDropped}
          >
            <Monospace>{card.xref}</Monospace>
          </DropSection>
        )}
        {card.ext && (
          <DropSection
            icon={faAnglesRight}
            name={"Extensions"}
            defaultDropped={defaultDropped}
          >
            <Monospace>{card.ext}</Monospace>
          </DropSection>
        )}
        <DropSection
          icon={faCircleInfo}
          name={"Meta Information"}
          defaultDropped={defaultDropped}
        >
          {card.id && <Monospace>Formerly known as {card.id}</Monospace>}
          <Monospace>Keyword: {card.keyword}</Monospace>
          <Monospace>Author: {card.author}</Monospace>
          <Monospace>Updated: {card.time}</Monospace>
          <Monospace>Created: {card.created}</Monospace>
          <Monospace>Revision: {card.revision}</Monospace>
        </DropSection>
      </FullContent>
      <Expander onClick={() => setDropped(!dropped)}>
        <ExpandChevron icon={faChevronDown} dropped={dropped} />
      </Expander>
    </Container>
  )
}
