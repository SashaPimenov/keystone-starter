import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { CREATE_USER } from './gql'
import { errorLogger } from '../../../helpers/errorLogger'
import { useAuth } from '../../../contexts/AuthContext/AuthProvider'

type UseRegisterDataType = {
  name: string
  email: string
  password: string
}
export const useRegister = () => {
  const [createUser, { loading: registerLoading }] = useMutation(CREATE_USER, {
    onError: (err) => {
      errorLogger(err.message)
      toast.error('Ошибка регистрации')
    }
  })

  const { login, authLoading } = useAuth()

  const handleRegister = async ({ name, email, password }: UseRegisterDataType) => {
    await createUser({
      variables: { data: { name, email, password } }
    })
    await login(email, password)
  }

  return {
    handleRegister,
    loading: registerLoading || authLoading
  }
}
