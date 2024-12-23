import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { CREATE_USER } from './gql'
import { errorLogger } from '../../../helpers/errorLogger'
import { useAuth } from '../../auth'

type UseRegisterDataType = {
  name: string
  email: string
  password: string
}
export const useRegister = ({ name, email, password }: UseRegisterDataType) => {
  const [createUser, { loading: registerLoading }] = useMutation(CREATE_USER, {
    onError: (err) => {
      errorLogger(err.message)
      toast.error('Ошибка регистрации')
    },
    onCompleted: () => {
      handleLogin(email, password)
    }
  })

  const { handleLogin, authLoading } = useAuth()

  const handleRegister = async () => {
    await createUser({
      variables: { data: { name, email, password } }
    })
  }

  return {
    handleRegister,
    loading: registerLoading || authLoading
  }
}
