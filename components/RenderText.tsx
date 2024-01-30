interface Props {
  text: string
}

export default function RenderText({ text }: Props) {
  const delimiter = /(_[A-z \.]{1,100}?_)/gi
  const getName = /_([A-z \.]{1,100}?)_/i

  return (
    <>
      {text.split(delimiter).map((word) => {
        const match = word.match(getName)

        if (match) {
          const name = match[1]
          return (
            <a key={word} href={`https://oeis.org/wiki/User:${name}`}>
              {name}
            </a>
          )
        }

        return word
      })}
    </>
  )
}
