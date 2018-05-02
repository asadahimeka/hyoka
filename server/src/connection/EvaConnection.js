import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import EvaType from '../type/EvaType'

export default connectionDefinitions({
  name: 'Eva',
  nodeType: EvaType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
