import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import client from '../../../api/apolloClient'
import { ROUTES } from '../../../routes'
import { toast } from 'react-toastify'
import { LOGIN_USER, END_SESSION } from './gql'
import { errorLogger } from '../../../helpers/errorLogger'

export const useAuth = () => {
  const router = useRouter()
  const [loginUser, { loading: authLoading }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      errorLogger(error.message)
      toast.error('Ошибка авторизации')
    },
    onCompleted: (data) => {
      if (data?.authenticateUserWithPassword?.sessionToken) {
        client.resetStore().then(() => {
          router.replace(ROUTES.MAIN)
        })
      } else {
        toast.error('Ошибка аутентификации. Проверьте email и пароль.')
      }
    }
  })

  const [endSession, { loading: logoutLoading }] = useMutation(END_SESSION, {
    onError: (error) => {
      errorLogger(error.message)
      toast.error('Ошибка завершения сессии')
    },
    onCompleted: () => {
      client.clearStore().then(() => {
        router.replace(ROUTES.AUTH)
      })
    }
  })

  const handleLogin = async (email: string, password: string) => {
    await loginUser({ variables: { email, password } })
  }

  const handleLogout = async () => {
    await endSession()
  }

  return {
    handleLogin,
    handleLogout,
    authLoading,
    logoutLoading
  }
}
