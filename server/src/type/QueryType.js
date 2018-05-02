import {
  GraphQLObjectType
  // GraphQLString,
  // GraphQLNonNull,
  // GraphQLID
} from 'graphql'
// import { connectionArgs, fromGlobalId } from 'graphql-relay'
import { NodeField } from '../interface/NodeInterface'

import UserType from './UserType'
import { UserLoader } from '../loader'

import { mapItem, mapItems } from './util/mapMany'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    ...mapItem([
      'user',
      'student',
      'course',
      'eva',
      'remarks',
      'teacher',
      'kurasu'
    ]),
    ...mapItems([
      'user',
      'student',
      'course',
      'eva',
      'remarks',
      'teacher',
      'kurasu'
    ]),
    node: NodeField,
    me: {
      type: UserType,
      resolve: (root, args, context) => (context.user ? UserLoader.load(context, context.user._id) : null)
    }
  })
})
