import { useBook } from '../../context/useBook'
import { AddReview } from '../AddReview/AddReview'
import { Review } from '../Review/Review'
import styles from './ReviewsContainer.module.css'

export const ReviewsContainer = () => {
  const { book } = useBook()
  return (
    <section className={styles.container}>
      <AddReview />
      <h3 className={styles.header}>Все отзывы</h3>
      <div className={styles.reviewsContainer}>
        {book?.reviews.length === 0 ? (
          <p>Отзывов пока нет</p>
        ) : (
          book?.reviews.map((e: any, index: number) => <Review key={index} user={e.user} rating={e.rating} content={e.content} />)
        )}
      </div>
    </section>
  )
}
