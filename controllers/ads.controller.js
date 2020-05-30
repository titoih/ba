const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

const provinces = require('../DATA_VARIABLES.js');
const emailTemplate = require('../emailTemplate.js')

const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home', {layout:false})
}

module.exports.cookieContact = (req, res, next) =>  {
  res.cookie('cookieContact', 'onlyOver18');
  res.redirect('/anuncios')
}

module.exports.sendEmail = (req, res, next) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const reg = '^((6)|(7))[0-9]{8}$';
  const getModel = (category) => {
  const modelObj = {
      'Coches': Car,
      'Motos': Car,
      'Todosterrenos': Car,
      'Servicio Doméstico': Ad,
      'Camareros': Ad ,
      'Educación': Ad,
      'Administrativos': Ad,
      'Otros Empleo': Ad,
      'Bricolaje': Misc,
      'Para Bebés': Misc,
      'Electrodomésticos': Misc,
      'Muebles': Misc,
      'Ropa': Misc,
      'Otros': Misc,
      'Contactos Mujeres': Contact,
      'Contactos Gays': Contact,
      'Contactos Trans': Contact,
      'Contactos Hombres': Contact,
      'Otros Contactos': Contact
    }
    return modelObj[category];
  }

  const emailValidator = (email) => {
    if(emailRegexp.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }
  const phoneValidator = (phone) => {
    if(phone != ''){
      if(phone.match(reg)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;  
    }
  }
  const globalValidator = (body) => {
    if( phoneValidator(body.phone) == true && emailValidator(body.email) 
    && req.body.category ){
      body.success = `success-${body.ref}`;
      const model = getModel(req.body.category);

      model.find({reference:body.ref})
        .then(ad => {
          const emailToUser = ad[0].email;
          if(emailToUser) {
            // nodemailer
            let transporter = nodemailer.createTransport({
              host: 'mail.buenanuncio.com',
              secure: true,
              port: 465,
              requireTLS: true, //Force TLS
              auth: {
                user: process.env.EMAILNODEMAILER,
                pass: process.env.NODEMAILERPASS
              }
            });
            transporter.sendMail({
              from: 'BuenAnuncio <info@buenanuncio.com>',
              to: emailToUser,
              replyTo: body.email,
              subject: 'Has recibido un mensaje', 
              html:emailTemplate.createTemplate({ad, body})
            });
          } else {
            console.log('error #nouseremail');
            next(createError(404, 'Anuncio no encontrado'));
          }
        })
        .catch(error => console.log(error))
    } else {
      body.success = 'unsuccess';
    }
  }
  globalValidator(req.body);
  res.json(req.body);
}

module.exports.list = (req,res,next) => {

  let {parentCategory, category, state,
  brand, carmodel, priceLow, priceHigh, yearLow,
  yearHigh, km, ccLow, ccHigh, searchWord,
  vendor, vendorType, ageLow, ageHigh, checkContactCat } = req.query;
  
  if(req.params){
    if(req.params.parentCategory == 'motor'){
      parentCategory = 1;
      if(req.params.category == 'coches-segunda-mano'){
        category = 1;
      }
      else if(req.params.category == 'todoterrenos-segunda-mano'){
        category = 3;
      }
      else if(req.params.category == 'motos-segunda-mano'){
        category = 2;
      } else {
        console.log('no params from home motor')
      }
    }
    else if(req.params.parentCategory == 'empleo'){
      parentCategory = 2;
      if(req.params.category == 'servicio-domestico'){
        category = 1;
      }
      else if(req.params.category == 'camareros'){
        category = 2;
      }
      else if(req.params.category == 'educacion-profesores'){
        category = 3;
      }
      else if(req.params.category == 'administrativos'){
        category = 4;
      }
      else if(req.params.category == 'otros-trabajos'){
        category = 5;
      } else {
        console.log('no params from home jobs')
      }
    }
    else if(req.params.parentCategory == 'casa-jardin'){
      parentCategory = 3;
      if(req.params.category == 'herramientas-bricolaje'){
        category = 1;
      }
      else if(req.params.category == 'bebes-segunda-mano'){
        category = 2;
      }
      else if(req.params.category == 'electrodomesticos-segunda-mano'){
        category = 3;
      }
      else if(req.params.category == 'muebles-segunda-mano'){
        category = 4;
      } 
      else if(req.params.category == 'ropa-segunda-mano'){
        category = 5;
      } 
      else if(req.params.category == 'otros-hogar'){
        category = 6;
      } else {
        console.log('no params from home casa y jardin')
      }
    }
    else if(req.params.parentCategory == 'contactos'){
      parentCategory = 4;
      if(req.params.category == 'mujeres'){
        category = 1;
      }
      else if(req.params.category == 'gays'){
        category = 2;
      }
      else if(req.params.category == 'trans'){
        category = 3;
      }
      else if(req.params.category == 'hombres'){
        category = 4;
      }
      else if(req.params.category == 'otras-relaciones'){
        category = 5;
      } else {
        console.log('no params from home contacts')
      }
    } else {
      console.log('no category params at contacts')
    }
  }

  // role => admin for email
  let email = '';
  let ip = '';
  let ua = '';
  let co = '';

  const checkIfAdmin = () => {
    if(req.session.currentUser){
      if(req.session.currentUser.email == process.env.FIRST_ADMIN_EMAIL){
        if(req.session.currentUser.role == 'admin'){
          if(req.query.email) {
            email = req.query.email;
            email = email.replace(' ', "+");
          }
          if(req.query.ip) {
            ip = req.query.ip;
          }
          if(req.query.ua) {
            ua = req.query.ua;
          }
          if(req.query.co) {
            co = req.query.co;
          }
        }
      }
    }
  }
  
  const getNumberPages = (n) => {
    return Math.ceil(n,1);
  }

  let pageNum = req.query.page;
  let var1 = 0;
  let var2 = 5;
    if(pageNum) {
        var1 = var2 * (Number(pageNum) -1 );
        var2 = var1 + 5;

    } else {
      pageNum = 1;
      var1 = 0;
      var2 = 5;
      console.log('there is no req.params.page => #issuePagination')
    }

  const getModel = (arg) => {
    const obj = {
      1:Car,
      2:Ad,
      3:Misc,
      4:Contact
    }
    return obj[arg];
  }

  const getParent = (arg) => {
    const obj = {
      1:'Motor',
      2:'Empleo',
      3:'Casa y Jardín',
      4:'Contactos'
    }
    return obj[arg];
  }

  var getAdCategory = (arg) => {
    if(getModel(parentCategory) == Car) {
      const obj = {
        1: 'Coches',
        2: 'Motos',
        3: 'Todoterrenos'
      }
      return obj[arg];
    }
    else if (getModel(parentCategory) == Ad) {
      const obj = {
        1:'Servicio Doméstico',
        2:'Camareros',
        3:'Educación',
        4:'Administrativos',
        5:'Otros Empleo'
      }
      return obj[arg];
    }
    else if (getModel(parentCategory) == Misc) {
      const obj = {
        1:'Bricolaje',
        2:'Para Bebés',
        3:'Electrodomésticos',
        4:'Muebles',
        5:'Ropa',
        6:'Otros'
      }
      return obj[arg];
    }
    else if (getModel(parentCategory) == Contact) {
      const obj = {
        1:'Contactos Mujeres',
        2:'Contactos Gays',
        3:'Contactos Trans',
        4:'Contactos Hombres',
        5:'Otros Contactos'
      }
      return obj[arg];
    } else {'error at ads.controller #issueGetModel'}

  }

  const getBrand = (arg) => {
    const obj = {
    '1': 'Aston Martin',
    '2': 'Audi',
    '3': 'Austin',
    '4': 'Bentley',
    '5': 'BMW',
    '6': 'Chevrolet',
    '7': 'Chrysler',
    '8': 'Citroen',
    '9': 'Dacia',
    '10': 'Daewoo',
    '11': 'Daihatsu',
    '12': 'Dodge',
    '13': 'Fiat',
    '14': 'Ford',
    '15': 'Galloper',
    '16': 'Honda',
    '17': 'Hummer',
    '18': 'Hyundai',
    '19': 'Infiniti',
    '20': 'Isuzu',
    '21': 'Jaguar',
    '22': 'Jeep',
    '23': 'Kia',
    '24': 'Lada',
    '25': 'Lamborghini',
    '26': 'Lancia',
    '27': 'Land-Rover',
    '28': 'Lexus',
    '29': 'Lotus',
    '30': 'Mazda',
    '31': 'Mercedes-Benz',
    '32': 'MG',
    '33': 'Mini',
    '34': 'Mitsubishi',
    '35': 'Nissan',
    '36': 'Opel',
    '37': 'Peugeot',
    '38': 'Pontiac',
    '39': 'Porsche',
    '40': 'Renault',
    '41': 'Rolls-Royce',
    '42': 'Rover',
    '43': 'Saab',
    '44': 'Seat',
    '45': 'Skoda',
    '46': 'Smart',
    '47': 'Ssangyong',
    '48': 'Subaru',
    '49': 'Suzuki',
    '50': 'Tesla',
    '51': 'Toyota',
    '52': 'Volkswagen',
    '53': 'Volvo',
    '100': 'Aprilia',
    '101': 'Benelli',
    '102': 'Beta',
    '103': 'Bimota',
    '104': 'BMW',
    '106': 'Bultaco',
    '107': 'Cagiva',
    '108': 'Daelim',
    '109': 'Derbi',
    '110': 'Ducati',
    '111': 'Gasgas',
    '112': 'Gilera',
    '113': 'Hanway',
    '114': 'Harley Davidson',
    '115': 'Honda',
    '116': 'Husaberg',
    '117': 'Husqvarna',  
    '118': 'Hyosung',
    '119': 'Italjet',
    '120': 'Kawasaki',
    '121': 'Keeway',
    '122': 'KTM',
    '123': 'Kymco',
    '124': 'Lambretta',
    '125': 'Laverda',
    '126': 'Malaguti',
    '127': 'MBK',
    '128': 'Montesa',
    '129': 'Moto Guzzi',
    '130': 'Motor Hispania',
    '131': 'MV Agusta',
    '132': 'Ossa',
    '133': 'Peugeot',
    '134': 'Piaggio',
    '135': 'Puch',
    '136': 'Renault',
    '137': 'Rieju',
    '138': 'Royal Enfield',
    '139': 'Sherco',
    '140': 'Siam',
    '141': 'Suzuki',
    '142': 'Sym',
    '143': 'TGB',
    '144': 'Triumph',
    '145': 'Vespa',
    '146': 'Vespino',
    '147': 'Yamaha'
    }
    return obj[arg];
  }
  
  const getState= (arg) => {
    // get full provinces
    return provinces.objProvinces[arg];
  }

  const modelVariable = getModel(parentCategory);
  const motor = 1;
  const empleo = 2;
  const misc = 3;
  const contact = 4;
  const carAttr = true;

  let mongoQuery = {};
  let objVariables = {};
  let pagObj = {page:pageNum};

  if(parentCategory) {
    objVariables['parentCategory'] = parentCategory;
    pagObj['parentCategory'] = parentCategory;
    objVariables['pagination'] = pagObj;

    if(parentCategory == 1) {
      objVariables['motor'] = motor;
      objVariables['carAttr'] = carAttr;
    }
    if(parentCategory == 2) {
      objVariables['empleo'] = empleo;
    }
    if(parentCategory == 3) {
      objVariables['misc'] = misc;
    }
    if(parentCategory == 4) {
      objVariables['contact'] = contact;
    }
  
  if(category) {
    mongoQuery['category'] = getAdCategory(category);
    objVariables['category'] = category;
    pagObj['category'] = category;
    objVariables['pagination'] = pagObj; 
  }
  if(state) {
    mongoQuery['state'] = getState(state);
    objVariables['state'] = state;
    pagObj['state'] = state;
    objVariables['pagination'] = pagObj; 
  }
  if(brand) {
    mongoQuery['brand'] = getBrand(brand);
    objVariables['brand'] = brand;
    pagObj['brand'] = brand;
    objVariables['pagination'] = pagObj;
  }
  if(carmodel) {
    mongoQuery['$text'] = {$search: carmodel};
    objVariables['carmodel'] = carmodel;
    pagObj['carmodel'] = carmodel;
    objVariables['pagination'] = pagObj;
  }
  if(priceLow && !priceHigh) {
    mongoQuery['price'] = {$gte:priceLow};
    objVariables['priceLow'] = priceLow;
    pagObj['priceLow'] = priceLow;
    objVariables['pagination'] = pagObj;
  }
  if(!priceLow && priceHigh) {
    mongoQuery['price'] = {$lte:priceHigh};
    objVariables['priceHigh'] = priceHigh;
    pagObj['priceHigh'] = priceHigh;
    objVariables['pagination'] = pagObj;
  }
  if(priceLow && priceHigh) {
    mongoQuery['price'] = {$gte:priceLow, $lte:priceHigh};
    objVariables['priceLow'] = priceLow;
    objVariables['priceHigh'] = priceHigh;
    pagObj['priceLow'] = priceLow;
    pagObj['priceHigh'] = priceHigh;
    objVariables['pagination'] = pagObj;
  }
  if(yearLow && !yearHigh) {
    mongoQuery['year'] = {$gte:yearLow};
    objVariables['yearLow'] = yearLow;
    pagObj['yearLow'] = yearLow;
    objVariables['pagination'] = pagObj;
  }
  if(!yearLow && yearHigh) {
    mongoQuery['year'] = {$lte:yearHigh};
    objVariables['yearHigh'] = yearHigh;
    pagObj['yearHigh'] = yearHigh;
    objVariables['pagination'] = pagObj;
  }
  if(yearLow && yearHigh) {
    mongoQuery['year'] = {$gte:yearLow, $lte:yearHigh};
    objVariables['yearLow'] = yearLow;
    objVariables['yearHigh'] = yearHigh;
    pagObj['yearLow'] = yearLow;
    pagObj['yearHigh'] = yearHigh;
    objVariables['pagination'] = pagObj;
  }
  if(ccLow && !ccHigh) {
    mongoQuery['engine'] = {$gte:ccLow};
    objVariables['ccLow'] = ccLow;
    pagObj['ccLow'] = ccLow;
    objVariables['pagination'] = pagObj;
  }
  if(!ccLow && ccHigh) {
    mongoQuery['engine'] = {$lte:ccHigh};
    objVariables['ccHigh'] = ccHigh;
    pagObj['ccHigh'] = ccHigh;
    objVariables['pagination'] = pagObj;
  }
  if(ccLow && ccHigh) {
    mongoQuery['engine'] = {$gte:ccLow, $lte:ccHigh};
    objVariables['ccLow'] = ccLow;
    objVariables['ccHigh'] = ccHigh;
    pagObj['ccLow'] = ccLow;
    pagObj['ccHigh'] = ccHigh;
    objVariables['pagination'] = pagObj;
  }
  if(km) {
    mongoQuery['km'] = {$lte:km};
    objVariables['km'] = km;
    pagObj['km'] = km;
    objVariables['pagination'] = pagObj;
  }
  if(searchWord) {
    mongoQuery['$text'] = {$search: searchWord};
    objVariables['searchWord'] = searchWord;
    pagObj['searchWord'] = searchWord;
    objVariables['pagination'] = pagObj;
  }
  if(vendor) {
    mongoQuery['vendor'] = vendor;
    objVariables['vendor'] = vendor;
    pagObj['vendor'] = vendor;
    objVariables['pagination'] = pagObj;
  }
  if(vendorType) {
    mongoQuery['vendorType'] = vendorType;
    objVariables['vendorType'] = vendorType;
    pagObj['vendorType'] = vendorType;
    objVariables['pagination'] = pagObj;
  }
  if(ageLow && !ageHigh) {
    mongoQuery['age'] = {$gte:ageLow};
    objVariables['ageLow'] = ageLow;
    pagObj['ageLow'] = ageLow;
    objVariables['pagination'] = pagObj;
  }
  if(!ageLow && ageHigh) {
    mongoQuery['age'] = {$lte:ageHigh};
    objVariables['ageHigh'] = ageHigh;
    pagObj['ageHigh'] = ageHigh;
    objVariables['pagination'] = pagObj;
  }
  if(ageLow && ageHigh) {
    mongoQuery['age'] = {$gte:ageLow, $lte:ageHigh};
    objVariables['ageLow'] = ageLow;
    objVariables['ageHigh'] = ageHigh;
    pagObj['ageLow'] = ageLow;
    pagObj['ageHigh'] = ageHigh;
    objVariables['pagination'] = pagObj;
  }

  modelVariable.find(mongoQuery)
  .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      objVariables.adsAll = adsAll;
      pagObj.pageCount = getNumberPages(size);
      return res.render('ads/list', objVariables)
    })
    .catch(error => console.log(error))
}
// no parentcategory
 else if(!parentCategory) {

  const promiseAllMongoQuery = {};
  const objPagination = {};

  if(state){
    promiseAllMongoQuery['state'] = getState(state);
  }
  // #freesearch
  if(searchWord) {
    promiseAllMongoQuery['$text'] = {$search: searchWord};
  }
  const ifSearchWord = () => {
    objPagination['searchWord'] = searchWord;
    objPagination.pagination['searchWord'] = searchWord;
  }
  const ifState = () => {
    objPagination['state'] = state;
    objPagination.pagination['state'] = state;
  }
  
  const emailMongoQuery = () => {
    checkIfAdmin();
    if(email) {
      promiseAllMongoQuery['email'] = email;
    } 
    else if(ip) {
      promiseAllMongoQuery['ip'] = ip;
    }
    else if(ua) {
      promiseAllMongoQuery['ua'] = ua;
    }
    else if(co) {
      promiseAllMongoQuery['co'] = co;
    }
    else {
      console.log('query for admin #noneofmine')
    }
  }
  
  emailMongoQuery();


  const ifAdmin = () => {
    checkIfAdmin();
    if(email){
      objPagination['elementLocked'] = email;
      objPagination.pagination['email'] = email;
    } 
    else if(ip) {
      objPagination['ip'] = ip;
      objPagination.pagination['ip'] = ip;
    }
    else if(ua) {
      objPagination['ua'] = ua;
      objPagination.pagination['ua'] = ua;
    }
    else if(co) {
      objPagination['elementLocked'] = co;
      objPagination.pagination['co'] = co;
    }
    else {
      console.log('Not looking for my admin parameters')
    }
  }

  const adminLock = () => {
    let param = {};
    if(req.query.co) {
      param['co'] = req.query.co;
    }
    else if (req.query.email) {
      param['email'] = req.query.email.replace(' ', '+');
    } else {
      console.log('no admin param')
    }
      return Admin.findOne(param)
        .then(locked => {
          if(locked !== null) {
            objPagination['locked'] = 'locked';
          } else {
            console.log('not email in admin modelLocked')
          }
          objPagination['param'] = Object.keys(param)[0];
        })
        .catch(error => console.log(error))
  }
  // promise all FULL promise MODELS
  const fullPromiseAllModels = [Ad.find(promiseAllMongoQuery), Car.find(promiseAllMongoQuery), Misc.find(promiseAllMongoQuery)];
  if(checkContactCat) {
    fullPromiseAllModels.push(Contact.find(promiseAllMongoQuery))
  } // admin
  else if(req.session.currentUser) {
    if(req.session.currentUser.role == 'admin') {
      fullPromiseAllModels.push(Contact.find(promiseAllMongoQuery))
    }
  } else {
    console.log('contacts control')
  }

  const checkControl = () => {
    objPagination['checkContactCat'] = checkContactCat;
    objPagination.pagination['checkContactCat'] = checkContactCat;
  }
  // show ALL ads
  // ADMIN tools
      Promise.all(fullPromiseAllModels)
        .then(arrayFullAdsByModel => {
          const [ads, cars, misc, ...contacts] = arrayFullAdsByModel;
          const adsArray = [...ads, ...cars, ...misc];
          // check contacts control
          if(contacts.length > 0){adsArray.push(...contacts[0])}
          let adsAll = adsArray.sort((a,b) => {return b.renovate - a.renovate})
          const size = adsAll.length/5;
          adsAll = adsAll.slice(var1,var2);
          objPagination['adsAll'] = adsAll;
          objPagination['pagination'] = {page:pageNum, pageCount:getNumberPages(size)};
          if(state){ifState();}
          if(searchWord){ifSearchWord();}
          if(checkContactCat){checkControl();}

          ifAdmin();
          // get admin locks
          adminLock()
          .then( () => {
            return res.render('ads/list', objPagination)
          })
          .catch(error => console.log(error))
        })
        .catch(error => {
          console.log(error)
          next(error)
        })
  } 
  
  // SEO
  const adTitleGlobal = '. Trabajo y ofertas';
  const miscTitleGlobal = '. Segunda mano';

  const objParentSeo = {
    'Motor': {
      'title': `. Segunda mano, nuevo y usado`,
      'description': `Encuentra coches de segunda mano, motos usadas y todoterrenos ocasion.`
    },
    'Empleo': {
      'title': `. Buscar trabajo y encontrar ofertas`,
      'description': `Página de trabajo para administrativos, empleadas hogar, camareros y más.`
    },
    'Casa y Jardín': {
      'title': `. Segunda mano, nuevo y usado`,
      'description': `Muebles, electrodomésticos, bricolaje, productos bebés y más.`
    },
    'Contactos': {
      'title': `. Mujeres, gays, trans y hombres`,
      'description': `Avisos GRATIS de scorts y mujeres no profesionales, gays y transex.`
    },
  }
  const objSeoTitle = {
    'Coches': {
      'title': 'segunda mano baratos',
      'description': 'usados. Nuevos y ocasion de segunda mano.'
    },
    'Motos': {
      'title':'segunda mano baratas',
      'description': 'segundamano. Moto de carretera, clásicas, racing, scooter, trail, naked y más. Carnet A2 y A'
    },
    'Todoterrenos': {
      'title': 'segunda mano baratos',
      'description': 'Todoterreno, 4x4 y jeeps usados. Vehículos de ocasión a buen precio'
    },
    'Servicio Doméstico': {
      'title': adTitleGlobal, 
      'description': 'Ofertas trabajo como empleada del hogar, cocinera o limpiadora'
    },
    'Camareros': {
      'title': adTitleGlobal, 
      'description': 'Oferta de trabajo para camameros, cocineros y freganchin. Encuentra trabajo facil'
    },
    'Educación': {
      'title': adTitleGlobal, 
      'description': 'Oferta trabajo como profesor, profesor particular, docente online y más'
    },
    'Administrativos': {
      'title': adTitleGlobal, 
      'description': 'Oferta trabajo como administrativo, secretaria, oficinista.'
    },
    'Otros Empleo': {
      'title': adTitleGlobal, 
      'description': 'Otras ofertas de trabajo. Encuentra en nuestra página de empleo la oferta que buscas.'
    },
    'Bricolaje': {
      'title': miscTitleGlobal, 
      'description': 'Materiales de construccion y herramientas: taladros, lijadoras, compresor y otros.'
    },
    'Para Bebés': {
      'title': miscTitleGlobal, 
      'description': 'Accesorios baratos. Coches, ropa, juguetes, cunas, bugaboo. '
    },
    'Electrodomésticos': {
      'title': miscTitleGlobal, 
      'description': 'Compra electrodomésticos de ocasion. Neveras, frigorificos, lavavajillas.'
    },
    'Muebles': {
      'title': miscTitleGlobal, 
      'description': 'baratos de cocina, sillas sofas y sillones, armarios, literas y mucho más.'
    },
    'Ropa': {
      'title': miscTitleGlobal, 
      'description': 'usada. Marcas a buen precio: gucci, emperio armani, guess, nike, adidas, rebook, versace.'
    },
    'Otros': {
      'title': miscTitleGlobal, 
      'description': 'otros articulos de hogar usados baratos.'
    },
    'Contactos Mujeres': {
      'title': 'escorts. Página de relaciones.', 
      'description': 'Avisos gratis de mujeres. Teléfono de chicas y escorts de lujo en nuestra web.'
    },
    'Contactos Gays': {
      'title': 'para quedar con hombres', 
      'description': 'Avisos gratis de gays y chaperos. Citas y quedadas de hombres.'
    },
    'Contactos Trans': {
      'title': 'para quedar. GRATIS', 
      'description': 'Avisos gratis transexuales. Teléfono de trans cerca de ti.'
    },
    'Contactos Hombres': {
      'title': 'para quedar con chicas', 
      'description': 'Publica GRATIS y conoce mujeres y chicas online.'
    },
    'Otros Contactos': {
      'title': 'para quedar por internet', 
      'description': 'Todo tipo de contactos para conocer gente en internet.'
    },
  }

  const createSeoTitle = (category, meta) => {
    if(!category) {
        return `${getParent(parentCategory) ? `Anuncios ${getParent(parentCategory)}${searchWord ? ` ${searchWord}` : ``}${carmodel ? ` ${carmodel}` : ``}${state ? ` en ${getState(state)}${objParentSeo[getParent(parentCategory)][meta]}` : `${objParentSeo[getParent(parentCategory)][meta]}` }` : `${getState(state) ? `Anuncios segunda mano GRATIS ${getState(state)} - BUENANUNCIO.COM` : `Anuncios segunda mano gratis - BUENANUNCIO.COM`}`  }`  
    } else {
        return `Anuncios ${getParent(parentCategory) != 'Motor' && getParent(parentCategory) != 'Contactos' ? `${getParent(parentCategory)} ${category}${searchWord ? ` ${searchWord}` : ``}${carmodel ? carmodel : ``}${state ? ` en ${getState(state)}` : '' }` : `${category}${searchWord ? ` ${searchWord}` : ``}${getBrand(brand) ? ` ${getBrand(brand)}` : ''}${carmodel ? ` ${carmodel}` : ``} ${state ? `en ${getState(state)} ` : '' }`}${objSeoTitle[category][meta]}`
    }
  }
  const createSeoDescription = (category, meta) => {
    if(!category) {
      return `${getParent(parentCategory) ? `${getParent(parentCategory)}${searchWord ? ` ${searchWord}` : ``}${carmodel ? ` ${carmodel}` : ``}${state ? ` en ${getState(state)} ${objParentSeo[getParent(parentCategory)][meta]}` : ` ${objParentSeo[getParent(parentCategory)][meta]}` }` : `${getState(state) ? `Encuentra en ${getState(state)} coches, motos y todoterrenos. Ofertas de empleo y trabajo, casa y jardin - muebles, electrodomesticos. Y avisos escorts, gays y trans` : `Coches y motos de segunda mano. Página de empleo y ofertas de trabajo. Avisos de escorts, gays o trans. Y todo para casa y jardín - muebles usados, electrodomesticos`}`}`  
    } else {
      return `${getParent(parentCategory) != 'Motor' && getParent(parentCategory) != 'Contactos' ? `${getParent(parentCategory)} ${category}${searchWord ? ` ${searchWord}` : ``}${carmodel ? carmodel : ``}${state ? ` en ${getState(state)} ` : '' }` : `${category}${searchWord ? ` ${searchWord}` : ``}${getBrand(brand) ? ` ${getBrand(brand)}` : ''}${carmodel ? ` ${carmodel}` : ``} ${state ? `en ${getState(state)} ` : '' }`}${objSeoTitle[category][meta] ? ` ${objSeoTitle[category][meta]}`: ``}`
    }
  }

  res.locals.metaTags = {
    title: createSeoTitle(getAdCategory(category), 'title'),
    description: createSeoDescription(getAdCategory(category), 'description'),
    robots: 'noarchive'
  }
}

