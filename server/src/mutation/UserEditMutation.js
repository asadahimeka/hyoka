import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import User from '../model/User'

import UserType from '../type/UserType'
import { UserLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'UserEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    nickname: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    role: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async (args, context) => {
    const { user } = context

    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user')
    }

    const {
      id,
      role
    } = args

    if (role && user.role !== 'admin') {
      throw new Error('Unauthorized user')
    }

    // Check if the provided ID is valid
    const user_ = await User.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!user_) {
      throw new Error('Invalid userId')
    }

    // Edit record
    await user_.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    UserLoader.clearCache(context, user._id)

    return {
      id: user_._id,
      error: null
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (obj, args, context) => UserLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
