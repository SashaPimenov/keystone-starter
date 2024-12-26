import Image from 'next/image'
import styles from './ReviewBook.module.css'
import image from '../../public/image.png'
import { ReviewsContainer } from '../ReviewsContainer'
import { useBookDetails } from '../../hooks/book'
import { useRouter } from 'next/router'
import { Rating } from '../Rating'
import { ReactNode } from 'react'

interface BookInfo {
  Название: string | undefined
  Рейтинг: ReactNode
  'Количество отзывов': number | undefined
}

export const ReviewBook = () => {
  const router = useRouter()
  const { id } = router.query
  const { book } = useBookDetails(id as string | undefined)

  const bookData: BookInfo = {
    Название: book?.title,
    Рейтинг: <Rating rating={book?.averageRating || 0} />,
    'Количество отзывов': book?.reviewsCount || 0
  }
  return (
    <div className={styles.container}>
      <div className={styles.bookInfoandImageContainer}>
        <div className={styles.imageContainer}>
          <Image width={220} height={300} alt='Обложка книги' src={image} priority />
        </div>
        <div className={styles.infoContainer}>
          {Object.entries(bookData).map(([key, value]) => (
            <div key={key}>
              <p className={styles.infoPropery}>{key}</p>
              <p className={styles.infoValue}>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <ReviewsContainer />
      </div>
    </div>
  )
}
