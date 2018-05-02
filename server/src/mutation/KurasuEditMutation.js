import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import Kurasu from '../model/Kurasu'

import KurasuType from '../type/KurasuType'
import { KurasuLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'KurasuEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    kno: {
      type: GraphQLString
    },
    courses: {
      type: GraphQLString
    },
    comment: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async (args, context) => {
    const { user } = context

    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user')
    }

    if (user.role !== 'admin') {
      throw new Error('Unauthorized user')
    }

    const {
      id
    } = args

    // Check if the provided ID is valid
    const kurasu = await Kurasu.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!kurasu) {
      throw new Error('Invalid kurasuId')
    }

    // Edit record
    await kurasu.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    KurasuLoader.clearCache(context, kurasu._id)

    return {
      id: kurasu._id,
      error: null
    }
  },
  outputFields: {
    kurasu: {
      type: KurasuType,
      resolve: (obj, args, context) => KurasuLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
