import type { AppProps } from "next/app"
import Script from "next/script"
import { ThemeProvider } from "styled-components"
import { Analytics } from "@vercel/analytics/react"

import "styles/globals.css"
import theme from "styles/theme"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { roboto } from "styles/fonts"
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default MyApp
