import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql'
import { globalIdField } from 'graphql-relay'

import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Remarks',
  description: 'Represents Remarks',
  fields: () => ({
    id: globalIdField('Remarks'),
    cno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.cno
    },
    sno: {
      type: GraphQLString,
      description: '',
      resolve: obj => obj.sno
    },
    evas: {
      type: new GraphQLList(GraphQLString),
      description: '',
      resolve: obj => obj.evas
    },
    remark: {
      type: GraphQLInt,
      description: '',
      resolve: obj => obj.remark
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
