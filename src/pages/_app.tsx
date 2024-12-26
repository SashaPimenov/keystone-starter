import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../api/apolloClient'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContext/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer
        position='bottom-left'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        pauseOnFocusLoss={false}
        theme='light'
        limit={3}
      />
    </ApolloProvider>
  )
}

export default MyApp
