module.exports.tos = (req, res, next) => {
  return res.render('legal/tos')
}

module.exports.cookies = (req, res, next) => {
  return res.render('legal/cookies')
}

module.exports.politicaPrivacidad = (req, res, next) => {
  return res.render('legal/privicy')
}

