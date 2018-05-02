import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import Teacher from '../model/Teacher'

import TeacherType from '../type/TeacherType'
import { TeacherLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'TeacherEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    tno: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    birthday: {
      type: GraphQLString
    },
    department: {
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
    const teacher = await Teacher.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!teacher) {
      throw new Error('Invalid teacherId')
    }

    // Edit record
    await teacher.update(args)

    // TODO: mutation logic

    // Clear dataloader cache
    TeacherLoader.clearCache(context, teacher._id)

    return {
      id: teacher._id,
      error: null
    }
  },
  outputFields: {
    teacher: {
      type: TeacherType,
      resolve: (obj, args, context) => TeacherLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
