import styled from "styled-components"
import Image from "next/image"

import title from "public/title.svg"
import Link from "next/link"

const LogoImage = styled(Image)`
  margin-top: 32px;
  width: 100%;
  margin-bottom: 32px;
`

export default function Logo() {
  return (
    <Link href="/">
      <LogoImage
        src={title}
        alt="OEIS: Online Encyclopaedia of Integer Sequences"
      />
    </Link>
  )
}
