import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../graphql/client'
import Layout from '../components/Layout'
import '../style/global.css'
import { ChakraProvider } from '@chakra-ui/react'

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
