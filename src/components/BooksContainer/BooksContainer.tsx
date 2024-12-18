import { useBooks } from '../../hooks/books/useBooks/useBooks'
import { Book } from '../Book/Book'
import styles from './BooksContainer.module.css'

export const BooksContainer = () => {
  const { loading, error, books } = useBooks()

  if (loading) return <p>Загрузка...</p>

  if (error) return <p>Ошибка: {error.message}</p>

  return (
    <section className={styles.container}>
      <div>
        <h2 className={styles.headerText}>Все книги</h2>
        {books.length === 0 ? (
          <h3 className={styles.headerText}>Книг нет</h3>
        ) : (
          <div className={styles.bookContainer}>
            {books.map((book) => (
              <Book book={book} key={book.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
