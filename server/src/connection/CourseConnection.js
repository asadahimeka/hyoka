import { GraphQLInt } from 'graphql'

import { connectionDefinitions } from 'graphql-relay'

import CourseType from '../type/CourseType'

export default connectionDefinitions({
  name: 'Course',
  nodeType: CourseType,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})
