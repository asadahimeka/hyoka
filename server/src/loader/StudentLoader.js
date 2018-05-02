import DataLoader from 'dataloader'
import StudentModel from '../model/Student'
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader'

export default class Student {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(StudentModel, ids))

const canSee = (user, data) => {
  // TODO: handle security

  return user && user.role === 'admin'
}

export const load = async ({ user, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.StudentLoader.load(id.toString())

  if (!data) return null

  return canSee(user, data) ? new Student(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.StudentLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const students = StudentModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return canSee(context.user, students) ? connectionFromMongoCursor({
    cursor: students,
    context,
    args,
    loader: load
  }) : null
}
