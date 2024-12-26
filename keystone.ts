import { isAdmin } from './src/keystone/accessUtils/isAdmin'
import { config } from '@keystone-6/core'
import * as dotenv from 'dotenv'
import User from './src/keystone/lists/User'
import { withAuth } from './src/keystone/withAuth'
import { session } from './src/keystone/session'
import Book from './src/keystone/lists/Book/Book'
import Review from './src/keystone/lists/Review/Review'

dotenv.config()
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:25432/main'
const serverUrl = process.env.SERVER_URL || 'http://localhost:4000'
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
    graphql: {
      apolloConfig: {
        formatError: (error) => {
          return {
            ...error,
            message: error.message,
            extensions: { ...error.extensions }
          }
        }
      }
    },
    ui: {
      isAccessAllowed: isAdmin
    },
    server: {
      cors: { origin: [serverUrl], credentials: true }
    }
  })
)
