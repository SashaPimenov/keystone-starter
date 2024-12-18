import Image from 'next/image'
import styles from './Book.module.css'
import image from '../../public/image.png'
import Link from 'next/link'
import { BookType } from '../../hooks/books/useBooks/types'
import { Rating } from '../Rating/Rating'

type IProps = {
  book: Omit<BookType, 'reviews'>
}

export const Book = ({ book }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image style={{ objectFit: 'cover' }} src={image} alt='dasda' width={140} height={200} priority />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.bookProperty}>Название</p>
        <p className={styles.bookValue}>{book.title}</p>
        <p className={styles.bookProperty}>Рейтинг</p>
        <Rating rating={book.averageRating} />
        <p className={styles.bookProperty}>Количество отзывов: {book.reviewsCount}</p>
        <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
          <p className={styles.link}>Оставить отзыв</p>{' '}
        </Link>
      </div>
    </div>
  )
}
