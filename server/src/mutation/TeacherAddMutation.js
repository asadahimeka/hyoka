import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Teacher from '../model/Teacher'

import { TeacherLoader } from '../loader'
import TeacherConnection from '../connection/TeacherConnection'

import UserType from '../type/UserType'
import User from '../model/User'

export default mutationWithClientMutationId({
  name: 'TeacherAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    tno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sex: {
      type: new GraphQLNonNull(GraphQLString)
    },
    birthday: {
      type: GraphQLString
    },
    department: {
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
      tno,
      sex,
      birthday,
      department,
      comment
    } = args

    // Create new record
    const teacher = await new Teacher({
      name,
      tno,
      sex,
      birthday,
      department,
      comment
    }).save()

    const teac = new User({
      tno,
      password: tno,
      role: 'teac'
    })
    await teac.save()

    // TODO: mutation logic

    return {
      id: teacher._id,
      error: null
    }
  },
  outputFields: {
    teacherEdge: {
      type: TeacherConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const teacher = await TeacherLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!teacher) {
          return null
        }

        return {
          cursor: toGlobalId('Teacher', teacher),
          node: teacher
        }
      }
    },
    viewer: {
      type: UserType,
      resolve: async (obj, args, { user }) => user
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
