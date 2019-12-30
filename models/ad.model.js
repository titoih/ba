const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const TYPE = ['OFERTA','DEMANDA'];
const CITY = ['Madrid', 'Barcelona', 'Valencia'];
const CATEGORY = ['Empleo', 'Contactos', 'Casa y Jardín'];

const adSchema = new Schema({
  reference: {
    type:Number,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:[true, 'El correo es necesario'],
    trim:true,
    lowercase:true,
    match: [EMAIL_PATTERN, 'Revisa el correo, parece erróneo']
  },
  name:{
    type:String,
    required:[true, 'El nombre es necesario'],
    trim:true,
    
  },
  phone:{
    type:String,
    trim:true
  },
  type:{
    type: String,
    required: true,
    enum: TYPE,
    uppercase:true
  },
  title: {
    type: String,
    required: [true, 'El título es necesario'],
    trim: true,
  },
  city: {
    type: String,
    required:[true, 'La ciudad es necesaria'],
    enum: CITY
  },
  category: {
    type: String,
    required: [true, 'La categoría es necesaria'],
    enum: CATEGORY
  },
  description: {
    type: String,
    required: [true, 'La descripción es necesaria'],
    trim:true,
  },
  image: {
      imgName:{
        type:String
      },
      imgPath:{
        type:[String]
      }
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// custom validation
adSchema.path('phone').validate(function (value) {
  const reg = '^((6)|(7))[0-9]{8}$';
  if(value != ''){
    if(!value.match(reg)) {
      return false;
    } else {
      return true;
    }
  }
}, 'El teléfono parece erróneo.');

//autoincrement plugin generate ad reference
adSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;