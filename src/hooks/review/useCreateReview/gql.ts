import { gql } from '@apollo/client'

export const CREATE_REVIEW = gql`
  mutation Mutation($data: ReviewCreateInput!) {
    createReview(data: $data) {
      book {
        title
        id
        averageRating
        reviewsCount
        reviews {
          content
          rating
          id
          user {
            email
            name
          }
        }
      }
    }
  }
`
