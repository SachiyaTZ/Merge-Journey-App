const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  name: {
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
    required: true,
    min: 6,
    max: 1024,
    select: false
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'staff',
    enum: ['superadmin', 'admin', 'staff', 'employee', 'driver']
  },
  creator: {
    type: Number,
    required: true
  },
  editor: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

module.exports = mongoose.model('user', user_schema);
