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
import Course from '../model/Course'
import Eva from '../model/Eva'
import Kurasu from '../model/Kurasu'
import Remarks from '../model/Remarks'
import Teacher from '../model/Teacher'
import User from '../model/User'

import {
  UserLoader,
  StudentLoader,
  EvaLoader,
  KurasuLoader,
  RemarksLoader,
  TeacherLoader,
  CourseLoader
} from '../loader'

const Models = {
  'student': [Student, StudentLoader],
  'course': [Course, CourseLoader],
  'eva': [Eva, EvaLoader],
  'kurasu': [Kurasu, KurasuLoader],
  'remarks': [Remarks, RemarksLoader],
  'teacher': [Teacher, TeacherLoader],
  'user': [User, UserLoader]
}

export default mutationWithClientMutationId({
  name: 'deleteMutation',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    who: {
      type: new GraphQLNonNull(GraphQLString)
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

    const { id, who } = args

    // Check if the provided ID is valid
    const model = await Models[who][0].findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!model) {
      throw new Error('Invalid Id')
    }

    // Edit record
    await model.remove()

    // TODO: mutation logic

    // Clear dataloader cache
    Models[who][1].clearCache(context, model._id)

    return {
      error: null
    }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
