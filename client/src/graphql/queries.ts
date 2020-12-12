import { gql } from '@apollo/client'

export const CARDS = gql`
  query CARDS {
    cards {
      type
      value
      color
    }
  }
`
