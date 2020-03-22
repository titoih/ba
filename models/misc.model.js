const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const TYPE = ['OFERTA','DEMANDA'];
const VENDORTYPE = ['Particular','Profesional'];
const STATE =['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza', 'Ceuta', 'Melilla'];
const CATEGORY = ['Bricolaje', 'Para Bebés', 'Electrodomésticos', 'Muebles', 'Ropa', 'Otros'];

const miscSchema = new Schema({
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
  vendor:{
    type: String,
    required: true,
    enum: TYPE,
    uppercase:true
  },
  vendorType: {
    type: String,
    trim:true,
    required: [true, 'Tipo de vendedor es necesario'],
    enum: VENDORTYPE
  },
  title: {
    type: String,
    required: [true, 'El título es necesario'],
    trim: true,
  },
  state: {
    type: String,
    required:[true, 'La provincia es necesaria'],
    enum: STATE
  },
  city: {
    type: String,
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
    trim:true,
  },
  price: {
    type: Number,
    required: [true, 'El precio es necesario'],
    trim:true
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
miscSchema.path('phone').validate(function (value) {
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
miscSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });

const Misc = mongoose.model('Misc', miscSchema);

module.exports = Misc;