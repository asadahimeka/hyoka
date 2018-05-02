import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  nickname: {
    type: String,
    required: false
  },
  password: {
    type: String,
    hidden: true
  },
  email: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'hutsuu'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'user'
})

Schema.pre('save', function (next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password)
  }

  return next()
})

Schema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password)
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, 8)
  }
}

export default mongoose.model('User', Schema)
