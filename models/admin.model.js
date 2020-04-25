const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type:String
  },
  co: {
    type:String
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;