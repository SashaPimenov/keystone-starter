import { BaseKeystoneTypeInfo, KeystoneConfig, KeystoneContext } from '@keystone-6/core/types'

const dbUrl = process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:25432/testing'

export type FloatingConfig<TypeInfo extends BaseKeystoneTypeInfo> = Omit<KeystoneConfig<TypeInfo>, 'db'> & {
  db?: Omit<KeystoneConfig<TypeInfo>['db'], 'provider' | 'url'>
}

export function testConfig<TypeInfo extends BaseKeystoneTypeInfo>(config: FloatingConfig<TypeInfo>): KeystoneConfig {
  return {
    ...config,
    db: {
      ...config.db,
      provider: 'postgresql',
      url: dbUrl
    },
    ui: {
      isDisabled: true,
      ...config.ui
    }
  }
}

export async function withLoginData(context: KeystoneContext, query: string, variables: any = {}): Promise<{ data: any; errors: any }> {
  try {
    const { data, errors } = await context.graphql.raw({
      query,
      variables
    })
    return { data, errors }
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
