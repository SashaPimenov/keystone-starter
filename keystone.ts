import { isAdmin } from './src/keystone/lists/isAdmin'
import { config } from '@keystone-6/core'
import * as dotenv from 'dotenv'
import User from './src/keystone/lists/User'
import Book from './src/keystone/lists/Book'
import Review from './src/keystone/lists/Review'
import { withAuth } from './src/keystone/withAuth'
import { session } from './src/keystone/session'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
const dbUrl = DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:25432/main'
export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: dbUrl
    },
    lists: {
      User,
      Book,
      Review
    },
    session,
    ui: {
      isAccessAllowed: isAdmin
    },
    server: {
      cors: { origin: ['http://localhost:4000'], credentials: true }
    }
  })
)
