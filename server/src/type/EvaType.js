import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Eva',
  description: 'Represents Eva',
  fields: () => ({
    id: globalIdField('Eva'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    evno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.evno
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
