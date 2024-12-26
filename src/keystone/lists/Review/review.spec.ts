import { getContext } from '@keystone-6/core/context'
import config from '../../../../keystone'
import * as PrismaModule from '.prisma/client'
import { testConfig } from '../../../../tests/testUtils/testConfig'
import { GraphQLClient } from '../../../../tests/testUtils/GraphQLClient'
import { createReview, deleteReview, updateReview } from '../../../../tests/ReviewUtils'
import { faker } from '@faker-js/faker'
import { checkAuthenticationErrors } from '../../../../tests/testUtils/checkAuthenticationErrors'

const keystoneConfig = testConfig(config)
const baseContext = getContext(keystoneConfig, PrismaModule)

let adminClient: GraphQLClient
let userClient: GraphQLClient
let unAuthUserClient: GraphQLClient

let adminID: number
let userID: number

beforeAll(async () => {
  const adminUser = await baseContext.sudo().query.User.findOne({ where: { email: 'admin@example.com' } })
  const user = await baseContext.sudo().query.User.findOne({ where: { email: 'user@example.com' } })
  const unAuthUser = await baseContext.sudo().query.User.findOne({ where: { email: 'unuser@example.com' } })

  if (!adminUser || !user || !unAuthUser) {
    throw new Error('Users not found')
  }
  adminID = adminUser.id
  userID = user.id
  adminClient = new GraphQLClient(baseContext.withSession({ itemId: adminUser.id, data: { isAdmin: true } }))
  userClient = new GraphQLClient(baseContext.withSession({ itemId: user.id, data: {} }))
  unAuthUserClient = new GraphQLClient(baseContext.withSession({}))
})

describe('Взаимодействие с отзывом', () => {
  let bookID: number
  let reviewID: number
  beforeAll(async () => {
    const createdBook = await baseContext.sudo().query.Book.createOne({
      data: { title: 'Тестовая книга' },
      query: 'id'
    })
    bookID = createdBook.id
  })

  test('Возможность оставить отзыв администратору', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 5, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(adminClient, variables)
    reviewID = data.obj.id
    expect(data.obj).toBeDefined()
    expect(data.obj.user.id).toEqual(adminID)
    expect(data.obj.book.id).toEqual(bookID)
    expect(data.obj.id).toBeDefined()
    expect(data.obj.rating).toEqual(variables.data.rating)
    expect(data.obj.content).toEqual(variables.data.content)
    expect(errors).toBeUndefined()
  })

  test('Возможность оставить отзыв неавторизованному пользователю', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 5, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(unAuthUserClient, variables)

    expect(data!.obj).toBe(null)
    checkAuthenticationErrors(errors)
  })

  test('Возможность оставить отзыв авторизованному пользователю', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 5, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)
    expect(data.obj).toBeDefined()
    expect(data.obj.user.id).toEqual(userID)
    expect(data.obj.book.id).toEqual(bookID)
    expect(data.obj.id).toBeDefined()
    expect(data.obj.rating).toEqual(variables.data.rating)
    expect(data.obj.content).toEqual(variables.data.content)
    expect(errors).toBeUndefined()
  })

  test('Возможность оставить отзыв без книги', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 5 } }
    const { data, errors } = await createReview(userClient, variables)

    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Не заполнено обязательное поле book`)
  })

  test('Возможность оставить второй отзыв на книгу', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 5, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)
    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Вы уже оставили отзыв на эту книгу`)
  })

  test('Возможность оставить отзыв на книгу без рейтинга', async () => {
    const variables = { data: { content: faker.string.alpha(51), book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)
    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Поле рейтинг обязательно`)
  })

  test('Возможность оставить отзыв на книгу c рейтингом < 0', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: -1, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)
    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Значение рейтинга в диапазоне от 0 до 5`)
  })

  test('Возможность оставить отзыв на книгу c рейтингом > 5', async () => {
    const variables = { data: { content: faker.string.alpha(51), rating: 6, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)
    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Значение рейтинга в диапазоне от 0 до 5`)
  })
  test('Возможность оставить отзыв на книгу c текстом < 50', async () => {
    const variables = { data: { content: faker.string.alpha(49), rating: 4, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)

    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Текст отзыва должен быть от 50 до 1000 символов`)
  })
  test('Возможность оставить отзыв на книгу c текстом > 1000', async () => {
    const variables = { data: { content: faker.string.alpha(1001), rating: 4, book: { connect: { id: bookID } } } }
    const { data, errors } = await createReview(userClient, variables)

    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`Текст отзыва должен быть от 50 до 1000 символов`)
  })
  test('Возможность изменять НЕ свой отзыв', async () => {
    const variables = {
      where: {
        id: reviewID
      },
      data: { content: faker.string.alpha(52) }
    }
    const { data, errors } = await updateReview(userClient, variables)

    expect(data.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors[0].path).toEqual(['obj'])
    expect(errors[0].message).toContain(`You cannot update that Review`)
  })

  test('Возможность удалить НЕ свой отзыв', async () => {
    const variables = {
      where: {
        id: reviewID
      }
    }
    const { data, errors } = await deleteReview(userClient, variables)

    expect(data!.obj).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['obj'])
    expect(errors![0].message).toContain(`You cannot delete that Review`)
  })
})
