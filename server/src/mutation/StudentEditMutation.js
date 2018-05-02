import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import Student from '../model/Student'

import StudentType from '../type/StudentType'
import { StudentLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'StudentEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    sno: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    birthday: {
      type: GraphQLString
    },
    kurasu: {
      type: GraphQLString
    },
    department: {
      type: GraphQLString
    },
    major: {
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
    const student = await Student.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!student) {
      throw new Error('Invalid studentId')
    }

    // Edit record
    await student.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    StudentLoader.clearCache(context, student._id)

    return {
      id: student._id,
      error: null
    }
  },
  outputFields: {
    student: {
      type: StudentType,
      resolve: (obj, args, context) => StudentLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
