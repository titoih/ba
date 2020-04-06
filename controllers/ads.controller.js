const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const User = require('../models/user.model');
const provinces = require('../DATA_VARIABLES.js');

const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home', {layout:false})
}

module.exports.sendEmail = (req, res, next) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const reg = '^((6)|(7))[0-9]{8}$';
  console.log(req.body)

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
              service: 'Gmail',
              auth: {
              user: process.env.EMAILNODEMAILER,
              pass: process.env.NODEMAILERPASS
            }
            });
            transporter.sendMail({
              from: 'BuenAnuncio <dandogasgas@gmail.com>',
              to: emailToUser,
              replyTo: body.email,
              subject: 'Has recibido un mensaje', 
              text: 'Tu anuncio ha sido creado en buenAnuncio.com',
              html: `Has recibido un mensaje a tu anuncio:
              <p>${ad[0].title}</p>
              <p>${ad[0].description}</p>
              <p>Datos de la persona interesada: ${body.name} ${body.phone}</p>
              <p>Mensaje:</p>
              <p>${body.message}</p>`
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

  const {parentCategory, category, state,
  brand, carmodel, priceLow, priceHigh, yearLow,
  yearHigh, km, ccLow, ccHigh, searchWord,
  vendor, vendorType, ageLow, ageHigh } = req.query;
  console.log(req.query)
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
 else if(!parentCategory) {
  // show ALL ads
    if(!state) {
      Promise.all([Ad.find({}), Car.find({}), Contact.find({}), Misc.find({}) ])
        .then(([ads,cars,contacts,misc]) => {
        const adsArray = [...ads, ...cars, ...contacts, ...misc];
        let adsAll = adsArray.sort((a,b) => {return b.renovate - a.renovate})
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);
        return res.render('ads/list', {adsAll, pagination:{page:pageNum,pageCount:getNumberPages(size)}})
        })
        .catch(error => {
          console.log(error)
          next(error)
        })
    }
    // filter only by State
    else if (state) {
      Promise.all([Ad.find({state:getState(state)}), 
        Car.find({state:getState(state)}),
        Misc.find({state:getState(state)}),
        Contact.find({state:getState(state)})])
        .then(([ads,cars,miscs,contacts]) => {
        const adsArray = [...ads, ...cars, ...miscs, ...contacts];
        let adsAll = adsArray.sort((a,b) => {return b.renovate -a.renovate})
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);
        return res.render('ads/list', {adsAll, state, pagination:{page:pageNum,state:state,pageCount:getNumberPages(size)}})
        })
        .catch(error => {
          console.log(error)
          next(error)
        })
    }
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
      'description': ''
    },
    'Para Bebés': {
      'title': miscTitleGlobal, 
      'description': ''
    },
    'Electrodomésticos': {
      'title': miscTitleGlobal, 
      'description': ''
    },
    'Muebles': {
      'title': miscTitleGlobal, 
      'description': ''
    },
    'Ropa': {
      'title': miscTitleGlobal, 
      'description': ''
    },
    'Otros': {
      'title': miscTitleGlobal, 
      'description': ''
    },
    'Contactos Mujeres': {
      'title': 'escorts. Página de putas.', 
      'description': 'Avisos gratis de mujeres scorts. Teléfono de putas en nuestra web.'
    },
    'Contactos Gays': {
      'title': 'para quedar con hombres', 
      'description': 'Avisos gratis de gays y chaperos. Citas y quedadas de hombres.'
    },
    'Contactos Trans': {
      'title': 'para sexo. GRATIS', 
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
    description: createSeoDescription(getAdCategory(category), 'description')
  }

}

