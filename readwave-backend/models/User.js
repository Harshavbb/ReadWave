// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  rollNo: {
    type: String,
    required: [true, 'Please enter roll number'],
  },
  section: {
    type: String,
    required: [true, 'Please enter section'],
  },
  year: {
    type: Number,
    required: [true, 'Please enter year'],
  },
  department: {
    type: String,
    required: [true, 'Please enter department'],
  },
  booksTaken: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    }
  ],
  fine: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
