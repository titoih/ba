const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const TYPE = ['OFERTA','DEMANDA'];
const STATE =['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Baleares','Jaén','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza', 'Ceuta', 'Melilla'];
const CATEGORY = ['Coches', 'Motos', 'Todoterrenos'];
const BRAND = ['Aston Martin','Audi','Austin','Bentley','BMW','Chevrolet','Chrysler','Citroen','Dacia','Daewoo','Daihatsu','Dodge','Fiat','Ford','Galloper','Honda','Hummer','Hyundai','Infiniti','Isuzu','Jaguar','Jeep','Kia','Lada','Lamborghini','Lancia','Land-Rover','Lexus','Lotus','Mazda','Mercedes-Benz','MG','Mini','Mitsubishi','Nissan','Opel','Peugeot','Pontiac','Porsche','Renault','Rolls-Royce','Rover','Saab','Seat','Skoda','Smart','Ssangyong','Subaru','Suzuki','Tesla','Toyota','Volkswagen','Volvo','Aprilia','Benelli','Beta','Bimota','BMW','Bultaco','Cagiva','Daelim','Derbi','Ducati','Gasgas','Gilera','Hanway','Harley Davidson','Honda','Husaberg','Husqvarna','Hyosung','Italjet','Kawasaki','Keeway','KTM','Kymco','Lambretta','Laverda','Malaguti','MBK','Montesa','Moto Guzzi','Motor Hispania','MV Agusta','Ossa','Peugeot','Piaggio','Puch','Renault','Rieju','Royal Enfield','Sherco','Siam','Suzuki','Sym','TGB','Triumph','Vespa','Vespino','Yamaha' ];
const VENDORTYPE = ['Particular','Profesional'];
const FUEL = ['Gasolina', 'Diesel', 'Eléctrico', 'Híbrido', 'GLP'];

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
    match: [EMAIL_PATTERN, 'Revisa el correo, parece erróneo'],
    maxlength:[75, 'El email parece incorrecto'],
    minlength:[12, 'El email parece incorrecto']
  },
  name:{
    type:String,
    required:[true, 'El nombre es necesario'],
    trim:true,
    maxlength:[30, 'El nombre no puede ser tan largo'],
    minlength:[1, 'El nombre no puede ser tan corto']    
  },
  phone:{
    type:String,
    trim:true
  },
  vendor:{
    type: String,
    required: true,
    enum: TYPE,
    uppercase:true,
    maxlength:[8, 'Error en tipo vendedor']
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
  brand: {
    type: String,
    required: [true, 'La marca es necesaria'],
    enum: BRAND,
  },
  carmodel: {
    type: String,
    required: [true, 'El modelo es necesario'],
    trim:true,
    maxlength:[40, 'Error en el modelo, muy largo'],
    minlength:[1, 'Error en el modelo, muy corto']
  },
  km: {
    type: Number,
    trim:true,
    max: [5000000,'Los kms parecen erróneos']
  },
  price: {
    type: Number,
    trim:true,
    max: [1000000,'El precio parece erróneo']
  },
  engine: {
    type: Number,
    trim:true,
    max: [2000,'La cc parece errónea']
  },
  color: {
    type: String,
    trim:true,
    maxlength:[40, 'Error en el color, muy largo']
  },
  year: {
    type: Number,
    trim:true,
    min: [1900,'El año no puede ser menor a 1900'],
    max: [2020,'El año no puede ser superior a 2020 '],
  },
  vendorType: {
    type: String,
    trim:true,
    required: [true, 'Tipo de vendedor es necesario'],
    enum: VENDORTYPE
  },
  fuel: {
    type: String,
    trim:true,
    enum: FUEL,
    maxlength:[40, 'El combustible parece erróneo'],
  },
  doors: {
    type: String,
    trim:true,
    maxlength:[40, 'Puertas parece erróneo']
  },
  cv: {
    type: String,
    trim:true,
    max: [1000,'Los cv parecen erróneos']
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

carSchema.index({carmodel:"text", phone:"text"})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;