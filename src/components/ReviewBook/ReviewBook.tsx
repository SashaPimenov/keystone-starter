import Image from 'next/image'
import styles from './ReviewBook.module.css'
import image from '../../public/image.png'
import { useBook } from '../../context/useBook'
import { ReviewsContainer } from '../ReviewsContainer/ReviewsContainer'
import { Rating } from '../Rating/Rating'

export const ReviewBook = () => {
  const { book } = useBook()

  return (
    <div className={styles.container}>
      <div className={styles.bookInfoandImageContainer}>
        <div className={styles.imageContainer}>
          <Image width={220} height={300} alt='Обложка книги' src={image} priority />
        </div>
        <div className={styles.infoContainer}>
          <div>
            <p className={styles.infoPropery}>Название</p>
            <p className={styles.infoValue}>{book?.title}</p>
          </div>
          <div>
            <p className={styles.infoPropery}>Рейтинг</p>
            <Rating rating={book ? book.averageRating : 0} />
          </div>
          <div>
            <p className={styles.infoPropery}>Количество отзывов</p>
            <p className={styles.infoValue}>{book?.reviewsCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <ReviewsContainer />
      </div>
    </div>
  )
}
