import { allOperations, denyAll } from '@keystone-6/core/access'
import { relationship, timestamp } from '@keystone-6/core/fields'

export const trackingFields = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    access: {
      ...allOperations(denyAll)
    },
    ui: {
      createView: {
        fieldMode: 'hidden'
      },
      itemView: {
        fieldMode: 'hidden'
      }
    }
  }),
  updatedAt: timestamp({
    access: {
      ...allOperations(denyAll)
    },
    hooks: {
      resolveInput({ resolvedData, operation }) {
        if (operation === 'update') {
          return (resolvedData.updatedAt = new Date())
        }
      }
    },
    ui: {
      createView: {
        fieldMode: 'hidden'
      },
      itemView: {
        fieldMode: 'hidden'
      }
    }
  }),
  createdBy: relationship({
    ref: 'User',
    access: {
      ...allOperations(denyAll)
    },
    hooks: {
      resolveInput({ resolvedData, context, operation }) {
        if (operation === 'create' && context?.session?.itemId) {
          return (resolvedData.createdBy = { connect: { id: context.session.itemId } })
        }
      }
    },
    ui: {
      createView: {
        fieldMode: 'hidden'
      },
      itemView: {
        fieldMode: 'hidden'
      }
    }
  }),
  updatedBy: relationship({
    ref: 'User',
    access: {
      ...allOperations(denyAll)
    },
    hooks: {
      resolveInput({ resolvedData, context, operation }) {
        if (operation === 'update') {
          return (resolvedData.updatedBy = { connect: { id: context.session.itemId } })
        }
      }
    },
    ui: {
      createView: {
        fieldMode: 'hidden'
      },
      itemView: {
        fieldMode: 'hidden'
      }
    }
  })
}
