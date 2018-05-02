import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { User } from '../model'
import { generateToken } from '../auth'

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: GraphQLString
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ email, name, password }) => {
    let user = null
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() })
    } else {
      user = await User.findOne({ name: name.toLowerCase() })
    }

    if (!user) {
      return {
        token: null,
        error: 'INVALID_EMAIL_NAME_PASSWORD'
      }
    }

    const correctPassword = user.authenticate(password)

    if (!correctPassword) {
      return {
        token: null,
        error: 'INVALID_EMAIL_NAME_PASSWORD'
      }
    }

    return {
      token: generateToken(user),
      error: null
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
