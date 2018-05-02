import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import KurasuType from '../type/KurasuType'

export default connectionDefinitions({
  name: 'Kurasu',
  nodeType: KurasuType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
