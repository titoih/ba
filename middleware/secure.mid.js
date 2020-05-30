const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    console.log('is auth')
    next();
  } else {
      console.log('is NOT auth');
      return res.redirect('/mis-anuncios');
  }
}

module.exports.checkRole = (req, res, next) => {

    if (req.session.currentUser) {
      if(req.session.currentUser.role === 'admin') {
        next();
      } else {
        next(createError(403, 'Not enough permission'));
      }
    } else {
      next(createError(403, 'You are not logged'));
    }
  }

module.exports.contactCookie = (req, res, next) => {
  // age contact category restriction
  
  if((req.query.parentCategory === '4' || req.params.parentCategory === 'contactos') && req.cookies.cookieContact === undefined) {
    return res.render('users/age-contact');
  }
  else if(req.query.checkContactCat == 'addContact' && req.cookies.cookieContact === undefined ) {
    return res.render('users/age-contact');
  } else {
      next();
  }

}