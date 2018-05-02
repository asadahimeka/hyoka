import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Eva from '../model/Eva'

import { EvaLoader } from '../loader'
import EvaConnection from '../connection/EvaConnection'

// import ViewerType from '../type/ViewerType';

export default mutationWithClientMutationId({
  name: 'EvaAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    evno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    comment: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async (args, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user')
    }

    if (user.role !== 'admin') {
      throw new Error('Unauthorized user')
    }

    const {
      name,
      evno,
      comment
    } = args

    // Create new record
    const eva = await new Eva({
      name,
      evno,
      comment
    }).save()

    // TODO: mutation logic

    return {
      id: eva._id,
      error: null
    }
  },
  outputFields: {
    evaEdge: {
      type: EvaConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const eva = await EvaLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!eva) {
          return null
        }

        return {
          cursor: toGlobalId('Eva', eva),
          node: eva
        }
      }
    },
    // viewer: {
    //   type: ViewerType,
    //   resolve: async (obj, args, { user }) => user,
    // },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
