import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Kurasu',
  description: 'Represents Kurasu',
  fields: () => ({
    id: globalIdField('Kurasu'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    kno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.kno
    },
    courses: {
      type: new GraphQLList(GraphQLString),
      description: '',
      resolve: obj => obj.courses
    },
    comment: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.comment
    },
    createdAt: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.createdAt.toISOString()
    },
    updatedAt: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.updatedAt.toISOString()
    }
  }),
  interfaces: () => [NodeInterface]
})
