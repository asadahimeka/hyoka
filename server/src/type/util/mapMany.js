import {
  // GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import {
  connectionArgs,
  fromGlobalId
} from 'graphql-relay'
// import { NodeField } from '../../interface/NodeInterface'

import StudentType from '../StudentType'
import CourseType from '../CourseType'
import EvaType from '../EvaType'
import KurasuType from '../KurasuType'
import RemarksType from '../RemarksType'
import TeacherType from '../TeacherType'
import UserType from '../UserType'
import StudentConnection from '../../connection/StudentConnection'
import CourseConnection from '../../connection/CourseConnection'
import EvaConnection from '../../connection/EvaConnection'
import KurasuConnection from '../../connection/KurasuConnection'
import RemarksConnection from '../../connection/RemarksConnection'
import TeacherConnection from '../../connection/TeacherConnection'
import UserConnection from '../../connection/UserConnection'

import {
  UserLoader,
  StudentLoader,
  EvaLoader,
  KurasuLoader,
  RemarksLoader,
  TeacherLoader,
  CourseLoader
} from '../../loader'

const Models = {
  'student': [StudentType, StudentLoader, StudentConnection],
  'course': [CourseType, CourseLoader, CourseConnection],
  'eva': [EvaType, EvaLoader, EvaConnection],
  'kurasu': [KurasuType, KurasuLoader, KurasuConnection],
  'remarks': [RemarksType, RemarksLoader, RemarksConnection],
  'teacher': [TeacherType, TeacherLoader, TeacherConnection],
  'user': [UserType, UserLoader, UserConnection]
}

/**
 *
 * @param {string[]} params
 */
export function mapItem(params) {
  let o = {}
  params.forEach(item => {
    o[item] = {
      type: Models[item][0],
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id)
        return Models[item][1].load(context, id)
      }
    }
  })
  return o
}

/**
 *
 * @param {string[]} params
 */
export function mapItems(params) {
  let o = {}
  params.forEach(item => {
    o[item + 's'] = {
      type: Models[item][2].connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, context) => Models[item][1].loadMany(context, args)
    }
  })
  return o
}
