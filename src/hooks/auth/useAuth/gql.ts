import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
    }
  }
`

export const END_SESSION = gql`
  mutation Mutation {
    endSession
  }
`

export const CHECK_AUTH = gql`
  query User {
    authenticatedItem {
      ... on User {
        email
      }
    }
  }
`
