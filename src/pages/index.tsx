import { BooksContainer } from '../components/BooksContainer'
import { Header } from '../components/Header'
import { withAuthentication } from '../HOC/withAuthentication'

export function MainPage() {
  return (
    <main>
      <Header />
      <h1>Страница для просмотра книг</h1>
      <BooksContainer />
    </main>
  )
}

export default withAuthentication(MainPage, false)
