import { ApolloClient, InMemoryCache } from '@apollo/client'

const server_url = 'http://localhost:4000/api/graphql'

const client = new ApolloClient({
  uri: server_url,
  cache: new InMemoryCache(),
  credentials: 'include'
})

export default client
