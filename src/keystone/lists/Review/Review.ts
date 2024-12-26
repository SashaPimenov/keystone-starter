import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { stars } from '../../../../admin/customField'
import { allOperations } from '@keystone-6/core/access'
import { isAuth } from '../../accessUtils/isAuth'
import { trackingFields } from '../../trackingFields'
import { isAdmin } from '../../accessUtils/isAdmin'

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
      validation: { isRequired: true },
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          if (resolvedData.content.length <= 50 || resolvedData.content.length > 1000) {
            addValidationError('Текст отзыва должен быть от 50 до 1000 символов')
          }
        }
      }
    }),
    rating: stars({
      isIndexed: true,
      maxStars: 5,
      isRequired: true
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
        const userId = context?.session?.itemId
        const bookId = resolvedData.book?.connect?.id

        if (!bookId) {
          throw new Error('Не заполнено обязательное поле book')
        }
        const existingReview = await context.prisma.review.findFirst({
          where: {
            AND: [{ userId }, { bookId }]
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
