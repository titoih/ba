const Ad = require('../models/ad.model');
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
  res.render('ads/post-second-step',{categoryId:categoryId})
}

module.exports.doPost = (req,res,next) => {
  console.log(req.file)

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

  const {name,title,description,email,type,phone} = req.body;
  
  const imageUpload = `uploads/${req.file.filename}`

  const newAd = new Ad({name,title,description,email,category,city,type,phone, image:{imgPath:imageUpload} })

  //handle errors post ad second step
  const errorIdCategory = req.params.categoryId;
  const errorIdCity = req.body.city;
  const errorBody = {name,title,description,email,errorIdCategory,errorIdCity,type,phone}

  //check mongoose err
  if((phone !== '' && phone.length !== 9) || req.body.city == ''){
    const errors = {};
    if (phone.length !== 9 && phone !== '') {
      errors.errorMessagePhone = "El teléfono debe contener 9 dígitos";
    }
    if (req.body.city == '') {
      errors.errorMessageCity = "Elige tu provincia";
    }
    res.render("ads/post-second-step", {
      errors: errors,
      errorBody:errorBody
    });
    return;
  }
 
  // if user exist => ad new ad_id //if not => create user and ad new ad_id
  User.findOne({email:email})
    .then(user => {
      if(user !== null){
        console.log(`User ${user.email} already exists`)
        newAd.save()
        .then(ad => {
          User.updateOne({email:ad.email},{$push:{ad:ad._id}})
          .then(()=> res.render('ads/test')
          // .catch(err => next(err))
          )
        })
        .catch(err => next(err))
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
        return;
      } else {
        //new user through posting
        console.log(`User ${email} is new user`)
        newAd.save()
        //jump to AUTH.CONTROLLER!//
        .then(newAdData => res.render('users/postSignup',{email:newAdData.email,id:newAdData._id}))
        .catch(err => next(err))  
      }  
    })
    .catch(err => {next(err)})
}

