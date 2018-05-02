import DataLoader from 'dataloader'
import CourseModel from '../model/Course'
import connectionFromMongoCursor from './ConnectionFromMongoCursor'
import mongooseLoader from './mongooseLoader'

export default class Course {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(CourseModel, ids))

const viewerCanSee = (viewer, data) => {
  // TODO: handle security
  return true
}

export const load = async ({ user: viewer, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.CourseLoader.load(id.toString())

  if (!data) return null

  return viewerCanSee(viewer, data) ? new Course(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.CourseLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const courses = CourseModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return connectionFromMongoCursor({
    cursor: courses,
    context,
    args,
    loader: load
  })
}
