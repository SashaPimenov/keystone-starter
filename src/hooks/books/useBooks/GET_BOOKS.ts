import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query Books {
    books {
      id
      title
      averageRating
      reviewsCount
    }
  }
`
