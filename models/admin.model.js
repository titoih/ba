const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  admin: {
    email: {
      type:String,
      unique:true
    },
    co: {
      type:String,
      unique:true
    }
  } 
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;