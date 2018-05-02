import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  cno: {
    type: String,
    required: true
  },
  sno: {
    type: String,
    required: true
  },
  evas: {
    type: [String],
    required: true
  },
  remark: {
    type: Number,
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
  collection: 'remark'
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

export default mongoose.model('Remark', Schema)
