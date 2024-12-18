import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN_USER } from './LOGIN_USER'
import client from '../../../apolloClient'

export const useAuth = (email: string, password: string) => {
  const [loginUser] = useMutation(LOGIN_USER)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const handleSubmit = async () => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const { data } = await loginUser({
        variables: { email, password }
      })
      await client.resetStore()
      if (data?.authenticateUserWithPassword?.sessionToken) {
        router.replace('/')
        console.log('Успешная авторизация')
      } else {
        setAuthError('Ошибка аутентификации. Проверьте email и пароль.')
      }
    } catch (err: any) {
      setAuthError('Ошибка авторизации')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSubmit, isLoading, error: authError }
}
