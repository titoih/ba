const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');

module.exports.myAds = (req, res, next) => {
  User.findOne({email:req.session.currentUser.email})
    .populate('ad')
    .populate('car')
    .sort({renovate:-1})
    .then(ads => {
      //join all ads in same object to my-ads views
      const arrayUserAds = [...ads.ad,...ads.car];
      const allUserAds = arrayUserAds.sort((a,b) => {return b.renovate -a.renovate})
      res.render('users/my-ads', { ads:allUserAds } )
    })
    .catch(err => next(err))
}

module.exports.editAd = (req, res, next) => {
  const idEdit = req.params.id;
  User.findOne({email:req.session.currentUser.email})
    .then(user => {
      const findAdModel = user.ad;
      const findCarModel = user.car;
      var modelVariable;
      // //look in each ad model
      if(findAdModel.includes(idEdit)) {
        modelVariable = Ad;
      }
      else if(findCarModel.includes(idEdit)) {
        modelVariable = Car;
      }
      //error if no ads or not user verified
      modelVariable.findOne({_id:idEdit})
        .then(ad => {
          if (!ad) {
            next(createError(404, 'Anuncio no encontrado'))
          } else {
              let brandSelect;
                switch(ad.category) {
                  case 'Motos':
                  brandSelect = 'motos';
                  break;
                  case 'Coches':
                  brandSelect = 'coches'; 
                  break;
                  default:
                  console.log('something goes wrong check users.controller ad.category');
                }
              res.render('users/my-ads-edit', { ad:ad,[brandSelect]:brandSelect} )
            }
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
}

module.exports.doEditAd = (req, res, next) => {

  const idEdit = req.params.id;

  User.findOne({email:req.session.currentUser.email})
    .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(idEdit)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idEdit)) {
      modelVariable = Car;
    }

    function renderWithErrors(errors) {
      req.body.id = idEdit;
      if(req.body.brand == '') {
        req.body.brand = 'Elige Marca'
      }
      let brandSelect;
        switch(req.body.category) {
          case 'Motos':
          brandSelect = 'motos';
          break;
          case 'Coches':
          brandSelect = 'coches'; 
          break;
          case 'Servicio Doméstico':
          brandSelect = 'servicio domestico';
          default:
          console.log('something went wrong in user.controller renderwitherrors');
        }
      res.render('users/my-ads-edit', {
        ad: req.body,
        [brandSelect]:brandSelect,
        errors: errors
      })
    }
    
    modelVariable.findById({_id:idEdit})
      .then(ad => {
        if(ad){
          const getBrand = (arg) => {
            const obj = {
              '':'',
              1:'Audi',
              2:'BMW',
              3:'Citroen',
              10: 'Honda',
              20: 'Ducati',
              30: 'Yamaha'
            }
            return obj[arg];
          }

          const brand = getBrand(req.body.brand);
          req.body.brand = brand;
          modelVariable.findByIdAndUpdate(ad.id, req.body, { new: true, runValidators: true })
          .then(() => {
            res.redirect('/usuario')
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              console.log('error')
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          } else {
            next(createError(404, '¿Estás conectado a tu cuenta?'))
          }
      })
      .catch(err => next(err))
  })
  .catch(error => next(error))
}

module.exports.editPhotosAd = (req, res, next) => {
  const id = req.params.id;
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(id)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(id)) {
      modelVariable = Car;
    }
    modelVariable.findOne({_id:id})
    .then(ad => {
      res.render('users/my-ads-photos', { ad:ad } )
    })
    .catch(error => next(error))
  })
  .catch(error => next(error))
}

module.exports.addPhotosAd = (req, res, next) => {
  const id = req.params.id;
  const addImages = [];
  req.files.map(eachPath => addImages.push(`uploads/${eachPath.filename}`))
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(id)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(id)) {
      modelVariable = Car;
    }

    modelVariable.updateOne({_id:id}, {$push:{'image.imgPath':{$each:addImages}}})
      .then(()=> {
        res.redirect(`/usuario/editar-fotos/${id}`)
      })
      .catch(error => error)
  })
  .catch(error => next(error))
}

module.exports.deletePhotoAd = (req, res, next) => {
  const id = req.params.id;
  const photoName = `uploads/${req.params.photoPath}`;
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    var modelVariable;
    //look in each ad model
    if(findAdModel.includes(id)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(id)) {
      modelVariable = Car;
    }
    modelVariable.findByIdAndUpdate({_id:id},{$pull:{'image.imgPath':photoName}})
    .then( () => {
      res.redirect(`/usuario/editar-fotos/${id}`)
    })
    .catch(error => next(error))
  })
  .catch(error => next(error))
}

