import { KeystoneContext } from '@keystone-6/core/types'

export class GraphQLClient {
  private context

  constructor(context: KeystoneContext) {
    this.context = context
  }

  async request(query: string, variables = {}) {
    const { data, errors } = await this.context.graphql.raw({
      query,
      variables
    })

    return { data: data as any, errors: errors as any }
  }
}
