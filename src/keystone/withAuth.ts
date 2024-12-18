import { createAuth } from '@keystone-6/auth'

export type Session = {
  listKey: 'User'
  itemId: string
  data: { id: string; name: string; email: string; isAdmin: boolean }
}
export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name email isAdmin',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { isAdmin: true },
    skipKeystoneWelcome: false
  }
})
