const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const STATE =['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza', 'Ceuta', 'Melilla'];
const CATEGORY = ['Contactos Mujeres', 'Contactos Gays', 'Contactos Trans', 'Contactos Hombres', 'Otros Contactos'];

const contactSchema = new Schema({
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
    required:[true, 'El nombre es necesario'],
    trim:true,
    maxlength:[30, 'El nombre no puede ser tan largo'],
    minlength:[1, 'El nombre no puede ser tan corto'] 
    
  },
  age:{
    type:Number,
    required:[true, 'La edad es necesaria'],
    min: [18,'No pueden publicar menores de 18 años'],
    max: [100,'La edad parece errónea'],
    trim:true,
  },
  phone:{
    type:String,
    trim:true
  },
  title: {
    type: String,
    required: [true, 'El título es necesario'],
    trim: true,
    maxlength:[40, 'Error en el título'],
    minlength:[1, 'Error en el título']
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
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// custom validation
contactSchema.path('phone').validate(function (value) {
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
contactSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;