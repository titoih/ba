const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

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
  role: {
    type: String,
    enum: ['admin', 'guess'],
    default: 'guess'
  },
  ad:[{ type: mongoose.Types.ObjectId, ref: 'Ad' }],
  car:[{ type: mongoose.Types.ObjectId, ref: 'Car' }],
  contact:[{ type: mongoose.Types.ObjectId, ref: 'Contact' }],
  misc:[{ type: mongoose.Types.ObjectId, ref: 'Misc' }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (user.email === FIRST_ADMIN_EMAIL) {
      user.role = 'admin';
      next();
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;