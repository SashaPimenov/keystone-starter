import Image from 'next/image'
import styles from './Book.module.css'
import image from '../../public/image.png'
import Link from 'next/link'
import { BookType } from '../../pages/books/types'
import { Rating } from '../Rating/Rating'
import { ROUTES } from '../../routes/routes'

type IProps = {
  book: Omit<BookType, 'reviews'>
}

export const Book = ({ book }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={image} alt='dasda' width={140} height={200} priority className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.bookProperty}>Название</p>
        <p className={styles.bookValue}>{book.title}</p>
        <p className={styles.bookProperty}>Рейтинг</p>
        <Rating rating={book.averageRating} />
        <p className={styles.bookProperty}>Количество отзывов: {book.reviewsCount}</p>
        <Link href={`${ROUTES.BOOK}/${book.id}`} className={styles.link}>
          <p className={styles.linkText}>Оставить отзыв</p>{' '}
        </Link>
      </div>
    </div>
  )
}
