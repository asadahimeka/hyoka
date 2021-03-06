import DataLoader from 'dataloader'
import EvaModel from '../model/Eva'
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader'

export default class Eva {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(EvaModel, ids))

const viewerCanSee = (viewer, data) => {
  // TODO: handle security
  return true
}

export const load = async ({ user: viewer, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.EvaLoader.load(id.toString())

  if (!data) return null

  return viewerCanSee(viewer, data) ? new Eva(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.EvaLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const evas = EvaModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return connectionFromMongoCursor({
    cursor: evas,
    context,
    args,
    loader: load
  })
}