module.exports.post = (req,res,next) => {
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

  //CATEGORY MISC
  if(req.params.categoryId > 399) {
    const getCategory = (arg) => {
      const obj = {
        400:'Bricolaje',
        401:'Para Bebés',
        402:'Electrodomésticos',
        403:'Muebles',
        404:'Ropa',
        405:'Otros'
      }
      return obj[arg];
    }
  
    const getState = (arg) => {
      // get object provinces (full!)
      return provinces.objProvinces[arg];
    }
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const renovate = Date();
    const {name,title,description,email,city,vendor, price,phone, vendorType } = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newMiscAd = new Misc ({name,title,description,email,category,vendor,vendorType, state,city,price,renovate,phone, image:{imgPath:imageUpload} })
  
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
            .then(() => 
            res.render('ads/test'))
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
          // comment  => send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: ''
          // }
          // });
          // transporter.sendMail({
          //   from: '"Tu anuncio ha sido publicado 👻" <dandogasgas@gmail.com>',
          //   to: user.email, 
          //   subject: 'Ad creaed', 
          //   text: 'Tu anuncio ha sido creado en buenAnuncio.com',
          //   html: `Título:<b> ${title}</b></br>Descripción:<b> ${description}</b>`
          // })
          // return;
        } else {
          //new user through posting
          console.log(`User ${email} is new user MISC`)
          newMiscAd.save()
          //jump to AUTH.CONTROLLER! - set pass and first ad by first user account//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category}))
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
    const getCategory = (arg) => {
      const obj = {
        300:'Contactos Mujeres',
        301:'Contactos Gays',
        302:'Contactos Trans',
        303:'Contactos Hombres',
        304:'Otros Contactos'
      }
      return obj[arg];
    }
  
    const getState = (arg) => {
      // get object provinces (full!)
      return provinces.objProvinces[arg];
    }
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const renovate = Date();
    const {name,title,description,email,city,age,phone} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newContact = new Contact({name,title,description,email,category,state,city, age,renovate,phone, image:{imgPath:imageUpload} })
  
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
            .then(() => 
            res.render('ads/test'))
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          // comment  => send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: ''
          // }
          // });
          // transporter.sendMail({
          //   from: '"Tu anuncio ha sido publicado 👻" <dandogasgas@gmail.com>',
          //   to: user.email, 
          //   subject: 'Ad creaed', 
          //   text: 'Tu anuncio ha sido creado en buenAnuncio.com',
          //   html: `Título:<b> ${title}</b></br>Descripción:<b> ${description}</b>`
          // })
          // return;
        } else {
          //new user through posting
          console.log(`User ${email} is new user CONTACT`)
          newContact.save()
          //jump to AUTH.CONTROLLER! -set pass and first ad by first user account//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category}))
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
    const getCategory = (arg) => {
      const obj = {
        1:'Servicio Doméstico',
        2:'Camareros',
        3:'Educación',
        4:'Administrativos',
        5:'Otros Empleo'
      }
      return obj[arg];
    }
  
    const getState = (arg) => {
      // get object provinces (full!)
      return provinces.objProvinces[arg];
    }
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const renovate = Date();
    const {name,title,description,email,city,vendor,phone} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newAd = new Ad({name,title,description,email,category,state,city, vendor,renovate,phone, image:{imgPath:imageUpload} })
  
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
            .then(() => 
            res.render('ads/test'))
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          // comment  => send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: ''
          // }
          // });
          // transporter.sendMail({
          //   from: '"Tu anuncio ha sido publicado 👻" <dandogasgas@gmail.com>',
          //   to: user.email, 
          //   subject: 'Ad creaed', 
          //   text: 'Tu anuncio ha sido creado en buenAnuncio.com',
          //   html: `Título:<b> ${title}</b></br>Descripción:<b> ${description}</b>`
          // })
          // return;
        } else {
          //new user through posting
          console.log(`User ${email} is new user MISC`)
          newAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,categoryAd:newAdData.category}))
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
    const getCategory = (arg) => {
      const obj = {
        100:'Coches',
        101:'Todoterrenos',
        110:'Motos'
      }
      return obj[arg];
    }
    
    const getState = (arg) => {
      // get provinces
      return provinces.objProvinces[arg];
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
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const brand = getBrand(req.body.brand);
    const renovate = Date();

    const {name, year, carmodel, km, description, email, city, vendor, phone, price, engine, color, vendorType, fuel, doors, cv} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newCarAd = new Car(
      {name, email, category, state, city, vendor,
      renovate, phone, carmodel, brand, km, year,
      description,
      image:{imgPath:imageUpload},
      price, engine, fuel, color, vendorType,
      doors, cv, fuel
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
            .then(() => res.render('ads/test'))
          })
          .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          // comment => send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: ''
          // }
          // });
          // transporter.sendMail({
          //   from: '"Tu anuncio ha sido publicado 👻" <dandogasgas@gmail.com>',
          //   to: user.email, 
          //   subject: 'Ad creaed', 
          //   text: 'Tu anuncios ha sido creado en buenAnuncio.com',
          //   html: `Título:<b> ${title}</b></br>Descripción:<b> ${description}</b>`
          // })
          // return;
        } else {
          //new user through posting
          console.log(`User ${email} is new user MOTOR`)
          newCarAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => {
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

