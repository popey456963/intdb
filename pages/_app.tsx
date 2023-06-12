import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';

import 'styles/globals.css';
import theme from 'styles/theme';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-ZJSDQJM812'
          strategy='afterInteractive'
        />
        <Script strategy='afterInteractive' id='google-analytics'>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZJSDQJM812');
            gtag("consent", "default", {
              ad_storage: "denied",
              analytics_storage: "denied",
              wait_for_update: 2000 // milliseconds
            });
            `}
        </Script>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
