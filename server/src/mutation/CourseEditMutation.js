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

import Course from '../model/Course'

import CourseType from '../type/CourseType'
import { CourseLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'CourseEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    cno: {
      type: GraphQLString
    },
    teacher: {
      type: GraphQLString
    },
    isEva: {
      type: GraphQLBoolean
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
    const course = await Course.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!course) {
      throw new Error('Invalid courseId')
    }

    // Edit record
    await course.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    CourseLoader.clearCache(context, course._id)

    return {
      id: course._id,
      error: null
    }
  },
  outputFields: {
    course: {
      type: CourseType,
      resolve: (obj, args, context) => CourseLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
