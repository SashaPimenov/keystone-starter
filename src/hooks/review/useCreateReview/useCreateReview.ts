import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from './gql'
import { toast } from 'react-toastify'
import { errorLogger } from '../../../helpers/errorLogger'
import _ from 'lodash'

type RequestData = { content: string; rating: number; book: { connect: { id: string } } }
export const useCreateReview = (onSuccess: () => void) => {
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      if (data.createReview?.book) {
        toast.success('Отзыв успешно добавлен')
        onSuccess()
      }
    },
    onError: (error) => {
      const message = _.get(error, 'graphQLErrors[0].message').split(': ')[1]
      errorLogger(message)
      toast.error(message)
    }
  })

  const handleCreateReview = async (data: RequestData) => {
    await createReview({ variables: { data } })
  }

  return { handleCreateReview, data, loading, error }
}
