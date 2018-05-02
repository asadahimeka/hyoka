import {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import {
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'

import Student from '../model/Student'
import { StudentLoader, CourseLoader, RemarksLoader } from '../loader'
import Course from '../model/Course'

import Remarks from '../model/Remarks'
import RemarksConnection from '../connection/RemarksConnection'

export default mutationWithClientMutationId({
  name: 'RemarksAdd',
  inputFields: {
    cno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sno: {
      type: new GraphQLNonNull(GraphQLString)
    },
    evas: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    },
    remark: {
      type: new GraphQLNonNull(GraphQLInt)
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

    if (user.role !== 'stu') {
      throw new Error('Unauthorized user')
    }

    const {
      sno,
      cno
    } = args

    const student = await Student.findOne({ sno })
    const course = await Student.findOne({ cno })

    if (!student) {
      throw new Error('Invalid studentId')
    }

    if (!course) {
      throw new Error('Invalid courseId')
    }

    // Create new record
    const _args = {
      ...args,
      cname: course.name,
      sname: student.name
    }
    const remarks = await new Remarks(_args).save()

    student.hadEva.push(cno)
    await student.save()

    // TODO: mutation logic

    StudentLoader.clearCache(context, student._id)

    return {
      id: remarks._id,
      error: null
    }
  },
  outputFields: {
    remarksEdge: {
      type: RemarksConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const remarks = await RemarksLoader.load(
          context, id
        )

        // Returns null if no node was loaded
        if (!remarks) {
          return null
        }

        return {
          cursor: toGlobalId('Remarks', remarks),
          node: remarks
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
