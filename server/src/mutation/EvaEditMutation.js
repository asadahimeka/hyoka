import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import Eva from '../model/Eva'

import EvaType from '../type/EvaType'
import { EvaLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'EvaEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    evno: {
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
    const eva = await Eva.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!eva) {
      throw new Error('Invalid evaId')
    }

    // Edit record
    await eva.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    EvaLoader.clearCache(context, eva._id)

    return {
      id: eva._id,
      error: null
    }
  },
  outputFields: {
    eva: {
      type: EvaType,
      resolve: (obj, args, context) => EvaLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
