import { useEffect, useState } from 'react'
import styles from './AddReview.module.css'
import { useRouter } from 'next/router'
import { useCreateReview } from '../../hooks/review/useCreateReview/useCreateReview'
import { ChangedRating } from '../ChangedRating/ChangedRating'

export const AddReview = () => {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(1)
  const router = useRouter()
  const { id } = router.query
  const { handleSubmit, loading, error, successCreate } = useCreateReview()

  const handleAddReview = async () => {
    const data = {
      content: reviewText,
      rating,
      book: { connect: { id: id as string } }
    }
    try {
      await handleSubmit(data)
    } catch {
      console.log('error')
    } finally {
      setReviewText('')
      setRating(1)
    }
  }
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
        <button className={styles.button} disabled={reviewText.length < 50 || rating === 0 || loading} onClick={handleAddReview}>
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successCreate && <div style={{ color: 'green' }}>{successCreate}</div>}
    </>
  )
}
