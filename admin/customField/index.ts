import { type BaseListTypeInfo, fieldType, type FieldTypeFunc, type CommonFieldConfig, orderDirectionEnum } from '@keystone-6/core/types'
import { graphql } from '@keystone-6/core'

type StarsFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
  isIndexed?: boolean | 'unique'
  isRequired?: boolean
  maxStars?: number
}

export const stars =
  <ListTypeInfo extends BaseListTypeInfo>({
    isIndexed,
    isRequired,
    maxStars = 5,
    ...config
  }: StarsFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> =>
  (meta) =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'Int',
      index: isIndexed === true ? 'index' : isIndexed || undefined
    })({
      ...config,
      hooks: {
        ...config.hooks,
        async validateInput(args) {
          const val = args.resolvedData[meta.fieldKey]
          if (isRequired && val == null) {
            args.addValidationError('Поле рейтинг обязательно')
          }

          if (!(val == null || (val >= 0 && val <= maxStars))) {
            args.addValidationError(`Значение рейтинга в диапазоне от 0 до ${maxStars}`)
          }

          await config.hooks?.validateInput?.(args)
        }
      },
      input: {
        create: {
          arg: graphql.arg({ type: graphql.Int }),
          resolve(val, context) {
            if (val === null) {
              return null
            }
            if (val === undefined) {
              return undefined
            }
            return val
          }
        },
        update: { arg: graphql.arg({ type: graphql.Int }) },
        orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) }
      },
      output: graphql.field({
        type: graphql.Int,
        resolve({ value, item }, args, context, info) {
          return value
        }
      }),
      views: './views',
      getAdminMeta() {
        return { maxStars }
      }
    })
