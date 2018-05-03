import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Course',
  description: 'Represents Course',
  fields: () => ({
    id: globalIdField('Course'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    cno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.cno
    },
    teacher: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.teacher
    },
    teacherno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.teacherno
    },
    teacherdprt: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.teacherdprt
    },
    isEva: {
      type: GraphQLBoolean,
      description: '',
      resolve: obj => obj.isEva
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
