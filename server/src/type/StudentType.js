import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Student',
  description: 'Represents Student',
  fields: () => ({
    id: globalIdField('Student'),
    name: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.name
    },
    sno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.sno
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
    kurasu: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.kurasu
    },
    department: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.department
    },
    major: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.major
    },
    hadEva: {
      type: new GraphQLList(GraphQLString),
      description: '',
      resolve: obj => obj.hadEva
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
