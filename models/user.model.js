const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password:{
    type:String,
    required:true,
    trim:true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;