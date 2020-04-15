const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const TYPE = ['OFERTA','DEMANDA'];
const STATE =['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza', 'Ceuta', 'Melilla'];
const CATEGORY = ['Servicio Doméstico', 'Camareros', 'Educación', 'Administrativos', 'Otros Empleo'];

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
    maxlength:[75, 'El email parece incorrecto'],
    minlength:[12, 'El email parece incorrecto'],
    match: [EMAIL_PATTERN, 'Revisa el correo, parece erróneo']
  },
  name:{
    type:String,
    maxlength:[30, 'El nombre no puede ser tan largo'],
    minlength:[1, 'El nombre no puede ser tan corto'],
    required:[true, 'El nombre es necesario'],
    trim:true,
    
  },
  phone:{
    type:String,
    trim:true
  },
  vendor:{
    type: String,
    required: true,
    enum: TYPE,
    uppercase:true
  },
  title: {
    type: String,
    required: [true, 'El título es necesario'],
    maxlength:[40, 'Error en el título'],
    minlength:[1, 'Error en el título'],
    trim: true,
  },
  state: {
    type: String,
    required:[true, 'La provincia es necesaria'],
    enum: STATE,
    maxlength:[40, 'Error en la ciudad']
  },
  city: {
    type: String,
    maxlength:[30, 'Error en la ciudad']
  },
  category: {
    type: String,
    required: [true, 'La categoría es necesaria'],
    enum: CATEGORY
  },
  renovate: {
    type: Date
  },
  description: {
    type: String,
    required: [true, 'La descripción es necesaria'],
    maxlength:[510, 'La descripción es muy larga'],
    trim:true,
  },
  image: {
      imgName:{
        type:String
      },
      imgPath:{
        type:[String]
      }
  },
  ip: {
    type: String
  },
  ua: {
    type: String
  },
  co: {
    type: String
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// custom validation phone
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

adSchema.index({title:"text", description:"text", phone:"text", reference:"text"})

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;