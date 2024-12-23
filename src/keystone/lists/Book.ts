import { graphql, list } from '@keystone-6/core'
import { relationship, text, timestamp, virtual } from '@keystone-6/core/fields'
import { trackingFields } from '../trackingFields'
import { allOperations } from '@keystone-6/core/access'
import { isAuth } from '../access_utils/isAuth'
import { isAdmin } from '../access_utils/isAdmin'

const Book = list({
  access: {
    operation: {
      ...allOperations(isAdmin),
      query: isAuth
    }
  },
  fields: {
    title: text({
      validation: { isRequired: true, length: { min: 5, max: 50 } }
    }),
    reviews: relationship({
      ref: 'Review.book',
      many: true
    }),
    averageRating: virtual({
      field: graphql.field({
        type: graphql.Float,
        resolve: async (item: any, args, context) => {
          try {
            const avgRating = await context.prisma.review.aggregate({
              where: { bookId: item.id },
              _avg: { rating: true }
            })
            return avgRating._avg.rating || 0
          } catch (error) {
            console.error('Ошибка:', error)
            return 0
          }
        }
      })
    }),
    ...trackingFields
  }
})

export default Book