module.exports.updateAd = (req,res,next) => {
  const idRenew = req.params.id;

  User.findOne({email:req.session.currentUser.email})
    .then(user => {
      const findAdModel = user.ad;
      const findCarModel = user.car;
      var modelVariable;

      //look in each ad model
      if(findAdModel.includes(idRenew)) {
        modelVariable = Ad;
      }
      else if(findCarModel.includes(idRenew)) {
        modelVariable = Car;
      }
      // to improve: update only after 23 hours posted
      const updateAd = new Date;
      modelVariable.findById({_id:idRenew})
        .then(adData => {
          const hoursToRenew = new Date().getTime() - new Date(adData.renovate).getTime();
          if(hoursToRenew >= 50400000) {
            modelVariable.findOneAndUpdate({_id:idRenew},{$set:{renovate:updateAd}})
            .then(ad => {
              if (!ad) {
                next(createError(404, 'Anuncio no encontrado'))
              } else {
                  if(req.session.currentUser.email === ad.email){
                    res.redirect('/usuario')
                  }
                }
            })
            .catch(error => next(error));
          } 
          else {
            res.redirect('/usuario')
          } 
        })
        .catch(error => next(error))
      
    })
    .catch(error => next(error))
}

module.exports.doDeleteAd = (req, res, next) => {
  const idDelete = req.params.id;

  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    var modelVariable;

    // look in each ad model

    if(findAdModel.includes(idDelete)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idDelete)) {
      modelVariable = Car;
    }

    modelVariable.findByIdAndDelete(idDelete)
      .then(ad => {
        if (!ad) {
          next(createError(404, 'Anuncio no encontrado'))
        } else {
            res.redirect('/usuario')
          }
      })
      .catch(error => next(error));
  })
  .catch(error => next(error));
}

module.exports.password = (req, res, next) => {
  const email = req.session.currentUser.email;
  res.render('users/update-password', {user:email})
}

module.exports.doPassword = (req, res, next) => {
  const bcryptSalt = 10;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password,salt);
  const email = req.session.currentUser.email;
  if(req.body.email === email) {
    if (password === "") {
      res.render("users/update-password", {
        errorMessage: "La contraseña no puede estar vacía",
        user:email
      });
      return;
    }

    User.updateOne({email:email}, {$set:{password:hashPass}})
    //need improvement user not exists, password too short
      .then(() => {
        res.redirect('/usuario')
      })
      .catch(error => next(error))
  } else {
    res.redirect('/usuario')
    return;
  }
}

module.exports.passwordRecovery = (req, res, next) => {
  res.render('users/recovery-password')
}

module.exports.doPasswordRecovery = (req, res, next) => {
  const user = req.body.email;
  User.findOne({email:user})
    .then(userData => {
      //user doesn't exists: need to improve security
      if(!userData) {
        res.render('users/recovery-password',{errorMessage:'Parece que no existe este email'})
      } else {
        //JWT - token
        const payload = {
          id:userData._id,
          email:userData.email
        }
        const secret = `${userData.password}-${userData.updated_at}`;
        const token = jwt.encode(payload, secret)

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
          user: 'dandogasgas@gmail.com',
          pass: process.env.NODEMAILERPASS
        }
        });
        transporter.sendMail({
          from: '"Establece tu clave" <dandogasgas@gmail.com>',
          to: userData.email, 
          subject: 'Clave Buenanuncio.com', 
          html: `Pulsa en el siguiente enlace para cambiar tu clave:
                 <a href="http://localhost:3000/usuario/modificar-clave/${payload.id}/${token}">Reset Password</a>`
        })
        res.render('users/recovery-password',{successMessage: 'Hemos enviado un correo a tu cuenta'})
      }
    })
    .catch (error => next(error))
  
}

module.exports.passwordModification = (req, res, next) => {
  const id = req.params.id;
  const token = req.params.token
  res.render('users/modification-password',{id,token})
}

module.exports.doPasswordModification = (req, res, next) => {
  const userId = req.params.id;
  const bcryptSalt = 10;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password,salt);

  User.findById({_id:userId})
    .then(userData => {
      const secret = `${userData.password}-${userData.updated_at}`;
      const payload = jwt.decode(req.params.token, secret);
      //maybe need security to improve
      User.updateOne({email:payload.email}, {$set:{password:hashPass}})
      .then(() => {
        res.redirect('/usuario')
      })
      .catch(error => next(error))
    })
    .catch(error => next(error))
}
