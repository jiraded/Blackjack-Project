import { gql } from '@apollo/client'

export const CARDS = gql`
  query {
    cards {
      type
      value
      color
    }
  }
`
