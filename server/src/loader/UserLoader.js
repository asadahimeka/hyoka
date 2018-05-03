import DataLoader from 'dataloader'
import { User as UserModel } from '../model'
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader'

export default class User {
  constructor(data, { user }) {
    for (const key in data) {
      this[key] = data[key]
    }
    // you can only see your own email, and your active status
    // if (user && user._id.equals(data._id)) {
    //   this.email = data.email
    //   this.active = data.active
    // }
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(UserModel, ids))

const canSee = (user, data) => {
  // TODO: handle security
  return user && user.role === 'admin'
}

export const load = async (context, id) => {
  if (!id) {
    return null
  }

  let data
  try {
    data = await context.dataloaders.UserLoader.load(id)
  } catch (err) {
    return null
  }
  return new User(data, context)
}

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.UserLoader.clear(id.toString())
}

export const loadMany = async (context, args) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  const users = UserModel.find(where, { _id: 1 }).sort({ createdAt: 1 })

  return canSee(context.user, users) ? connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load
  }) : null
}
