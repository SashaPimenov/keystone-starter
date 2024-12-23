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
    const { data, errors } = await withLoginData(
      adminContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 5, book: { connect: { id: bookID } } } }
    )
    reviewID = data!.createReview.id
    expect(data!.createReview).toBeDefined()
    expect(data!.createReview.user.id).toBeDefined()
    expect(data!.createReview.book.id).toBeDefined()
    expect(data!.createReview.id).toBeDefined()
    expect(data!.createReview.rating).toBeDefined()
    expect(data!.createReview.content).toBeDefined()
    expect(errors).toBeUndefined()
  }, 5000)

  test('Возможность оставить отзыв неавторизованному пользователю', async () => {
    const { data, errors } = await withLoginData(
      unAuthUserContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 5, book: { connect: { id: bookID } } } }
    )
    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Необходимо пройти авторизацию`)
  }, 5000),
    test('Возможность оставить отзыв авторизованному пользователю', async () => {
      const { data, errors } = await withLoginData(
        userContext,
        ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
        { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 5, book: { connect: { id: bookID } } } }
      )
      expect(data!.createReview).toBeDefined()
      expect(data!.createReview.user.id).toBeDefined()
      expect(data!.createReview.book.id).toBeDefined()
      expect(data!.createReview.id).toBeDefined()
      expect(data!.createReview.rating).toBeDefined()
      expect(data!.createReview.content).toBeDefined()
      expect(errors).toBeUndefined()
    }, 5000)

  test('Возможность оставить отзыв без книги', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 5 } }
    )
    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Не заполнено обязательное поле book`)
  }, 5000)

  test('Возможность оставить второй отзыв на книгу', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 3, book: { connect: { id: bookID } } } }
    )
    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Вы уже оставили отзыв на эту книгу`)
  }, 5000)

  test('Возможность оставить отзыв на книгу без рейтинга', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', book: { connect: { id: bookID } } } }
    )

    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Поле рейтинг обязательно`)
  }, 5000)

  test('Возможность оставить отзыв на книгу c рейтингом < 0', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: -1, book: { connect: { id: bookID } } } }
    )

    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Значение рейтинга в диапазоне от 0 до 5`)
  }, 5000)

  test('Возможность оставить отзыв на книгу c рейтингом > 5', async () => {
    const { data: bookData } = await withLoginData(
      adminContext,
      ` query Books {
          books {
            id
          }
        }`
    )
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '11111111111111111111111111111111111111111111111111111', rating: 6, book: { connect: { id: bookData.books[0].id } } } }
    )
    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Значение рейтинга в диапазоне от 0 до 5`)
  }, 5000)

  test('Возможность оставить отзыв на книгу c текстом < 50', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      ` mutation CreateReview($data: ReviewCreateInput!) {
            createReview(data: $data) {
              user {
                id
              }
              book {
                id
              }
              id
              rating
              content
            }
        }`,
      { data: { content: '111111111111', rating: 6, book: { connect: { id: bookID } } } }
    )

    expect(data!.createReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['createReview'])
    expect(errors![0].message).toContain(`Текст отзыва должен быть от 50 до 1000 символов`)
  }, 5000)

  test('Возможность изменять НЕ свой отзыв', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      `mutation UpdateReview($where: ReviewWhereUniqueInput!, $data: ReviewUpdateInput!) {
         updateReview(where: $where, data: $data) {
           id
         }
      }`,
      {
        where: {
          id: reviewID
        },
        data: { content: 'sfaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' }
      }
    )

    expect(data!.updateReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['updateReview'])
    expect(errors![0].message).toContain(`You cannot update that Review`)
  }, 5000)

  test('Возможность удалить НЕ свой отзыв', async () => {
    const { data, errors } = await withLoginData(
      userContext,
      `mutation DeleteReview($where: ReviewWhereUniqueInput!) {
        deleteReview(where: $where) {
          id
        }
      }`,
      {
        where: {
          id: reviewID
        }
      }
    )

    expect(data!.deleteReview).toBe(null)
    expect(errors).toHaveLength(1)
    expect(errors![0].path).toEqual(['deleteReview'])
    expect(errors![0].message).toContain(`You cannot delete that Review`)
  }, 5000)
})
