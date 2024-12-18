import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_BOOKS } from './GET_BOOKS'
import { BookType } from './types'

export const useBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [books, setBooks] = useState<BookType[]>([])

  useEffect(() => {
    if (data) {
      setBooks(data.books)
    }
  }, [data])

  return { loading, error, books }
}
