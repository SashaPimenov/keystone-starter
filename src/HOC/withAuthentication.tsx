import { LoadingComponent } from '../components/LoadingComponent'
import { useCheckAuth } from '../hooks/auth'

export const withAuthentication = (WrappedComponent: React.ComponentType, protectedPage: boolean) => {
  return () => {
    const { isAuthenticated, loading: checkAuthLoading } = useCheckAuth()

    if (checkAuthLoading) {
      return <LoadingComponent />
    }

    if (isAuthenticated === protectedPage) {
      return null
    }

    return <WrappedComponent />
  }
}
