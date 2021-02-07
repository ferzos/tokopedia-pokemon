import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { css, Global } from "@emotion/react";
import Head from "next/head";
import 'semantic-ui-css/semantic.min.css'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql'
});

const globalStyles = (
  <Global
    styles={css`
      html {
        height: 100%
      }

      body {
        background-color: #E3350D;
        font-size: 16px;
        p: {
          margin: 0
        }
        margin: 0;
      }
    `}
  />
)

// @ts-ignore
function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Pokemon Tokopedia</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      {globalStyles}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
