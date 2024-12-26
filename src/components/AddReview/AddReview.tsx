import { useState } from 'react'
import styles from './AddReview.module.css'
import { useRouter } from 'next/router'
import { useCreateReview } from '../../hooks/review/useCreateReview/useCreateReview'
import { ChangedRating } from '../ChangedRating/ChangedRating'

export const AddReview = () => {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(1)
  const router = useRouter()
  const { id } = router.query
  const { handleCreateReview, loading } = useCreateReview(() => {
    setReviewText('')
    setRating(1)
  })

  const handleAddReview = async () => {
    if (isValidate) {
      const reviewData = {
        content: reviewText,
        rating,
        book: { connect: { id: id as string } }
      }
      await handleCreateReview(reviewData)
    }
  }

  const isValidate = reviewText.length > 50 && reviewText.length < 1000 && rating < 6 && rating > 0

  return (
    <>
      <h3 className={styles.header}>Добавить отзыв</h3>
      <textarea
        minLength={50}
        maxLength={1000}
        placeholder='Напишите отзыв о книге. Минимальное количество символов - 50. Максимальное - 1000'
        className={styles.textArea}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className={styles.ratingContainer}>
        <p>Оцените книгу:</p>
        <ChangedRating rating={rating} onRate={setRating} />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} disabled={!isValidate || loading} onClick={handleAddReview}>
          {loading ? 'Добавление...' : 'Добавить отзыв'}
        </button>
      </div>
    </>
  )
}
