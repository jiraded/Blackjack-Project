import { gql } from '@apollo/client'

export const SIGNIN = gql`
  mutation SIGNIN($username: String!, $password: String!) {
    signin(password: $password, username: $username) {
      _id
      username
    }
  }
`
