import { getContext } from '@keystone-6/core/context'
import config from '../keystone'
import * as PrismaModule from '.prisma/client'
import { testConfig, withLoginData } from './utils'
import { KeystoneContext } from '@keystone-6/core/types'

const keystoneConfig = testConfig(config)
const baseContext = getContext(keystoneConfig, PrismaModule)

let adminContext: KeystoneContext
let userContext: KeystoneContext
let unAuthUserContext: KeystoneContext

beforeAll(async () => {
  const adminUser = await baseContext.sudo().query.User.findOne({ where: { email: 'admin@example.com' } })
  const user = await baseContext.sudo().query.User.findOne({ where: { email: 'user@example.com' } })
  const unAuthUser = await baseContext.sudo().query.User.findOne({ where: { email: 'unuser@example.com' } })

  if (!adminUser || !user || !unAuthUser) {
    throw new Error('Users not found')
  }

  adminContext = baseContext.withSession({ itemId: adminUser.id, data: { isAdmin: true } })
  userContext = baseContext.withSession({ itemId: user.id, data: {} })
  unAuthUserContext = baseContext.withSession({})
})

describe('Создание книги', () => {
  test('Создание книги админом', async () => {
    const { data, errors } = await withLoginData(
      adminContext,
      `
          mutation CreateBook($data: BookCreateInput!) {
            createBook(data: $data) {
              id
            }
          }
        `,
      { data: { title: 'Книга' } }
    )

    expect(data.createBook).toBeDefined()
    expect(data.createBook.id).toBeDefined()
    expect(errors).toBeUndefined()
  }, 5000)

  test('Создание книги авторизованным пользователем', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      `
          mutation CreateBook($data: BookCreateInput!) {
            createBook(data: $data) {
              id
            }
          }
        `,
      { data: { title: 'Книга' } }
    )

    expect(data!.createBook).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createBook'])
    expect(errors![0].message).toContain(`Access denied: You cannot create that Book`)
  }, 5000)

  test('Создание книги неавторизованным пользователем', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      `
          mutation CreateBook($data: BookCreateInput!) {
            createBook(data: $data) {
              id
            }
          }
        `,
      { data: { title: 'Книга' } }
    )

    expect(data!.createBook).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createBook'])
    expect(errors![0].message).toContain(`Access denied: You cannot create that Book`)
  }, 5000)
})
describe('Просмотр книги', () => {
  test('Просмотр всех книг администратором', async () => {
    const { data, errors } = await withLoginData(
      adminContext,
      ` query Books {
        books {
          id
        }
      }`
    )
    expect(data!.books).toBeTruthy()
    expect(data!.books[0].id).toBeDefined()
    expect(errors).toBeUndefined()
  }, 5000)

  test('Просмотр всех книг авторизованным пользователем', async () => {
    const { data, errors } = await withLoginData(
      adminContext,
      ` query Books {
        books {
          id
        }
      }`
    )
    expect(data!.books).toBeTruthy()
    expect(data!.books[0].id).toBeDefined()
    expect(errors).toBeUndefined()
  }, 5000)

  test('Просмотр всех книг неавторизованным пользователем', async () => {
    const { data, errors } = await withLoginData(
      unAuthUserContext,
      ` query Books {
        books {
          id
        }
      }`
    )
    expect(data!.books).toEqual(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['books'])
    expect(errors![0].message).toContain(`Необходимо пройти авторизацию`)
  }, 5000)
})
