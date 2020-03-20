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

module.exports.list = (req,res,next) => {
  
  const {parentCategory, category, state, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh} = req.query;
 
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

  const findSubcategory = (category) => {
    let findSubcategory = {};
      findSubcategory = {category:getAdCategory(category)};
      return findSubcategory;
  }

  const findState = (state) => {
    let findState = {};
      findState = {state:getState(state)};
      return findState;
  }


  //show parent category
  if(parentCategory) {
    // filter by parent & subcategory
    if(category && !state) {
        modelVariable.find({category:getAdCategory(category)})
        .sort({renovate:-1})
          .then(adsAll => {
            const size = adsAll.length/5;
            adsAll = adsAll.slice(var1,var2);
            // MOTOR ATTR
            if(modelVariable == Car) {
              const nameCategoryMotor = getAdCategory(category)
              // MOTORBIKE - CC
              if (nameCategoryMotor == 'Motos') {
                const carAttr = true;
                // false cclow cchigh
                // start conditions
                if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand)})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category)})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert km - allow km
                  else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), km:{$lte:km}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
                }
  
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // true cclow - false cchigh
                // start conditions
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
                  console.log(ccLow)
                  modelVariable.find({category:getAdCategory(category), engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert km - allow km
                  else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
                  modelVariable.find({category:getAdCategory(category), km:{$lte:km}, engine:{$gte:ccLow}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // false cclow - true cchigh
                // start conditions
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category)})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert km - allow km
                  else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$lte:ccHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), km:{$lte:km}, engine:{$lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // true cclow - true cchigh
                // start conditions
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i')})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category)})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert km - allow km
                  else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow both
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearLow
                else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, yearLow, yearHigh,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}, km:{$lte:km}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow},km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                // insert for YEAR - allow yearHigh
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                    .then(adsAll => {
                      const size = adsAll.length/5;
                      adsAll = adsAll.slice(var1,var2);
                      return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                    })
                    .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
                else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
                  modelVariable.find({category:getAdCategory(category), km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
                  .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                  })
                  .catch(error => console.log(error))
                }
  
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                else {
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, ccHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category} })
                }
              
              
              
              } else {
             const carAttr = true;
              // start conditions
              if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand)})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i')})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i')})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow both
              else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow yearLow
              else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow yearHigh
              else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
                modelVariable.find({category:getAdCategory(category)})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert km - allow km
                else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow both
              else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow yearLow
              else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              // insert for YEAR - allow yearHigh
              else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                  .then(adsAll => {
                    const size = adsAll.length/5;
                    adsAll = adsAll.slice(var1,var2);
                    return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                  })
                  .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
                modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }
              else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
                modelVariable.find({category:getAdCategory(category), km:{$lte:km}})
                .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
                })
                .catch(error => console.log(error))
              }

              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              else {
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
              }
            }
          }

            // AD ATTR
            else if (modelVariable == Ad) {
              return res.render('ads/list', {adsAll,parentCategory,category,empleo, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
            }
            else if (modelVariable == Misc) {
              return res.render('ads/list', {adsAll,parentCategory,category,misc, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
            }
            else if (modelVariable == Contact) {
              return res.render('ads/list', {adsAll,parentCategory,category,contact, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
            }
            else { return 'Error at ads.controller #issueCategorySearch'}
          })
          .catch(error => next(error))
    }
    
    // filter by parent & subcategory && state #2search
    else if(category && state) {
      modelVariable.find({category:getAdCategory(category), state:getState(state)})
      .sort({renovate:-1})
      .then(adsAll => {
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);
        if(modelVariable == Car) {

          const carAttr = true;
          // start conditions
          if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow both
          else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearLow
          else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearHigh
          else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && state) {
            modelVariable.find({category:getAdCategory(category), state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert km - allow km
            else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow both
          else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearLow
          else if(brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category),year:{$gte:yearLow}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearHigh
          else if(brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand),price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow,yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(!brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
              })
              .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(brand && carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), brand:getBrand(brand), carmodel: new RegExp(carmodel,'i'),price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category),year:{$lte:yearHigh}, km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, yearLow, yearHigh, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }
          else if(!brand && !carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && state) {
            modelVariable.find({category:getAdCategory(category), km:{$lte:km}, state:getState(state)})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, brand, carmodel, km, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
            })
            .catch(error => console.log(error))
          }

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          else {
            return res.render('ads/list', {adsAll, parentCategory, category, motor, carAttr, state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state} })
          }


        }
        else if (modelVariable == Ad) {
          return res.render('ads/list', {adsAll,parentCategory,category,empleo,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state}})
        }
        else if (modelVariable == Misc) {
          return res.render('ads/list', {adsAll,parentCategory,category,misc,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state}})
        }
        else if (modelVariable == Contact) {
          return res.render('ads/list', {adsAll,parentCategory,category,contact,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category,state:state}})
        }
        else { return 'Error ads controller #issueFilterState'}
      })
      .catch(error => next(error))
    }
    // filter by parent & state
    else if(!category && state) {
      modelVariable.find({state:getState(state)})
      .sort({renovate:-1})
      .then(adsAll => {
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);
        if(modelVariable == Car) {
          return res.render('ads/list', {adsAll,parentCategory,category,motor,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,state:state}})
        }
        else if (modelVariable == Ad) {
          return res.render('ads/list', {adsAll,parentCategory,category,empleo,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,state:state}})
        }
        else if (modelVariable == Misc) {
          return res.render('ads/list', {adsAll,parentCategory,category,misc,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,state:state}})
        }
        else if (modelVariable == Contact) {
          return res.render('ads/list', {adsAll,parentCategory,category,contact,state, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,state:state}})
        }
        else { return 'Error ads.controller #issueByParentState'}
      })
      .catch(error => next(error))
    }
    // filter by parent
    else if (!category && !state) {
      modelVariable.find({})
      .sort({renovate:-1})
      .then(adsAll => {
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);

        if(modelVariable == Car) {
          return res.render('ads/list', {adsAll,parentCategory,category,motor,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
        }
        else if (modelVariable == Ad) {
          return res.render('ads/list', {adsAll,parentCategory,category,empleo,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
        }
        else if (modelVariable == Misc) {
          return res.render('ads/list', {adsAll,parentCategory,category,misc,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
        }
        else if (modelVariable == Contact) {
          return res.render('ads/list', {adsAll,parentCategory,category,contact,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
        } else {'error at ads.controller #issueFilterByParent'}
      })
      .catch(error => next(error))
    }
  } 

  else if(!parentCategory && !category) {
  // show ALL ads
    if(!state) {
      Promise.all([Ad.find({}), Car.find({}), Contact.find({}), Misc.find({}) ])
        .then(([ads,cars,contacts,misc]) => {
        const adsArray = [...ads, ...cars, ...contacts, ...misc];
        let adsAll = adsArray.sort((a,b) => {return b.renovate - a.renovate})
        const size = adsAll.length/5;
        adsAll = adsAll.slice(var1,var2);
        return res.render('ads/list', {adsAll,pagination:{page:pageNum,pageCount:getNumberPages(size)}})
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

