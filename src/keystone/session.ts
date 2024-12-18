import { statelessSessions } from '@keystone-6/core/session'

const SESSION_SECRET = process.env.SESSION_SECRET

export const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: SESSION_SECRET,
  sameSite: 'strict',
  domain: 'localhost',
  secure: false,
  path: '/'
})
