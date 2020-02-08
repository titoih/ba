module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/mis-anuncios');
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