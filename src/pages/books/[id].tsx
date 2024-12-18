import { BookProvider } from '../../context/BookProvider'
import { useCheckAuth } from '../../hooks/auth/useCheckAuth/useCheckAuth'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import HeaderLayout from '../../components/Layout/HeaderLayout'
import { BookContent } from '../../components/BookContent/BookContent'

export default function OneBookPage() {
  const { isAuthenticated, loading: checkAuthLoading } = useCheckAuth()
  if (checkAuthLoading) {
    return <LoadingComponent />
  }

  if (!isAuthenticated) {
    return null
  }
  return (
    <BookProvider>
      <HeaderLayout>
        <BookContent />
      </HeaderLayout>
    </BookProvider>
  )
}
