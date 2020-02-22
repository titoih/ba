const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const TYPE = ['OFERTA','DEMANDA'];
const STATE =['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza', 'Ceuta', 'Melilla'];
const CATEGORY = ['Coches', 'Motos'];
const BRAND = ['Audi','BMW','Citroen', 'Honda', 'Ducati', 'Yamaha'];
// const FUEL = ['Gasolina', 'Diesel', 'Eléctrico', 'Híbrido'];
// const GEAR = ['Manual', 'Automático'];
// const DOORS = [5,4,3,2];


const carSchema = new Schema({
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
  brand: {
    type: String,
    required: [true, 'La marca es necesaria'],
    enum: BRAND,
  },
  carmodel: {
    type: String,
    required: [true, 'El modelo es necesario'],
    trim:true
  },
  km: {
    type: Number,
    trim:true
  },
  year: {
    type: Number,
    trim:true
  },
  // color: {
  //   type: String,
  //   trim:true
  // },
  // fuel: {
  //   type: String,
  //   enum: FUEL,
  //   trim:true
  // },
  // gear: {
  //   type: String,
  //   enum: GEAR,
  //   trim:true
  // },
  // cv: {
  //   type: Number,
  //   trim:true
  // },
  // doors: {
  //   type: Number,
  //   enum: DOORS,
  //   trim:true
  // },
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
carSchema.path('phone').validate(function (value) {
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
carSchema.plugin(autoIncrement.plugin, { model: 'Ad', field: 'reference' });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;