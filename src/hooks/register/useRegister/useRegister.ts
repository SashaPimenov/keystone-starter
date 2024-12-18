import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_USER } from './CREATE_USER'
import { useAuth } from '../../auth/useAuth/useAuth'

export const useRegister = (name: string, email: string, password: string) => {
  const [createUser] = useMutation(CREATE_USER)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const { handleSubmit: authSubmit, isLoading } = useAuth(email, password)

  const handleSubmit = async () => {
    setRegistrationError(null)
    try {
      await createUser({
        variables: { data: { name, email, password } }
      })
      authSubmit()
    } catch (err: any) {
      setRegistrationError('Ошибка регистрации')
    }
  }

  return {
    handleSubmit,
    loading: isLoading,
    error: registrationError
  }
}
