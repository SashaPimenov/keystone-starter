import { useContext } from 'react'
import { BookContext } from './BookContext'

export const useBook = () => {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider')
  }
  return context
}
