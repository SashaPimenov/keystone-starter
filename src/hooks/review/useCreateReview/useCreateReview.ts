import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_REVIEW } from './CREATE_REVIEW'
import { useBook } from '../../../context/useBook'

export const useCreateReview = () => {
  const [createReview, { loading }] = useMutation(CREATE_REVIEW)
  const [createReviewError, setCreateReviewError] = useState<string | null>(null)
  const { setBook } = useBook()
  const [successCreate, setSuccessCreate] = useState<string | null>(null)

  const handleSubmit = async (data: { content: string; rating: number; book: { connect: { id: string } } }) => {
    setCreateReviewError(null)
    setSuccessCreate(null)
    try {
      const response = await createReview({ variables: { data } })
      if (response.data?.createReview?.book) {
        setBook(response.data?.createReview?.book)
        setSuccessCreate('Отзыв успешно добавлен')
        setTimeout(() => setSuccessCreate(null), 3000)
      }
    } catch (err: any) {
      const errorMessage = err?.graphQLErrors?.[0]?.message || 'Ошибка при добавлении отзыва'
      setCreateReviewError(errorMessage)
      setTimeout(() => setCreateReviewError(null), 3000)
    }
  }

  return { handleSubmit, loading, error: createReviewError, successCreate }
}
