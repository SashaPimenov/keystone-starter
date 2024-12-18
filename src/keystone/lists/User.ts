import { list } from '@keystone-6/core'
import { checkbox, password, relationship, text, timestamp } from '@keystone-6/core/fields'
import { allOperations, allowAll, denyAll } from '@keystone-6/core/access'
import { isAuth } from './isAuth'
import { isAdmin } from './isAdmin'
import { trackingFields } from '../trackingFields'

const User = list({
  access: {
    operation: {
      ...allOperations(isAdmin),
      query: isAuth,
      create: (args) => !isAuth(args) || isAdmin(args)
    },
    filter: {
      update: (args) => isAdmin(args) || { id: { in: [args.session.itemId] } }
    }
  },
  fields: {
    name: text({
      validation: { isRequired: true, length: { min: 4, max: 15 } }
    }),
    email: text({
      validation: {
        isRequired: true,
        length: { min: 4, max: 30 },
        match: {
          regex: /^\S+@\S+\.\S+$/,
          explanation: 'Неверный формат почты'
        }
      },
      isIndexed: 'unique'
    }),
    isAdmin: checkbox({
      access: {
        ...allOperations(isAdmin)
      }
    }),
    password: password({
      access: {
        read: () => false,
        update: ({ session, item }) => {
          return isAdmin(session) || session.itemId === item.id
        }
      },
      validation: { isRequired: true, length: { min: 8 } }
    }),
    reviews: relationship({
      ref: 'Review.user',
      many: true
    }),
    ...trackingFields
  }
})

export default User
