const mongoose = require('mongoose');

const role_permission_schema = new mongoose.Schema({
  role_id:{
    type: String,
    required: true
  },
  permission_ids: {
    type: Array,
    required: true
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

module.exports = mongoose.model('role_permission', role_permission_schema);
