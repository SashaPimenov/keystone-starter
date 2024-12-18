import { BooksContainer } from '../components/BooksContainer/BooksContainer'
import { useCheckAuth } from '../hooks/auth/useCheckAuth/useCheckAuth'
import LoadingComponent from '../components/LoadingComponent/LoadingComponent'
import HeaderLayout from '../components/Layout/HeaderLayout'

export default function MainPage() {
  const { isAuthenticated, loading: checkAuthLoading } = useCheckAuth()

  if (checkAuthLoading || checkAuthLoading) {
    return <LoadingComponent />
  }

  if (!isAuthenticated) {
    return null
  }
  return (
    <HeaderLayout>
      <main>
        <h1>Страница для просмотра книг</h1>
        <BooksContainer />
      </main>
    </HeaderLayout>
  )
}
