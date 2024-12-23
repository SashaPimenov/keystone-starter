import { Header } from '../../components/Header'
import { withAuthentication } from '../../HOC/withAuthentication'
import { useRouter } from 'next/router'
import { LoadingComponent } from '../../components/LoadingComponent'
import { ErrorComponent } from '../../components/ErrorComponent'
import { ReviewBook } from '../../components/ReviewBook'
import { useBookDetails } from '../../hooks/book'

export function OneBookPage() {
  const router = useRouter()
  const { id } = router.query
  const { book, loading, error } = useBookDetails(id as string | undefined)

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return <ErrorComponent />
  }
  return (
    <main>
      <Header />
      <h1>Подробная информация о книге</h1>
      {book ? <ReviewBook /> : <p>Книга не найдена</p>}
    </main>
  )
}
export default withAuthentication(OneBookPage, false)
