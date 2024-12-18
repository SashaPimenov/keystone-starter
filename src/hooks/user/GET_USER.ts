import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User {
    authenticatedItem {
      ... on User {
        name
        email
      }
    }
  }
`
