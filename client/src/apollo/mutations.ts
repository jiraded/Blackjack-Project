import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE($firstname: String!, $lastname: String!, $nickname: String!) {
    updateProfile(firstname: $firstname, lastname: $lastname, nickname: $nickname) {
      id
      firstname
      lastname
      nickname
      createdAt
    }
  }
`
