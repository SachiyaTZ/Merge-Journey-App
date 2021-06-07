const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  __v: {
    type: Number,
    select: false
  },
  firstname: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastname: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    // required: true,
    min: 6,
    max: 1024,
    select: false
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },




  
  status: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'member',
    enum: ['admin', 'staff', 'member']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', user_schema);
