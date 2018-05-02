import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import RemarksType from '../type/RemarksType'

export default connectionDefinitions({
  name: 'Remarks',
  nodeType: RemarksType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
