const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const TYPE = ['OFERTA','DEMANDA'];
const CITY = ['Madrid', 'Barcelona', 'Valencia'];
const CATEGORY = ['Empleo', 'Contactos', 'Casa y Jardín'];

const adSchema = new Schema({
  reference: {
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
  name:{
    type:String,
    trim:true
  },
  phone:{
    type:String,
    trim:true,
  },
  type:{
    type: String,
    required: true,
    enum: TYPE,
    uppercase:true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required:true,
    enum: CITY
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORY
  },
  description: {
    type: String,
    required: true,
    trim:true,
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

//autoincrement plugin generate ad reference
adSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;