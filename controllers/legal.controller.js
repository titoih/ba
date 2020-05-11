module.exports.tos = (req, res, next) => {
  res.locals.metaTags = {robots:"NOINDEX, NOFOLLOW"};
  return res.render('legal/tos')
}

module.exports.cookies = (req, res, next) => {
  res.locals.metaTags = {robots:"NOINDEX, NOFOLLOW"};
  return res.render('legal/cookies')
}

module.exports.politicaPrivacidad = (req, res, next) => {
  res.locals.metaTags = {robots:"NOINDEX, NOFOLLOW"};
  return res.render('legal/privicy')
}
