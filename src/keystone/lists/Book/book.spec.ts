import { getContext } from '@keystone-6/core/context'
import config from '../../../../keystone'
import * as PrismaModule from '.prisma/client'
import { testConfig } from '../../../../tests/testUtils/testConfig'
import { GraphQLClient } from '../../../../tests/testUtils/GraphQLClient'
import { createBook, readBook } from '../../../../tests/BookUtils'
import { checkAuthenticationErrors } from '../../../../tests/testUtils/checkAuthenticationErrors'
const keystoneConfig = testConfig(config)
const baseContext = getContext(keystoneConfig, PrismaModule)

let adminClient: GraphQLClient
let userClient: GraphQLClient
let unAuthUserClient: GraphQLClient

beforeAll(async () => {
  const adminUser = await baseContext.sudo().query.User.findOne({ where: { email: 'admin@example.com' } })
  const user = await baseContext.sudo().query.User.findOne({ where: { email: 'user@example.com' } })
  const unAuthUser = await baseContext.sudo().query.User.findOne({ where: { email: 'unuser@example.com' } })

  if (!adminUser || !user || !unAuthUser) {
    throw new Error('Users not found')
  }

  adminClient = new GraphQLClient(baseContext.withSession({ itemId: adminUser.id, data: { isAdmin: true } }))
  userClient = new GraphQLClient(baseContext.withSession({ itemId: user.id, data: {} }))
  unAuthUserClient = new GraphQLClient(baseContext.withSession({}))
})

describe('Создание книги', () => {
  test('Создание книги админом', async () => {
    const variables = { data: { title: 'Книга админа' } }
    const { data, errors } = await createBook(adminClient, variables)

    expect(data.obj).toBeDefined()
    expect(data.obj.id).toBeDefined()
    expect(data.obj.title).toBe(variables.data.title)
    expect(errors).toBeUndefined()
  })

  test('Создание книги авторизованным пользователем', async () => {
    const variables = { data: { title: 'Книга' } }
    const { data, errors } = await createBook(userClient, variables)

    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['obj'])
    expect(errors![0].message).toContain(`Access denied: You cannot create that Book`)
  })

  test('Создание книги неавторизованным пользователем', async () => {
    const variables = { data: { title: 'Книга' } }
    const { data, errors } = await createBook(unAuthUserClient, variables)

    expect(data.obj).toBe(null)
    checkAuthenticationErrors(errors)
  })
})
describe('Просмотр книги', () => {
  test('Просмотр всех книг администратором', async () => {
    const { data, errors } = await readBook(adminClient)
    expect(data.objs).toBeTruthy()
    expect(data.objs[0].id).toBeDefined()
    expect(errors).toBeUndefined()
  })

  test('Просмотр всех книг авторизованным пользователем', async () => {
    const { data, errors } = await readBook(userClient)
    expect(data.objs).toBeTruthy()
    expect(data.objs[0].id).toBeDefined()
    expect(errors).toBeUndefined()
  })
  test('Просмотр всех книг неавторизованным пользователем', async () => {
    const { data, errors } = await readBook(unAuthUserClient)
    expect(data.objs).toEqual(null)
    checkAuthenticationErrors(errors)
  })
})
