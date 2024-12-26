import { GraphQLClient } from './testUtils/GraphQLClient'

const CREATE_REVIEW = ` mutation CreateReview($data: ReviewCreateInput!) {
    obj:createReview(data: $data) {
        user {
        id
        }
        book {
        id
        }
        id
        rating
        content
    }
}`

const UPDATE_REVIEW = `mutation UpdateReview($where: ReviewWhereUniqueInput!, $data: ReviewUpdateInput!) {
    obj: updateReview(where: $where, data: $data) {
      id
    }
 }`

const DELETE_REVIEW = `mutation DeleteReview($where: ReviewWhereUniqueInput!) {
       obj: deleteReview(where: $where) {
          id
        }
      }`
export const createReview = async (client: GraphQLClient, attrs = {}) => {
  const variables = {
    ...attrs
  }
  const { data, errors } = await client.request(CREATE_REVIEW, variables)

  return { data, errors }
}

export const updateReview = async (client: GraphQLClient, attrs = {}) => {
  const variables = {
    ...attrs
  }
  const { data, errors } = await client.request(UPDATE_REVIEW, variables)

  return { data, errors }
}

export const deleteReview = async (client: GraphQLClient, attrs = {}) => {
  const variables = {
    ...attrs
  }
  const { data, errors } = await client.request(DELETE_REVIEW, variables)

  return { data, errors }
}
