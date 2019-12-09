const Ad = require('../models/ad.model');
const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home')
}

module.exports.list = (req,res,next) => {
  Ad.find({})
  .sort({_id:-1})
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
  //console.log(categoryId)
  res.render('ads/post-second-step',{categoryId:categoryId})
}

module.exports.doPost = (req,res,next) => {
  const getCategory = (arg) => {
    const obj = {
      1:'Empleo',
      2:'Contactos',
      3:'Casa y Jardín'
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
    
  const {name,title,description,email,type} = req.body;

  const newAd = new Ad({name,title,description,email,category,city,type})
  
  // new user to sign up or just ad confirmation
  Ad.findOne({email:email})
    .then(dataUser => {
      if(dataUser){
        console.log(`User ${dataUser.email} already exists`)
        newAd.save()
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
          user: 'dandogasgas@gmail.com',
          pass: 'numero@123'
        }
        });
        transporter.sendMail({
          from: '"Tu anuncio ha sido publicado 👻" <dandogasgas@gmail.com>',
          to: dataUser.email, 
          subject: 'Ad creaed', 
          text: 'You just created your ad in buenAnuncio.com',
          html: `Título de tu anuncio: <b>${title}</b></br>Descripción:<b>${description}</b>`
        })
        res.render('ads/test')
      } else {
        console.log(`User ${email} first ad posted it`)
        newAd.save()
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
          user: 'dandogasgas@gmail.com',
          pass: 'numero@123'
        }
        });
        transporter.sendMail({
          from: '"Bienvenido a buenAnuncio.com" <dandogasgas@gmail.com>',
          to: email, 
          subject: 'Crea tu cuenta', 
          text: 'Crea tu usuario para acceder a tus anuncios.',
          html: `Pulsa este enlace para crear tu usuario y contraseña <a href="/mis-anuncios">aquí</a>`
        })
        res.render('ads/test')
      }  
    })
    .catch(err => next(err))

  // newAd.save()
  //   .then(adData => {
      
  //     // let transporter = nodemailer.createTransport({
  //     //   service: 'Gmail',
  //     //   auth: {
  //     //     user: 'dandogasgas@gmail.com',
  //     //     pass: 'numero@123'
  //     //   }
  //     // });
  //     // transporter.sendMail({
  //     //   from: '"My Awesome Project 👻" <info@buenAnuncio.com>',
  //     //   to: email, 
  //     //   subject: 'Ad creaed', 
  //     //   text: 'You just created your ad in buenAnuncio.com',
  //     //   html: `<b>Awesome ad, with title ${title}</b>`
  //     // })
  //     res.render('ads/test')
  //   })
  //   .catch(err => next(err))
}

module.exports.myAds = (req, res, next) => {
  res.render('ads/my-ads')
}