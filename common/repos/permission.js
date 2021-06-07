const mongoose = require('mongoose');

const permission_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  status: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('permission', permission_schema);
