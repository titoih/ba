const Ad = require('../models/ad.model');
const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.myAds = (req, res, next) => {
  User.find({email:req.session.currentUser.email})
    .populate('ad')
    .sort({_id:-1})
    .then(ads => {
      console.log(ads)
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

module.exports.doDeleteAd = (req, res, next) => {
  const idDelete = req.params.id;
  console.log(idDelete)
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