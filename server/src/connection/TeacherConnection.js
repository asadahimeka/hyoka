import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import TeacherType from '../type/TeacherType'

export default connectionDefinitions({
  name: 'Teacher',
  nodeType: TeacherType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
