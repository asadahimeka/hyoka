import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Kurasu from '../model/Kurasu'

import { KurasuLoader } from '../loader'
import KurasuConnection from '../connection/KurasuConnection'

// import ViewerType from '../type/ViewerType';

export default mutationWithClientMutationId({
  name: 'KurasuAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    kno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    courses: {
      type: GraphQLString
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
      kno,
      courses,
      comment
    } = args

    // Create new record
    const kurasu = await new Kurasu({
      name,
      kno,
      courses,
      comment
    }).save()

    // TODO: mutation logic

    return {
      id: kurasu._id,
      error: null
    }
  },
  outputFields: {
    kurasuEdge: {
      type: KurasuConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const kurasu = await KurasuLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!kurasu) {
          return null
        }

        return {
          cursor: toGlobalId('Kurasu', kurasu),
          node: kurasu
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
