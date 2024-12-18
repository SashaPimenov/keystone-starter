export type BookDetails = {
  title: string
  id: string
  averageRating: number
  reviewsCount: number
  reviews: { content: string; rating: number; id: string; user: { email: string; name: string } }[]
}
