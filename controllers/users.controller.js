const Ad = require('../models/ad.model');

module.exports.signup = (req, res, next) => {
  res.render('users/signup')
}

// module.exports.doSignup = (req, res, next) => {

//   res.render('users/signup')
// }