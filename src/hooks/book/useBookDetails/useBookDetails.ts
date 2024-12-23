import { QueryOptions, useQuery } from '@apollo/client'
import { GET_BOOK_BY_ID } from './gql'

export const useBookDetails = (bookId: string | undefined, options?: QueryOptions) => {
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { where: { id: bookId } },
    skip: !bookId,
    ...options
  })

  const book = data?.obj || null

  return { book, loading, error }
}
