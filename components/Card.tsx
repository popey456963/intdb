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
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons"
import dynamic from "next/dynamic"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Entry } from "interfaces"
import DropSection from "components/DropSection"
import React, { memo, useState } from "react"

import { parseProgramString } from "utils/program"
import { robotoMono } from "styles/fonts"
import Link from "next/link"

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
  font-family: ${robotoMono.style.fontFamily}, sans-serif;
  font-size: 14px;
  color: ${(props) => props.theme.colors.coreGrey};
  white-space: pre-wrap;
`

const Bold = styled.span`
  font-weight: 700;
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
  font-family: ${robotoMono.style.fontFamily};
  margin: 2px 0px;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ExpandChevron = styled(FontAwesomeIcon)<{ dropped: string }>`
  transition: all 0.3s;
  ${(props) => props.dropped === "true" && `transform: rotate(180deg);`}
`

const CodeHighlight = dynamic(() => import("./CodeHighlight"), { ssr: false })

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

  return (
    <>
      {programs.map((program, index) => (
        <CodeHighlight key={index} program={program} />
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

export default memo(function Card({
  card,
  query,
  defaultExpanded,
}: {
  card: Entry
  query?: string
  defaultExpanded?: boolean
}) {
  const [dropped, setDropped] = useState(defaultExpanded || false)

  const cardSize = cardProperties.reduce(
    (sum, parameter) =>
      sum + (card[parameter] ? (card[parameter] as any)?.length : 0),
    0
  )
  const defaultDropped = cardSize < 20

  const id = `A${String(card.number).padStart(6, "0")}`

  return (
    <Container>
      <Link href={`/${id}`}>
        <Content>
          <Misc>
            <ID>{id}</ID>
            <ProgIcons>
              {card.program && <ProgIcon src={"/code.svg"} alt="Has program" />}
              {card.maple && (
                <ProgIcon src={"/maple.svg"} alt="Has Maple program" />
              )}
              {card.mathematica && (
                <ProgIcon
                  src={"/mathmatica.svg"}
                  alt="Has Mathematica program"
                />
              )}
            </ProgIcons>
          </Misc>
          <Title>{card.name}</Title>
          <Values>
            <DataValues data={card.data} query={query} />
          </Values>
        </Content>
      </Link>
      <FullContent dropped={dropped}>
        {dropped && card.example && (
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
        {dropped && card.comment && (
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
        {dropped && card.formula && (
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
        {dropped && card.reference && (
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
        {dropped && card.link && (
          <DropSection
            icon={faLink}
            name={"Links"}
            defaultDropped={defaultDropped}
          >
            <Monospace
              dangerouslySetInnerHTML={{ __html: card.link.join("\n") }}
            />
          </DropSection>
        )}
        {dropped && card.xref && (
          <DropSection
            icon={faAsterisk}
            name={"Cross References"}
            defaultDropped={defaultDropped}
          >
            <Monospace>{card.xref}</Monospace>
          </DropSection>
        )}
        {dropped && card.ext && (
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
        <ExpandChevron icon={faChevronDown} dropped={dropped.toString()} />
      </Expander>
    </Container>
  )
})
