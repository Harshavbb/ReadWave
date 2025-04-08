const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter book title'],
  },
  author: {
    type: String,
    required: [true, 'Please enter author name'],
  },
  isbn: {
    type: String,
    required: [true, 'Please enter ISBN'],
    unique: true,
  },
  copiesAvailable: {
    type: Number,
    default: 1,
  },
  department: {
    type: String,
    required: [true, 'Please specify department'],
  },
  issuedCount: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
