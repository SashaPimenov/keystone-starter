import { useQuery } from '@apollo/client'
import { GET_USER } from './GET_USER'
import { useState } from 'react'

export const useUserInfo = () => {
  const { data, loading, error } = useQuery(GET_USER)
  const [userError, setUserError] = useState<string | null>(null)

  if (error) {
    setUserError('Ошибка при получении данных пользователя.')
  }

  return {
    user: data?.authenticatedItem || null,
    loading,
    error: userError
  }
}
