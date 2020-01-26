const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const createError = require('http-errors');
const User = require('../models/user.model');

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
            console.log(ad)
            res.render('users/my-ads-edit', { ad:ad } )
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
      res.render('users/my-ads-edit', {
        ad: req.body,
        errors: errors
      })
    }
    
    modelVariable.findById({_id:idEdit})
      .then(ad => {
        if(ad){
          const getBrand = (arg) => {
            const obj = {
              1:'Audi',
              2:'BMW',
              3:'Citroen'
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

    // //look in each ad model

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