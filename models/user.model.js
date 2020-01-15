const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ad = require('../models/ad.model')

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
  },
  ad:[{ type: mongoose.Types.ObjectId, ref: 'Ad' }],
  car:[{ type: mongoose.Types.ObjectId, ref: 'Car' }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;