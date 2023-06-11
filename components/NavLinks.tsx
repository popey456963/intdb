import Link from "next/link"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.coreGrey};
  font-size: 13px;
  padding-bottom: 40px;
`

const ColouredLink = styled(Link)`
  color: #8448f5;
`

export default function NavLinks() {
  return (
    <Container>
      <div>
        Powered by the <ColouredLink href="https://oeis.org">OEIS</ColouredLink>
        , built by{" "}
        <ColouredLink href="https://carefully.codes">Tom & Alex</ColouredLink>
      </div>
      <div>
        <Link href="https://oeis.org/wiki/Index_to_OEIS">Index</Link>
        {" | "}
        <Link href="https://oeis.org/webcam">Webcam</Link>
        {" | "}
        <Link href="https://oeis.org/wiki/Legal_Documents">
          Privacy and Legal
        </Link>
      </div>
    </Container>
  )
}
