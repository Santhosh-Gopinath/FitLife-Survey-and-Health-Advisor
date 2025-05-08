const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', '']
  },
  bloodGroup: {
    type: String
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  phoneNo: {
    type: String
  },
  address: {
    type: String
  },
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiry: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);