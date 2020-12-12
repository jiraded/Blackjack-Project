import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'
import { onError } from '@apollo/link-error'

const uri = process.env.API_END_POINT || ''

export const client = new GraphQLClient(uri, { credentials: 'include' })

const httpLink = new HttpLink({ uri })

const logErrorsLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
  if (networkError) console.log(`[Network error]: ${networkError}`)
  alert(5)
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([logErrorsLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
})
