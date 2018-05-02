import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sno: {
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
  kurasu: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  hadEva: {
    type: [String],
    default: []
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
  collection: 'student'
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

export default mongoose.model('Student', Schema)
