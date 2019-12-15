const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TYPE = ['OFERTA','DEMANDA'];
const CITY = ['Madrid', 'Barcelona', 'Valencia'];
const CATEGORY = ['Empleo', 'Contactos', 'Casa y Jardín']

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
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  name:{
    type:String,
    trim:true
  },
  phone:{
    type:String,
    trim:true,
    minlength:9,
    maxlength:9
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


adSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;