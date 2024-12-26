import { GraphQLClient } from './testUtils/GraphQLClient'

const CREATE_BOOK = ` mutation CreateBook($data: BookCreateInput!) {
    obj: createBook(data: $data) {
      id
      title
    }
  }`

const GET_BOOK = ` query Books {
    objs: books {
      id
    }
  }`

export const createBook = async (client: GraphQLClient, attrs = {}) => {
  const variables = {
    ...attrs
  }
  const { data, errors } = await client.request(CREATE_BOOK, variables)

  return { data, errors }
}

export const readBook = async (client: GraphQLClient) => {
  const { data, errors } = await client.request(GET_BOOK)

  return { data, errors }
}
