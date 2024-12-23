import { gql } from '@apollo/client'

export const CHECK_AUTH = gql`
  query User {
    authenticatedItem {
      ... on User {
        email
      }
    }
  }
`
