import DataLoader from 'dataloader'
import RemarksModel from '../model/Remarks'
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader'

export default class Remarks {
  constructor(data) {
    console.log('data: ', data)
    for (const key in data) {
      this[key] = data[key]
    }
    this.sname = data.sname
    this.cname = data.cname
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(RemarksModel, ids))

const viewerCanSee = (viewer, data) => {
  // TODO: handle security
  return true
}

export const load = async ({ user: viewer, dataloaders }, id) => {
  if (!id) return null

  const data = await dataloaders.RemarksLoader.load(id.toString())

  if (!data) return null

  return viewerCanSee(viewer, data) ? new Remarks(data) : null
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.RemarksLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  // TODO: specify conditions
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const remarks = RemarksModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return connectionFromMongoCursor({
    cursor: remarks,
    context,
    args,
    loader: load
  })
}
