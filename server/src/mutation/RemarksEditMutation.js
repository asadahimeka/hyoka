import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql'
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay'

import Remarks from '../model/Remarks'

import RemarksType from '../type/RemarksType'
import { RemarksLoader } from '../loader'

export default mutationWithClientMutationId({
  name: 'RemarksEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    cno: {
      type: GraphQLString
    },
    sno: {
      type: GraphQLString
    },
    evas: {
      type: new GraphQLList(GraphQLString)
    },
    remark: {
      type: GraphQLInt
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
      id,
      cno,
      sno,
      evas,
      remark,
      comment
    } = args

    // Check if the provided ID is valid
    const remarks = await Remarks.findOne({
      _id: fromGlobalId(id).id
    })

    // If not, throw an error
    if (!remarks) {
      throw new Error('Invalid remarksId')
    }

    // Edit record
    await remarks.update({
      cno,
      sno,
      evas,
      remark,
      comment
    })

    // TODO: mutation logic

    // Clear dataloader cache
    RemarksLoader.clearCache(context, remarks._id)

    return {
      id: remarks._id,
      error: null
    }
  },
  outputFields: {
    remarks: {
      type: RemarksType,
      resolve: (obj, args, context) => RemarksLoader.load(context, obj.id)
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
})
