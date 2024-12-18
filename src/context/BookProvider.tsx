import { ReactNode, useContext, useState } from 'react'
import { BookContext } from './BookContext'

export type Book = {
  title: string
  id: string
  averageRating: number
  reviewsCount: number
  reviews: { content: string; rating: number; id: string; user: { email: string; name: string } }[]
}

type BookProviderProps = {
  children: ReactNode
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [book, setBook] = useState<Book | null>(null)

  return <BookContext.Provider value={{ book, setBook }}>{children}</BookContext.Provider>
}
