const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const Admin = require('../models/admin.model');

// scraper
const User = require('../models/user.model');
const fs = require('fs');
const axios = require('axios');
const $ = require('cheerio', { decodeEntities: true });
//

module.exports.phoneInput = (req, res, next) => {
  res.send(`
  <p>Introduce teléfono o palabra clave</p>

  <form method="POST" action="scraper">
  <input required name="name" type="text" placeholder="NAME">
  <input required name="keyword" type="text" placeholder="KEYWORD">
  <input required name="email" type="text" placeholder="EMAIL">
  <input type="submit">
  </button>
  </form>
  `)
}

module.exports.carScraper = (req, res, next)=>{

  const keyword = req.body.keyword;
  const email = req.body.email;
  const name = req.body.name;

  const url = `https://www.milanuncios.com/coches-de-segunda-mano/${keyword}.htm`;
  
  const adArray = [];
  
  const axiosData = axios.get(url,{responseType: 'arraybuffer',responseEncoding: 'binary'})
      .then(result => {
          $('.aditem', result.data.toString('binary')).map((i,element) => {
              function checkCVinTitle (cv, carmodel) {
                  const cvNoSpace = cv.replace(' ', '');
                  if(carmodel){
                      if(carmodel.includes(cv.toUpperCase())) {
                          createAdObject.carmodel = carmodel.replace(cv.toUpperCase(),''); 
                      } 
                      else if(carmodel.includes(cvNoSpace.toUpperCase())){
                          createAdObject.carmodel = carmodel.replace(cvNoSpace.toUpperCase(),''); 
                      }
                      else {
                          // console.log('no model')
                      }
                      return createAdObject.carmodel;
                  }
              }
              const capitalize = (str, lower = false) =>
              (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
                  
                  const createAdObject = {};
                  
                  // customer data 
                  createAdObject.category = 'Coches';
                  createAdObject.name = name;
                  createAdObject.email = email;
                  createAdObject.renovate = Date();
                  createAdObject.phone = `919151702`;
                  // fixed data
                  createAdObject.ip = `::1`;
                  createAdObject.ua = `localhost`;
                  createAdObject.co = `localhost`;
                  // cheerio variables for each parametter
                  const titleAndModel = $('.aditem-detail-title', element).text();
                  const brandAndPlace = $('.display-desktop.list-location-link', element).text();
                  const cv = $('.cc.tag-mobile', element).text();
                  const location = $('.list-location-region', element).text();
                  // const transmision = $('.cmanual.tag-mobile', element).text();
                  const fuel = $('.gas.tag-mobile', element).text() ? $('.gas.tag-mobile', element).text() : $('.die.tag-mobile', element).text();
                  const km = $('.kms.tag-mobile', element).text();
                  const year = $('.ano.tag-mobile', element).text();
                  const doors = $('.ejes.tag-mobile', element).text();
                  const description = $('.tx', element).text();
                  const price = $('.aditem-price', element).text();
                  const vendorType = $('.pillDiv.pillSellerTypePro', element).text();
                  const maReference = $('.x5', element).text();
                  const vendor = $('.x3', element).text();
  
                      createAdObject.title = titleAndModel.split(' - ')[0];
                      createAdObject.cv = cv.replace(/[\s,cv]/g,'');
                      createAdObject.carmodel = titleAndModel.split(' - ')[1];
                      checkCVinTitle(cv, createAdObject.carmodel);
                      createAdObject.brand = brandAndPlace.split(' de segunda mano en ')[0];
                      createAdObject.city = brandAndPlace.split(' de segunda mano en ')[1];
                      createAdObject.state = capitalize(location);
                      // createAdObject.transmision = transmision;
                      createAdObject.fuel = fuel.charAt(0).toUpperCase() + fuel.slice(1);
                      createAdObject.km = km ? parseInt(km.replace(/[\.]/, '')) : null;
                      createAdObject.year = year ? parseInt(year.split(' ')[1]) : null;
                      createAdObject.price = price ? parseInt(price.replace(/[\.,€]/, '')) : null;
                      createAdObject.doors = doors.replace(' puertas', '');
                      createAdObject.description = description.replace(/\n/gi, ' ');
                      createAdObject.description = createAdObject.description.replace(' ... Leer más', '')
                      createAdObject.vendorType = vendorType ? vendorType : 'Particular';
                      createAdObject.maReference = maReference.replace(/\s/g,'');
                      createAdObject.vendor = vendor;
                      createAdObject.image = {imgPath:[]};
                      // clean uncompatibilities
                      createAdObject.brand == 'Mercedes benz' ? createAdObject.brand = 'Mercedes-Benz': createAdObject.brand 
                      //
                      vendor == 'OFERTA' ? createAdObject.brand != 'Scooters' ? adArray.push(createAdObject)  : '' : '';
          })
      })
      return Promise.all([axiosData])
      .then(() => {
          let promises = [];
          const averageImage = 10;
          const fullAdArray = adArray.map( element => {
              for(let i=1; i < averageImage; i++){
                  const image = `https://img.milanuncios.com/fg/${element.maReference.slice(1,5)}/${element.maReference.slice(5,7)}/${element.maReference.substr(1)}_${i}.jpg`;
                      promises.push(axios.get(image,{responseType: "stream"})
                          .then(response => {
                              if(response.status == 200){
                                  response.data.pipe(fs.createWriteStream(`./public/uploads/buenanuncio-${element.maReference}_${i}.jpeg`));
                                  element.image.imgPath.push(`uploads/buenanuncio-${element.maReference}_${i}.jpeg`)
                              } 
                          })
                          .catch(error => error)
                      )
              }
              return Promise.all(promises)
              .then(() => element)
          })
          return Promise.all(fullAdArray);
      })
      .then(result => {
          return Car.create(result)
              .then(adscreated => {
                  console.log(adscreated)
                  console.log(`Ads created successfully: ${adscreated.length}`)
                  return adscreated;
              })
              .catch(error => console.log(error))
              .then(adscreated => {
                  return Car.find({email:adscreated[0].email})
                  .then(adscreated => {
                      const getIdMap= adscreated.map(element => element._id)
                      return getIdMap;
                  })
                  .then(getIdMap => {
                      return User.findOne({email:adscreated[0].email})
                      .then(user => {
                          if(user) {
                              return User.updateOne({email:adscreated[0].email}, {car:[]})
                                  .then(updatedResult => {
                                      console.log(`Successfully reset car array result:`)
                                      console.log(updatedResult)
                                      // fullfill car array with objectid
                                      return User.updateOne({email:adscreated[0].email}, {$push:{car:getIdMap}})
                                             .then(() => {
                                                 console.log(`Successfully updated user account with new ads`);
                                                 res.send(`Success: <b>${adscreated.length}</b> ads added!` );
                                              })
                                             .catch(error => console.log(`somthing wrong updating user account with new ads`, error))
                                  })
                                  .catch(error => console.log(error))
                          } else {
                              const userObj = {
                                  role: 'guess',
                                  ad:[],
                                  car:[],
                                  misc: [],
                                  email: adscreated[0].email,
                                  password:'$2b$10$0tVDA6/bc9TT.s0Rg8p3S.d7pVKftuO25t94PllkgOb9ivjqPr3Qm',
                              }
                              return User.create(userObj)
                                  .then(newUser => {
                                      return User.updateOne({email:adscreated[0].email}, {$push:{car:getIdMap}})
                                              .then(() => {
                                                  console.log(`Successfully New User created: ${newUser.email}`);
                                                  res.send(`Success: <b>${adscreated.length}</b> ads added to NEW USER: ${adscreated[0].email}!` );
                                              })
                                              .catch(error => console.log(`something went wrong in new user creation`, error))
                                  })
                                  .catch(error => console.log(error))
                          }
                      })
                      .catch(error => error);
                  })
                  .catch(error => error);
              })
              .catch(error => error)
          })
      .catch(error => console.log(error))
  }

module.exports.adminDelete = (req, res, next) => {
  const categoryModel = req.params.parentCategory;
  const idDelete = req.params.id;
  const modelVariable = (arg) => {
    const obj = {
      1:Car,
      2:Ad,
      3:Misc,
      4:Contact
    }
    return obj[arg];
  }

  modelVariable(categoryModel).findByIdAndDelete(idDelete)
    .then(() => console.log('OK'))
    .catch(error => next(error))
}

module.exports.adminLock = (req, res, next) => {
  const param = {};
  console.log(req.params)
  param[req.params.typeParam] = req.params.adminParams;

  Admin.findOne(param)
  .then(adsByEmail => {
    if(adsByEmail == null) {
      const lockEmail = new Admin(param);
      lockEmail.save()
    } else {
      Admin.deleteOne(param)
        .then(() => {
          console.log('successfully removed from Lock Email List')
        })
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
}

