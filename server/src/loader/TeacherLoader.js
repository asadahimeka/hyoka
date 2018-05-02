import DataLoader from 'dataloader'
import TeacherModel from '../model/Teacher'
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader'

export default class Teacher {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(TeacherModel, ids))

const viewerCanSee = (viewer, data) => {
  // TODO: handle security
  return viewer && viewer.role === 'admin'
}

export const load = async ({ user: viewer, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.TeacherLoader.load(id.toString())

  if (!data) return null

  return viewerCanSee(viewer, data) ? new Teacher(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.TeacherLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const teachers = TeacherModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return connectionFromMongoCursor({
    cursor: teachers,
    context,
    args,
    loader: load
  })
}
