const Ad = require('../models/ad.model');
const User = require('../models/user.model');
//const nodemailer = require('nodemailer');

module.exports.home = (req,res,next) => {
  res.render('home', {layout:false})
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
  
  // user exist
  User.findOne({email:email})
    .then(user => {
      if(user !== null){
        console.log(`User ${user.email} already exists`)
        newAd.save()
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

        res.render('ads/test')
        return;
      } else {
        //new user through posting
        console.log(`User ${email} is new user`)
        newAd.save()
        res.render('users/postSignup',{email:email})  
      }  
    })
    .catch(err => {next(err)})
}

