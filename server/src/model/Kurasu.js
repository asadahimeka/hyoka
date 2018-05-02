import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  kno: {
    type: String,
    required: true,
    index: true
  },
  courses: {
    type: [],
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
  collection: 'kurasu'
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

export default mongoose.model('Kurasu', Schema)
