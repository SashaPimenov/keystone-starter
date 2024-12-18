import { getContext } from '@keystone-6/core/context'
import config from '../keystone'
import * as PrismaModule from '.prisma/client'
import { resetDatabase } from '@keystone-6/core/testing'
import path from 'node:path'

const dbUrl = 'postgresql://postgres:postgres@localhost:25432/testing'
const prismaSchemaPath = path.join(__dirname, '../schema.prisma')

const testConfig = {
  ...config,
  db: { ...config.db, url: dbUrl }
}

const context = getContext(testConfig, PrismaModule)

beforeEach(async () => {
  await resetDatabase(dbUrl, prismaSchemaPath)
})

describe('Создание пользователей', () => {
  test('Создание валидного пользователя', async () => {
    const person = await context.query.User.createOne({
      data: { name: 'Alice', email: 'alice@mail.ru', password: 'dont-use-me' },
      query: 'id email name'
    })

    expect(person.name).toBe('Alice')
    expect(person.email).toBe('alice@mail.ru')
  }, 5000)

  test('Создание пользователя с коротким именем', async () => {
    try {
      await context.query.User.createOne({
        data: { name: 'A', email: 'alice@mail.ru', password: 'dont-use-me' },
        query: 'id email name'
      })
      throw new Error('Expected error not thrown')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain('User.name: value must be at least 4 characters long')
    }
  }, 5000)

  test('Создание пользователя с коротким паролем', async () => {
    try {
      await context.query.User.createOne({
        data: { name: 'Bob', email: 'bob@mail.ru', password: 'short' },
        query: 'id email name'
      })
      throw new Error('Expected an error, but none was thrown')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain('User.password: value must be at least 8 characters long')
    }
  }, 5000)

  test('Создание пользователя без обязательного поля', async () => {
    try {
      await context.query.User.createOne({
        data: { name: 'Alice', password: 'longlong' },
        query: 'id email name'
      })
      throw new Error('Expected an error, but none was thrown')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain('User.email: Неверный формат почты')
      expect(error.message).toContain('User.email: value must be at least 4 characters long')
    }
  }, 5000)
})
