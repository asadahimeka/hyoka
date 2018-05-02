import jwt from 'jsonwebtoken'
import User from './model/User'
import { jwtSecret } from './config'

export async function getUser(token) {
  if (!token) return { user: null }

  try {
    const decodedToken = jwt.verify(token, jwtSecret)

    const user = await User.findOne({ _id: decodedToken.id })

    return {
      user
    }
  } catch (err) {
    return { user: null }
  }
}

export function generateToken(user) {
  return `${jwt.sign({ id: user._id }, jwtSecret)}`
}
