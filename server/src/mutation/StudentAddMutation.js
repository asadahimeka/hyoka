import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Student from '../model/Student'

import { StudentLoader } from '../loader'
import StudentConnection from '../connection/StudentConnection'

import UserType from '../type/UserType'
import User from '../model/User'

export default mutationWithClientMutationId({
  name: 'StudentAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sex: {
      type: new GraphQLNonNull(GraphQLString)
    },
    birthday: {
      type: GraphQLString
    },
    kurasu: {
      type: new GraphQLNonNull(GraphQLString)
    },
    department: {
      type: new GraphQLNonNull(GraphQLString)
    },
    major: {
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
      sno,
      sex,
      birthday,
      kurasu,
      department,
      major,
      comment
    } = args

    // Create new record
    const student = await new Student({
      name,
      sno,
      sex,
      birthday,
      kurasu,
      department,
      major,
      comment
    }).save()

    const stu = new User({
      sno,
      password: sno,
      role: 'stu'
    })
    await stu.save()

    // TODO: mutation logic

    return {
      id: student._id,
      error: null
    }
  },
  outputFields: {
    studentEdge: {
      type: StudentConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const student = await StudentLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!student) {
          return null
        }

        return {
          cursor: toGlobalId('Student', student),
          node: student
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
