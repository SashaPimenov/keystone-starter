import { useRouter } from 'next/router'
import { useBookDetails } from '../../hooks/book'
import { AddReview } from '../AddReview'
import { Review } from '../Review'
import styles from './ReviewsContainer.module.css'
import { ReviewType } from '../../pages/books/types'

export const ReviewsContainer = () => {
  const router = useRouter()
  const { id } = router.query
  const { book } = useBookDetails(id as string | undefined)

  return (
    <section className={styles.container}>
      <AddReview />
      <h3 className={styles.header}>Все отзывы</h3>
      <div className={styles.reviewsContainer}>
        {!book?.reviews.length ? (
          <p>Отзывов пока нет</p>
        ) : (
          book?.reviews.map((review: ReviewType) => <Review key={review.id} user={review.user} rating={review.rating} content={review.content} />)
        )}
      </div>
    </section>
  )
}
