import { QueryOptions, useQuery } from '@apollo/client'
import { GET_BOOKS } from './gql'

export const useBooks = (options?: QueryOptions) => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    ...options
  })

  return { loading, error, data }
}
