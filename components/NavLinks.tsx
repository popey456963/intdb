import Link from "next/link"
import styled from "styled-components"

const Container = styled.div`
  margin-left: auto;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.coreGrey};
  font-size: 13px;
`

export default function NavLinks() {
  return (
    <Container>
      <Link href="https://oeis.org/wiki/Index_to_OEIS">Index</Link>
      {" | "}
      <Link href="https://oeis.org/webcam">Webcam</Link>
      {" | "}
      <Link href="/legal">Privacy and Legal</Link>
    </Container>
  )
}
