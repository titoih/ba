const Ad = require('../models/ad.model');
// const User = require('../models/user.model');

module.exports.myAds = (req, res, next) => {
  Ad.find({email:req.session.currentUser.email})
    .sort({_id:-1})
    .then(ads => {
      res.render('users/my-ads', { ads:ads } )
    })
    .catch(err => next(err))
}

module.exports.editAd = (req, res, next) => {
  const idEdit = req.params.id;
  Ad.findOne({_id:idEdit})
    .then(ad => {
      console.log(ad)
      res.render('users/my-ads-edit', { ad:ad } )
    })
}