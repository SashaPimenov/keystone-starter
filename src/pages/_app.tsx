import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