module.exports.post = (req,res,next) => {
  res.locals.metaTags = {
    title: 'Publicar Anuncios Gratis - Avisos Segunda mano',
    description: 'Publica en nuestra web de anuncios de forma gratuita. Página de avisos: coches, motos, bricolaje, empleo, relaciones.',
    robots: 'all'
  }
  res.render('ads/post-first-step',)
}

module.exports.postSecond = (req,res,next) => {
  const categoryId = req.params.categoryId;
  if(categoryId >= 1  && categoryId <= 6) {
    return res.render('ads/post-second-step',{categoryId:categoryId, jobs:'job'})
  } 

  else if (categoryId >= 300  && categoryId <= 399) {
    
    return res.render('ads/contact-post-second-step',{categoryId:categoryId, contacts:'contacts'})
  }

  else if (categoryId > 399) {
    return res.render('ads/misc-post-second-step',{categoryId:categoryId, misc:'misc'})
  }

  else if(categoryId == 100 || categoryId == 101) {
    return res.render('ads/car-post-second-step',{categoryId:categoryId})
  }
  else if (categoryId == 110){
    return res.render('ads/motorbike-post-second-step',{categoryId:categoryId})
  }
}

module.exports.doPost = (req,res,next) => {
  // Set cookie
  const checkPostCookie = () => {  
    const postCookie = req.cookies.postCookie;
    let options = {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true, // The cookie only accessible by the web server
      // signed: true // Indicates if the cookie should be signed
    }
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2,randomNumber.length);
    
      if(postCookie == undefined) {
        res.cookie('postCookie',randomNumber, options);
        console.log('cookie created successfully');
        return randomNumber;
      } else {
        console.log('cookie exists');
        postCookie;
        return postCookie;
      }
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  const co = checkPostCookie();

  // get category
  let getCategory = (arg) => {
    const obj = {
      1:'Servicio Doméstico',
      2:'Camareros',
      3:'Educación',
      4:'Administrativos',
      5:'Otros Empleo',
      100:'Coches',
      101:'Todoterrenos',
      110:'Motos',
      300:'Contactos Mujeres',
      301:'Contactos Gays',
      302:'Contactos Trans',
      303:'Contactos Hombres',
      304:'Otros Contactos',
      400:'Bricolaje',
      401:'Para Bebés',
      402:'Electrodomésticos',
      403:'Muebles',
      404:'Ropa',
      405:'Otros',

    }
    return obj[arg];
  }
  // get state
  let getState = (arg) => {
    // get object provinces (full!)
    return provinces.objProvinces[arg];
  }
  // get brand
  let getBrand = (arg) => {
    const obj = {
    '1': 'Aston Martin',
    '2': 'Audi',
    '3': 'Austin',
    '4': 'Bentley',
    '5': 'BMW',
    '6': 'Chevrolet',
    '7': 'Chrysler',
    '8': 'Citroen',
    '9': 'Dacia',
    '10': 'Daewoo',
    '11': 'Daihatsu',
    '12': 'Dodge',
    '13': 'Fiat',
    '14': 'Ford',
    '15': 'Galloper',
    '16': 'Honda',
    '17': 'Hummer',
    '18': 'Hyundai',
    '19': 'Infiniti',
    '20': 'Isuzu',
    '21': 'Jaguar',
    '22': 'Jeep',
    '23': 'Kia',
    '24': 'Lada',
    '25': 'Lamborghini',
    '26': 'Lancia',
    '27': 'Land-Rover',
    '28': 'Lexus',
    '29': 'Lotus',
    '30': 'Mazda',
    '31': 'Mercedes-Benz',
    '32': 'MG',
    '33': 'Mini',
    '34': 'Mitsubishi',
    '35': 'Nissan',
    '36': 'Opel',
    '37': 'Peugeot',
    '38': 'Pontiac',
    '39': 'Porsche',
    '40': 'Renault',
    '41': 'Rolls-Royce',
    '42': 'Rover',
    '43': 'Saab',
    '44': 'Seat',
    '45': 'Skoda',
    '46': 'Smart',
    '47': 'Ssangyong',
    '48': 'Subaru',
    '49': 'Suzuki',
    '50': 'Tesla',
    '51': 'Toyota',
    '52': 'Volkswagen',
    '53': 'Volvo',
    '100': 'Aprilia',
    '101': 'Benelli',
    '102': 'Beta',
    '103': 'Bimota',
    '104': 'BMW',
    '106': 'Bultaco',
    '107': 'Cagiva',
    '108': 'Daelim',
    '109': 'Derbi',
    '110': 'Ducati',
    '111': 'Gasgas',
    '112': 'Gilera',
    '113': 'Hanway',
    '114': 'Harley Davidson',
    '115': 'Honda',
    '116': 'Husaberg',
    '117': 'Husqvarna',  
    '118': 'Hyosung',
    '119': 'Italjet',
    '120': 'Kawasaki',
    '121': 'Keeway',
    '122': 'KTM',
    '123': 'Kymco',
    '124': 'Lambretta',
    '125': 'Laverda',
    '126': 'Malaguti',
    '127': 'MBK',
    '128': 'Montesa',
    '129': 'Moto Guzzi',
    '130': 'Motor Hispania',
    '131': 'MV Agusta',
    '132': 'Ossa',
    '133': 'Peugeot',
    '134': 'Piaggio',
    '135': 'Puch',
    '136': 'Renault',
    '137': 'Rieju',
    '138': 'Royal Enfield',
    '139': 'Sherco',
    '140': 'Siam',
    '141': 'Suzuki',
    '142': 'Sym',
    '143': 'TGB',
    '144': 'Triumph',
    '145': 'Vespa',
    '146': 'Vespino',
    '147': 'Yamaha'
    }
    return obj[arg];
  }

  // mailer
  const newAdEmail = req.body;

  const createAdEmail = (emailData) => {
    
    emailData.newAdEmail.state = getState(emailData.newAdEmail.state);
    emailData.newAdEmail.brand ? emailData.newAdEmail.brand = getBrand(emailData.newAdEmail.brand) : ``;

    let transporter = nodemailer.createTransport({
      host: 'mail.buenanuncio.com',
      secure: true,
      port: 465,
      requireTLS: true, //Force TLS
      auth: {
        user: process.env.EMAILNODEMAILER,
        pass: process.env.NODEMAILERPASS
      }
    });

    transporter.sendMail({
      from: 'BuenAnuncio - Enhorabuena <info@buenanuncio.com>',
      to: emailData.newAdEmail.email, 
      subject: '¡Anuncio creado!', 
      html:emailTemplate.createTemplate(emailData)
    })
  }

  //CATEGORY MISC
  if(req.params.categoryId > 399) {

    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    let renovate = Date();
    const {name, title, description, email, city, vendor, price, phone, vendorType } = req.body;
    const imageUpload = [];
    // req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
    req.body.images.map(eachPath => imageUpload.push(`uploads/${eachPath}`))

    const newMiscAd = new Misc ({name,title,description,email,category,vendor,vendorType, state,city,price,renovate, phone, ip, ua, co, image:{imgPath:imageUpload} })
  
    req.body.category = req.params.categoryId;
    //handle errors post ad second step
    function renderWithErrors(errors) {
      res.render('ads/misc-post-second-step', {
        ad: req.body,
        errors: errors
      })
    }
   
    // if user exist => ad new ad_id //if not => create user and ad new ad_id
    User.findOne({email:email})
      .then(user => {
        if(user !== null){
          console.log(`User ${user.email} already exists`)
          newMiscAd.save()
          .then(ad => {
            User.updateOne({email:ad.email},{$push:{misc:ad._id}})
            .then(() => {
              createAdEmail({newAdEmail});
              
              res.render('ads/adSuccess')
            })            
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              console.log(error)
              renderWithErrors(error.errors)
            } else {
                console.log('issue #userExist')
                next(error)
            }
          })
        } else {
          //new user through posting
          console.log(`User ${email} is new user MISC`)
          newMiscAd.save()
          //jump to AUTH.CONTROLLER! - set pass and first ad by first user account//
          .then(newAdData => {
            createAdEmail({newAdEmail});
            res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category})
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              console.log('#issue usernewMiscAd')
              next(error)
            }
          })
        }  
      })
      .catch(err => {
        console.log('errorPost')
        next(err)
      })
  }

  //CATEGORY CONTACT
  if(req.params.categoryId < 400 && req.params.categoryId >= 300) {
  
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const renovate = Date();
    const {name, title, description, email, city, age, phone} = req.body;
    
    const imageUpload = [];
    // req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
    req.body.images.map(eachPath => imageUpload.push(`uploads/${eachPath}`))
    
    const newContact = new Contact({name,title,description,email,category,state,city, age,renovate,phone, ip, ua, co, image:{imgPath:imageUpload} })
  
    req.body.category = req.params.categoryId;
    //handle errors post ad second step
    function renderWithErrors(errors) {
      console.log('issue #renderWithErrors')
      res.render('ads/contact-post-second-step', {
        ad: req.body,
        errors: errors
      })
    }
   
    // if user exist => ad new ad_id //if not => create user and ad new ad_id
    User.findOne({email:email})
      .then(user => {
        if(user !== null){
          console.log(`User ${user.email} already exists`)
          newContact.save()
          .then(ad => {
            User.updateOne({email:ad.email},{$push:{contact:ad._id}})
            .then(() => {
              
              createAdEmail({newAdEmail});
              res.render('ads/adSuccess')
            })
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          
        } else {
          //new user through posting
          console.log(`User ${email} is new user CONTACT`)
          newContact.save()
          //jump to AUTH.CONTROLLER! -set pass and first ad by first user account//
          .then(newAdData => {
            createAdEmail({newAdEmail});
            
            res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category})
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
        }  
      })
      .catch(err => {
        console.log('errorPost')
        next(err)
      })
  }


  //CATEGORY JOBS
  if(req.params.categoryId < 100 && req.params.categoryId >= 1) {
  
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const renovate = Date();
    const {name,title,description,email,city,vendor,phone} = req.body;
    console.log(req.files)
    console.log(req.body)

    const imageUpload = [];
    // req.files => old multer
    req.body.images.map(eachPath => imageUpload.push(`uploads/${eachPath}`))
    
    const newAd = new Ad({name,title,description,email,category,state,city, vendor,renovate,phone, ip, ua, co, image:{imgPath:imageUpload} })
  
    req.body.category = req.params.categoryId;
    //handle errors post ad second step
    function renderWithErrors(errors) {

      res.render('ads/post-second-step', {
        ad: req.body,
        errors: errors
      })
    }
   
    // if user exist => ad new ad_id //if not => create user and ad new ad_id
    User.findOne({email:email})
      .then(user => {
        if(user !== null){
          console.log(`User ${user.email} already exists`)
          newAd.save()
          .then(ad => {
            User.updateOne({email:ad.email},{$push:{ad:ad._id}})
            .then(() => {
              
              createAdEmail({newAdEmail});
              res.render('ads/adSuccess')
          })
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
        } else {
          //new user through posting
          console.log(`User ${email} is new user AD`)
          newAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => {
            createAdEmail({newAdEmail});
            res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category})
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
        }  
      })
      .catch(err => {
        console.log('errorPost')
        next(err)
      })
  }

  //CATEGORY MOTOR//
  if(req.params.categoryId > 99 && req.params.categoryId < 200) {

    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const brand = getBrand(req.body.brand);
    const renovate = Date();

    const {name, year, carmodel, km, description, email, city, vendor, phone, price, engine, color, vendorType, fuel, doors, cv} = req.body;
    
    const imageUpload = [];
    // req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
    req.body.images.map(eachPath => imageUpload.push(`uploads/${eachPath}`))
    
    const newCarAd = new Car(
      {name, email, category, state, city, vendor,
      renovate, phone, carmodel, brand, km, year,
      description,
      image:{imgPath:imageUpload},
      price, engine, fuel, color, vendorType,
      doors, cv, fuel, ip, ua, co
      })
  
    req.body.category = req.params.categoryId;
    //handle errors post ad second step
    function renderWithErrors(errors) {
      //when errors, send to right view based on category ID
      function sendToViews(idCategoryError) {
        switch(idCategoryError) {
          case '100':
          return 'ads/car-post-second-step';
          case '101':
          return 'ads/car-post-second-step';
          case '110':     
          return 'ads/motorbike-post-second-step';
          default:
          console.log('something wrong check ad.controller sendToViews');
        }
      }
        res.render(sendToViews(req.body.category), {
          ad: req.body,
          errors: errors
        })
      }
   
    // if user exist => ad new ad_id //if not => create user and ad new ad_id
    User.findOne({email:email})
      .then(user => {
        if(user !== null){
          console.log(`User ${user.email} already exists`)
          newCarAd.save()
          .then(ad => {
            User.updateOne({email:ad.email},{$push:{car:ad._id}})
            .then(() => {
              createAdEmail({newAdEmail});
              res.render('ads/adSuccess')}
              )
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
        } else {
          //new user through posting
          console.log(`User ${email} is new user MOTOR`)
          newCarAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => {
            createAdEmail({newAdEmail});
            res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category})
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
        }  
      })
      .catch(err => {
        console.log('errorPost')
        next(err)
      })
  } 
}

