import { useState } from "react"
import { Popover } from "react-tiny-popover"
import styled from "styled-components"

const Box = styled.div`
  background-color: rgb(255, 255, 255);
  color: ${(props) => props.theme.colors.coreGrey};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0px 6px 20px #0000000d;

  padding: 12px;
`

const Content = styled.p`
  color: ${(props) => props.theme.colors.coreGrey};
  margin-top: 0px;
  margin-bottom: 0px;
`

export default function HoverOver({ children, message }: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      isOpen={isOpen}
      positions={["top", "bottom", "left", "right"]}
      content={
        <Box>
          <Content>{message}</Content>
        </Box>
      }
    >
      <div
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </Popover>
  )
}
