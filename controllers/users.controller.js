const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.myAds = (req, res, next) => {
  User.findOne({email:req.session.currentUser.email})
    .populate('ad')
    .populate('car')
    .sort({createdAt:-1})
    .then(ads => {
      //join all ads in same object to my-ads views
      const arrayUserAds = [...ads.ad,...ads.car];
      const allUserAds = arrayUserAds.sort((a,b) => {return b.updated_at -a.updated_at})
      res.render('users/my-ads', { ads:allUserAds } )
    })
    .catch(err => next(err))
}

module.exports.editAd = (req, res, next) => {
  const idEdit = req.params.id;
  Ad.findOne({_id:idEdit})
    .then(ad => {
      if(ad){
        res.render('users/my-ads-edit', { ad:ad } )
      } else {
        Car.findOne({_id:idEdit})
          .then(car => {
            res.render('users/my-ads-edit', { ad:car } )
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
}

module.exports.doEditAd = (req, res, next) => {
  const idEdit = req.params.id;

  function renderWithErrors(errors) {
    req.body.id = idEdit;
    res.render('users/my-ads-edit', {
      ad: req.body,
      errors: errors
    })
  }
  Ad.findById({_id:idEdit})
    .then(ad => {
      if(req.session.currentUser.email === ad.email){
        Ad.findByIdAndUpdate(ad.id, req.body, { new: true, runValidators: true })
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
}

module.exports.editPhotosAd = (req, res, next) => {
  const id = req.params.id;
  Ad.findOne({_id:id})
    .then(ad => {
      res.render('users/my-ads-photos', { ad:ad } )
    })
    .catch(error => next(error))
}

module.exports.addPhotosAd = (req, res, next) => {
  const id = req.params.id;
  const addImages = [];
  req.files.map(eachPath => addImages.push(`uploads/${eachPath.filename}`))
  Ad.updateOne({_id:id}, {$push:{'image.imgPath':{$each:addImages}}})
    .then(()=> {
      res.redirect(`/usuario/editar-fotos/${id}`)
    })
    .catch(error => error)
}

module.exports.deletePhotoAd = (req, res, next) => {
  const id = req.params.id;
  const photoName = `uploads/${req.params.photoPath}`;
  console.log(photoName);
  Ad.findByIdAndUpdate({_id:id},{$pull:{'image.imgPath':photoName}})
    .then( () => {
      res.redirect(`/usuario/editar-fotos/${id}`)
    })
    .catch(error => next(error))
}

module.exports.updateAd = (req,res,next) => {
  const idRenew = req.params.id;
  // to improve: update only after 23 hours posted
  const updateAd = new Date;
  Ad.findOneAndUpdate({_id:idRenew},{$set:{updated_at:updateAd}})
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

module.exports.doDeleteAd = (req, res, next) => {
  const idDelete = req.params.id;
  Ad.findByIdAndDelete(idDelete)
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