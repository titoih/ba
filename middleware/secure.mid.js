module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/usuario/mis-anuncios');
  }
}