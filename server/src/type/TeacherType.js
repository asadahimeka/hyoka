import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Teacher',
  description: 'Represents Teacher',
  fields: () => ({
    id: globalIdField('Teacher'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    tno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.tno
    },
    sex: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.sex
    },
    birthday: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.birthday
    },
    department: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.department
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
