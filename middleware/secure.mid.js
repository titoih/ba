module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    console.log('is auth')
    next();
  } else {
    console.log('is NOT auth')
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