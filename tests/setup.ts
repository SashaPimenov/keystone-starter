import { resetDatabase } from '@keystone-6/core/testing'
import path from 'node:path'
import { getContext } from '@keystone-6/core/context'
import config from '../keystone'
import * as PrismaModule from '.prisma/client'
import { testConfig } from './testUtils/testConfig'

const dbUrl = 'postgresql://postgres:postgres@localhost:25432/testing'
const prismaSchemaPath = path.join(__dirname, '../schema.prisma')

const keystoneConfig = testConfig(config)
const context = getContext(keystoneConfig, PrismaModule)

module.exports = async () => {
  try {
    await resetDatabase(dbUrl, prismaSchemaPath)
    await context.sudo().query.User.createMany({
      data: [
        { name: 'Admin', email: 'admin@example.com', password: 'password123', isAdmin: true },
        { name: 'User', email: 'user@example.com', password: 'password123' },
        { name: 'UnAuthUser', email: 'unuser@example.com', password: 'password123' }
      ]
    })
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error)
    process.exit(1)
  }
}
