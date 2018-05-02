import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  evno: {
    type: String,
    required: true,
    index: true
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
  collection: 'eva'
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

export default mongoose.model('Eva', Schema)
