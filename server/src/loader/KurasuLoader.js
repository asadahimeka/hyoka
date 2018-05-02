import DataLoader from 'dataloader'
import KurasuModel from '../model/Kurasu'
import connectionFromMongoCursor from './ConnectionFromMongoCursor'
import mongooseLoader from './mongooseLoader'

export default class Kurasu {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(KurasuModel, ids))

const viewerCanSee = (viewer, data) => {
  // TODO: handle security
  return true
}

export const load = async ({ user: viewer, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.KurasuLoader.load(id.toString())

  if (!data) return null

  return viewerCanSee(viewer, data) ? new Kurasu(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.KurasuLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const kurasus = KurasuModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return connectionFromMongoCursor({
    cursor: kurasus,
    context,
    args,
    loader: load
  })
}
