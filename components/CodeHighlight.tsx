import dynamic from "next/dynamic"
import { atelierForestLight } from "react-syntax-highlighter/dist/cjs/styles/hljs"

import { Program } from "interfaces"
import { robotoMono } from "styles/fonts"
import { getHighlightLanguage } from "utils/program"

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter"))

export default function CodeHighlight({ program }: { program: Program }) {
  const languageName =
    program.language.charAt(0).toUpperCase() + program.language.slice(1)

  return (
    <>
      <h4>{languageName}</h4>
      <SyntaxHighlighter
        language={getHighlightLanguage(program.language)}
        wrapLongLines={true}
        style={atelierForestLight}
        customStyle={{
          color: "rgb(129 125 162)",
          fontFamily: robotoMono.style.fontFamily,
          padding: "32px",
          borderRadius: "14px",
        }}
      >
        {program.code.join("\n")}
      </SyntaxHighlighter>
    </>
  )
}
