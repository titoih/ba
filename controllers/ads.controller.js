const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const User = require('../models/user.model');

//const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home', {layout:false})
}

module.exports.list = (req,res,next) => {
  Ad.find({})
  .sort({updated_at:-1})
  .then(ads => {
    res.render('ads/list', {ads:ads})
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
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
  
    const getCity = (arg) => {
      const obj = {
        1:'Madrid',
        2:'Barcelona',
        3:'Valencia'
      }
      return obj[arg];
    }
    const category = getCategory(req.params.categoryId);
    const city = getCity(req.body.city);
  
    const {name,title,description,email,type,phone} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newAd = new Ad({name,title,description,email,category,city,type,phone, image:{imgPath:imageUpload} })
  
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
          newAd.save()
          //jump to AUTH.CONTROLLER!//
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id}))
          .catch(error => {
            console.log('errorPost3')
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
  
    const getCity = (arg) => {
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
    const city = getCity(req.body.city);
    const brand = getBrand(req.body.brand);

    const {name, year, model, km, description, email, type, phone} = req.body;
    
    const imageUpload = [];
    req.files.map(eachPath => imageUpload.push(`uploads/${eachPath.filename}`))
  
    const newCarAd = new Car({name, email, category, city, type, phone, model, brand, km, year, description, image:{imgPath:imageUpload} })
  
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
          .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id}))
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

