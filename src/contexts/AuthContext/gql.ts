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
