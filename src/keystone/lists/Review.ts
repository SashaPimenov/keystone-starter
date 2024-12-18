import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { stars } from '../../../admin/customField'
import { allOperations } from '@keystone-6/core/access'
import { isAuth } from './isAuth'
import { trackingFields } from '../trackingFields'
import { isAdmin } from './isAdmin'

const Review = list({
  access: {
    operation: {
      ...allOperations(isAuth)
    },
    filter: {
      update: (args) => isAdmin(args) || { user: { id: { in: [args.session.itemId] } } },
      delete: (args) => isAdmin(args) || { user: { id: { in: [args.session.itemId] } } }
    }
  },
  fields: {
    content: text({
      validation: { isRequired: true, length: { min: 50, max: 1000 } }
    }),
    rating: stars({
      isIndexed: true,
      maxStars: 5
    }),
    user: relationship({
      ref: 'User.reviews',
      many: false
    }),
    book: relationship({
      ref: 'Book.reviews',
      many: false
    }),
    ...trackingFields
  },
  db: {
    extendPrismaSchema: (schema) => {
      return schema.replace(/(model Review {[^}]*?)(\ns*})/, '$1\n@@unique([userId, bookId])\n$2')
    }
  },
  hooks: {
    beforeOperation: {
      create: async ({ resolvedData, context }) => {
        const userId = context.session.itemId
        const bookId = resolvedData.book.connect.id
        const existingReview = await context.prisma.review.findFirst({
          where: {
            AND: [{ userId: userId }, { bookId: bookId }]
          }
        })

        if (existingReview) {
          throw new Error('Вы уже оставили отзыв на эту книгу')
        }
        resolvedData.user = { connect: { id: userId } }
      }
    }
  }
})

export default Review
