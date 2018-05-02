import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Course from '../model/Course'

import { CourseLoader } from '../loader'
import CourseConnection from '../connection/CourseConnection'

export default mutationWithClientMutationId({
  name: 'CourseAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    cno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    teacher: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isEva: {
      type: GraphQLBoolean
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
      cno,
      teacher,
      comment
    } = args

    // Create new record
    const course = await new Course({
      name,
      cno,
      teacher,
      comment
    }).save()

    // TODO: mutation logic

    return {
      id: course._id,
      error: null
    }
  },
  outputFields: {
    courseEdge: {
      type: CourseConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const course = await CourseLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!course) {
          return null
        }

        return {
          cursor: toGlobalId('Course', course),
          node: course
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
