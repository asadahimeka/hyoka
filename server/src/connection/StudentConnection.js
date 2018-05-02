import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import StudentType from '../type/StudentType'

export default connectionDefinitions({
  name: 'Student',
  nodeType: StudentType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
