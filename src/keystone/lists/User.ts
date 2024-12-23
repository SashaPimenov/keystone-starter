import { list } from '@keystone-6/core'
import { checkbox, password, relationship, text } from '@keystone-6/core/fields'
import { allOperations } from '@keystone-6/core/access'
import { isAuth } from '../access_utils/isAuth'
import { isAdmin } from '../access_utils/isAdmin'
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
      validation: { isRequired: true },
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          if (resolvedData.name.length <= 2 || resolvedData.name.length > 15) {
            addValidationError('Имя должно быть от 2 до 15 символов')
          }
        }
      }
    }),
    email: text({
      validation: {
        isRequired: true,
        match: {
          regex: /^\S+@\S+\.\S+$/,
          explanation: 'Неверный формат почты'
        }
      },
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          if (resolvedData.email.length < 3 || resolvedData.email.length > 30) {
            addValidationError('E-mail должен быть от 4 до 30 символов')
          }
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
        update: ({ session, item }) => isAdmin(session) || session.itemId === item.id
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
