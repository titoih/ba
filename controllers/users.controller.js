const Ad = require('../models/ad.model');
const User = require('../models/user.model');


module.exports.myAds = (req, res, next) => {
  Ad.find({email:req.session.currentUser.email})
    .then(ads => {
      res.render('users/my-ads', { ads:ads } )
    })
    .catch(err => next(err))
}