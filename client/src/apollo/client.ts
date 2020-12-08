import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.API_END_POINT

export const client = new GraphQLClient(endpoint || '', {
  credentials: 'include',
})

export const apolloClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
  credentials: 'include',
})
