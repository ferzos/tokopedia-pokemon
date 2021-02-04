import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { css, Global } from "@emotion/react";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql'
});

const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        height: 100vh;
        width: 100vw;
        overflow-y: auto;
        overflow-wrap: break-word;
        margin: 0 auto;
        background-color: #E3350D;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
        min-width: 320px;
        max-width: 375px;
        p: {
          margin: 0
        }
      }
    `}
  />
)

// @ts-ignore
function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      {globalStyles}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
