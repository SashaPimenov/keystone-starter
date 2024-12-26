import { QueryOptions, useQuery } from '@apollo/client'
import { GET_BOOKS } from './gql'

export const useBooks = (options?: QueryOptions) => {
  return useQuery(GET_BOOKS, {
    ...options
  })
}
