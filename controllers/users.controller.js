const Ad = require('../models/ad.model');
const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.myAds = (req, res, next) => {
  User.findOne({email:req.session.currentUser.email})
    .populate({path: 'ad', options: { sort: { 'updated_at': -1 } } })
    .then(ads => {
      res.render('users/my-ads', { ads:ads } )
    })
    .catch(err => next(err))
}

module.exports.editAd = (req, res, next) => {
  const idEdit = req.params.id;
  Ad.findOne({_id:idEdit})
    .then(ad => {
      res.render('users/my-ads-edit', { ad:ad } )
    })
}

module.exports.doEditAd = (req, res, next) => {
  const idEdit = req.params.id;
  Ad.findById({_id:idEdit})
    .then(ad => {
      if(req.session.currentUser.email === ad.email){
        Ad.findByIdAndUpdate(ad.id, req.body, { new: true, runValidators: true })
        .then(() => {
        res.redirect('/usuario')
        })
        .catch(err => next(err))
        } else {
          next(createError(404, 'User not found'))
        }
    })
    .catch(err => next(err))
}

module.exports.updateAd = (req,res,next) => {
  const idRenew = req.params.id;
  // to improve: update only after 23 hours posted
  const updateAd = new Date;
  Ad.findOneAndUpdate({_id:idRenew},{$set:{updated_at:updateAd}})
    .then(ad => {
      if (!ad) {
        next(createError(404, 'User not found'))
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
        next(createError(404, 'User not found'))
      } else {
          if(req.session.currentUser.email === ad.email){
            res.redirect('/usuario')
          }
        }
    })
    .catch(error => next(error));
}