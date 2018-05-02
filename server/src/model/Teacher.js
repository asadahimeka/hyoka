import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tno: {
    type: String,
    required: true,
    index: true
  },
  sex: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'teacher'
})

// Schema
//   .pre('save', function (next) {

//     return next();
//   });

// Schema.methods = {
//   method(para) {
//     return
//   },
// };

export default mongoose.model('Teacher', Schema)
