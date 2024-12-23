import { useQuery } from '@apollo/client'
import { ReactNode, useContext } from 'react'
import { UserContext } from './AuthContext'
import { GET_USER } from './gql'

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data, loading, error } = useQuery(GET_USER)

  const user = data?.authenticatedItem || null
  const errorMessage = error ? 'Ошибка при получении данных пользователя.' : null

  return <UserContext.Provider value={{ user, loading, error: errorMessage }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
