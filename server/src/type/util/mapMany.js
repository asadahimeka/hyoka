import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
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

import Student from '../../model/Student'
import Course from '../../model/Course'
import Eva from '../../model/Eva'
import Kurasu from '../../model/Kurasu'
import Remarks from '../../model/Remarks'
import Teacher from '../../model/Teacher'
import User from '../../model/User'

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
  'student': [StudentType, StudentLoader, StudentConnection, Student, 'sno'],
  'course': [CourseType, CourseLoader, CourseConnection, Course, 'cno'],
  'eva': [EvaType, EvaLoader, EvaConnection, Eva, 'evno'],
  'kurasu': [KurasuType, KurasuLoader, KurasuConnection, Kurasu, 'kno'],
  'remarks': [RemarksType, RemarksLoader, RemarksConnection, Remarks, 'cno'],
  'teacher': [TeacherType, TeacherLoader, TeacherConnection, Teacher, 'tno'],
  'user': [UserType, UserLoader, UserConnection, User]
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
        const {
          id
        } = fromGlobalId(args.id)
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
export function mapItemNo(params) {
  let o = {}
  params.forEach(item => {
    o[item + 'no'] = {
      type: Models[item][0],
      args: {
        no: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (obj, args, context) => {
        const {
          no
        } = args
        const model = await Models[item][3].findOne({
          [Models[item][4]]: no
        })

        if (!model) {
          throw new Error('Invalid No.')
        }

        return model
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

export function kuso() {
  return {
    type: new GraphQLList(CourseType),
    args: {
      kno: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, context) => {
      const { kno } = args
      const kurasu = await Kurasu.findOne({ kno })

      if (!kurasu) {
        throw new Error('Invalid No.')
      }

      return kurasu.courses.map(async cno => {
        let course = await Course.findOne({ cno })
        if (!course) {
          throw new Error('Invalid No.')
        }

        let teacher = await Teacher.findOne({ name: course.teacher })

        if (!teacher) {
          throw new Error('Invalid No.')
        }

        course.teacherno = teacher.tno
        course.teacherdprt = teacher.department

        return course
      })
    }
  }
}

export function viewremark() {
  return {
    type: new GraphQLList(new GraphQLList(RemarksType)),
    args: {
      teacher: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, context) => {
      const { teacher } = args
      const courses = await Course.find({ teacher })

      if (!courses) {
        throw new Error('Invalid teacher.')
      }

      return courses.map(async e => {
        let remarks = await Remarks.find({ cno: e.cno })
        if (!remarks) {
          throw new Error('Invalid course.')
        }

        return remarks
      })
    }
  }
}
