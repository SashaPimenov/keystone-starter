import { Rating } from '../Rating/Rating'
import styles from './Review.module.css'

type IProps = {
  user: {
    name: string
    email: string
  }
  rating: number
  content: string
}
export const Review = ({ user, rating, content }: IProps) => {
  return (
    <div className={styles.textContainer}>
      <div className={styles.ratingContainer}>
        <p className={styles.resultText}>Автор:</p>
        <p className={styles.authorText}>
          {user.name} ({user.email})
        </p>
      </div>
      <div>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.ratingContainer}>
        <p className={styles.resultText}>Итоговая оценка:</p>
        <Rating rating={rating} />
      </div>
    </div>
  )
}
