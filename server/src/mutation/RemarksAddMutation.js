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
import { StudentLoader } from '../loader'

import Remarks from '../model/Remarks'

import { RemarksLoader } from '../loader'
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

    if (user.role !== 'admin') {
      throw new Error('Unauthorized user')
    }

    const {
      sno,
      cno
    } = args

    const student = await Student.findOne({ sno })

    if (!student) {
      throw new Error('Invalid studentId')
    }

    // Create new record
    const remarks = await new Remarks(args).save()

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
