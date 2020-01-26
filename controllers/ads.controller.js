const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const User = require('../models/user.model');

//const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home', {layout:false})
}

module.exports.list = (req,res,next) => {
  
  const {parentCategory, category, state} = req.query;

  const getModel = (arg) => {
    const obj = {
      1:Car,
      2:Ad
    }
    return obj[arg];
  }

  const getAdCategory = (arg) => {
    const obj = {
      1:'Servicio Doméstico',
      2:'Cocineros-Camareros',
      3: 'Casa y Jardín',
      100: 'Coches',
      110: 'Motos'
    }
    return obj[arg];
  }

  const getCarCategory = (arg) => {
    const obj = {
      1: 'Coches',
      2: 'Motos'
    }
    return obj[arg];
  }

  const getState= (arg) => {
    const obj = {
      1: 'Madrid',
      2: 'Barcelona',
      3: 'Valencia'
    }
    return obj[arg];
  }

  const modelVariable = getModel(parentCategory);
  const motor = 1;
  const empleo = 2;

  //show parent category
  if(parentCategory) {
    if(category && !state) {

    modelVariable.find({})
      .then(adsAll => {
        if(modelVariable == Car) {
          return res.render('ads/list', {adsAll,parentCategory,category,motor})
        }
        else if (modelVariable == Ad) {
          return res.render('ads/list', {adsAll,parentCategory,category,empleo})
        }
        else { return 'Error'}
      })
      .catch(error => next(error))
    }
    else if(category && state) {
      //need to filter by category before state
      modelVariable.find({state:getState(state)})
      .then(adsAll => {
        return res.render('ads/list', {adsAll,parentCategory,category,motor})
      })
    }
  } 


  //show all ads
  else if(!parentCategory && !category) {
    if(!state) {
      Promise.all([Ad.find({}), Car.find({})])
        .then(([ads,cars]) => {
        const adsArray = [...ads, ...cars];
        const adsAll = adsArray.sort((a,b) => {return b.updated_at -a.updated_at})
        return res.render('ads/list', {adsAll})
        })
        .catch(error => next(error))
    }
    else if (state) {
      Promise.all([Ad.find({state:getState(state)}), Car.find({state:getState(state)})])
        .then(([ads,cars]) => {
        const adsArray = [...ads, ...cars];
        const adsAll = adsArray.sort((a,b) => {return b.updated_at -a.updated_at})
        return res.render('ads/list', {adsAll})
        })
        .catch(error => next(error))
    }
  }
  
}

module.exports.post = (req,res,next) => {
  res.render('ads/post-first-step',)
}

module.exports.postSecond = (req,res,next) => {
  const categoryId = req.params.categoryId;
  if(categoryId == 1) {
  res.render('ads/post-second-step',{categoryId:categoryId})
  } else {
    res.render('ads/car-post-second-step',{categoryId:categoryId})
  }
}

module.exports.doPost = (req,res,next) => {
  //category misc
  if(req.params.categoryId < 100) {
    const getCategory = (arg) => {
      const obj = {
        1:'Servicio Doméstico',
        2:'Cocineros-Camareros',
        3:''
      }
      return obj[arg];
    }
  
    const getState = (arg) => {
      const obj = {
        1:'Madrid',
        2:'Barcelona',
        3:'Valencia'
      }
      return obj[arg];
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
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          //send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: 'numero@123'
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
          console.log(`User ${email} is new user`)
          newAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,category:newAdData.category}))
          .catch(error => {
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

  if(req.params.categoryId > 99) {
    const getCategory = (arg) => {
      const obj = {
        100:'Coches',
        110:'Motos'
      }
      return obj[arg];
    }
  
    const getState = (arg) => {
      const obj = {
        1:'Madrid',
        2:'Barcelona',
        3:'Valencia'
      }
      return obj[arg];
    }

    const getBrand = (arg) => {
      const obj = {
        1:'Audi',
        2:'BMW',
        3:'Citroen'
      }
      return obj[arg];
    }
    const category = getCategory(req.params.categoryId);
    const state = getState(req.body.state);
    const brand = getBrand(req.body.brand);
    const renovate = Date();

    const {name, year, carmodel, km, description, email, city, vendor, phone} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newCarAd = new Car({name, email, category, state, city, vendor,renovate, phone, carmodel, brand, km, year, description, image:{imgPath:imageUpload} })
  
    req.body.category = req.params.categoryId;
    //handle errors post ad second step
    function renderWithErrors(errors) {
      res.render('ads/car-post-second-step', {
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
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          //send email nodemailer: active, reset password
  
          // let transporter = nodemailer.createTransport({
          //   service: 'Gmail',
          //   auth: {
          //   user: 'dandogasgas@gmail.com',
          //   pass: 'numero@123'
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
          console.log(`User ${email} is new user`)
          newCarAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id,category:newAdData.category}))
          .catch(error => {
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

