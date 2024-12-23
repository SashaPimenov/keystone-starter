import { useBooks } from '../../hooks/books'
import { BookType } from '../../pages/books/types'
import { Book } from '../Book'
import { ErrorComponent } from '../ErrorComponent'
import { LoadingComponent } from '../LoadingComponent'
import styles from './BooksContainer.module.css'

export const BooksContainer = () => {
  const { loading, error, data } = useBooks()

  if (loading) return <LoadingComponent />

  if (error) return <ErrorComponent />

  return (
    <section className={styles.container}>
      <div>
        <h2 className={styles.headerText}>Все книги</h2>
        {!data.objs.length ? (
          <h3 className={styles.headerText}>Книг нет</h3>
        ) : (
          <div className={styles.bookContainer}>
            {data.objs.map((book: BookType) => (
              <Book book={book} key={book.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
