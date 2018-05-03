import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId
} from 'graphql-relay'
import User from '../model/User'
import { generateToken } from '../auth'

export default mutationWithClientMutationId({
  name: 'Register',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    role: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ name, email, password, role }) => {
    let useremail = await User.findOne({ email })
    let username = await User.findOne({ name })

    if (useremail) {
      return {
        token: null,
        error: 'EMAIL_ALREADY_IN_USE'
      }
    }

    if (username) {
      return {
        token: null,
        error: 'USERNAME_ALREADY_IN_USE'
      }
    }

    let user = new User({
      name,
      email,
      password,
      role
    })
    await user.save()

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
