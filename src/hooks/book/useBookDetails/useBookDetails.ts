import { ApolloError, useQuery } from '@apollo/client'

import { GET_BOOK_BY_ID } from './GET_BOOK_BY_ID'
import { BookDetails } from '../../../context/types'

export const useBookDetails = (
  bookId: string | undefined
): {
  book: BookDetails | null
  loading: boolean
  error: ApolloError | undefined
} => {
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { where: { id: bookId } },
    skip: !bookId
  })

  const book = data?.book || null

  return { book, loading, error }
}
