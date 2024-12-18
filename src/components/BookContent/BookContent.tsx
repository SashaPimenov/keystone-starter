import { useRouter } from 'next/router'
import { useBookDetails } from '../../hooks/book/useBookDetails/useBookDetails'
import { useBook } from '../../context/useBook'
import { useEffect } from 'react'
import { ReviewBook } from '../ReviewBook/ReviewBook'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

export const BookContent = () => {
  const router = useRouter()
  const { id } = router.query
  const { book, loading, error } = useBookDetails(id as string | undefined)
  const { setBook } = useBook()

  useEffect(() => {
    if (book) {
      setBook(book)
    }
  }, [book, setBook])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <main>
      {error ? (
        <p>Ошибка: {error.message}</p>
      ) : book ? (
        <>
          <h1>Подробная информация о книге</h1>
          <ReviewBook />
        </>
      ) : (
        <p>Книга не найдена</p>
      )}
    </main>
  )
}
