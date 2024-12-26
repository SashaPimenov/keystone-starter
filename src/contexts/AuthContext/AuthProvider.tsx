import React, { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useQuery, useMutation } from '@apollo/client'
import client from '../../api/apolloClient'
import { errorLogger } from '../../helpers/errorLogger'
import { ROUTES } from '../../routes'
import { GET_USER, LOGIN_USER, END_SESSION } from './gql'

export const AuthContext = createContext<UserContextType | undefined>(undefined)

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_USER)
  const user = data?.authenticatedItem || null
  const errorMessage = error ? 'Ошибка при получении данных пользователя.' : null

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

  const login = async (email: string, password: string) => {
    await loginUser({ variables: { email, password } })
  }

  const logout = async () => {
    await endSession()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error: errorMessage,
        login,
        authLoading,
        logout,
        logoutLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
