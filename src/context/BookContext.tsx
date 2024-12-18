import { createContext, ReactNode, useContext, useState } from 'react'
import { Book } from './BookProvider'

export interface BookContextType {
  book: Book | null
  setBook: (book: Book) => void
}

export const BookContext = createContext<BookContextType | undefined>(undefined)
