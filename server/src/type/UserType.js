
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'User',
  description: 'Represents User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    nickname: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.nickname
    },
    password: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.password
    },
    email: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.email
    },
    role: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.role
    },
    active: {
      type: GraphQLBoolean,
      description: '',
      resolve: obj => obj.active
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
