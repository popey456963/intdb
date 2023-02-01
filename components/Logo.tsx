import styled from "styled-components"
import Image from "next/image"

import title from "public/title.svg"

const LogoImage = styled(Image)`
  margin-top: 32px;
  width: 100%;
  margin-bottom: 32px;
`

export default function Logo() {
  return (
    <LogoImage
      src={title}
      alt="OEIS: Online Encyclopedia of Integer Sequences"
    />
  )
}
