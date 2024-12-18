import { UUID } from 'crypto'

export type BookType = {
  id: UUID
  title: string
  reviews: ReviewType
  averageRating: number
  reviewsCount: number
}

export type ReviewType = {
  id: UUID
  content: string
  rating: number
  book: BookType
}
