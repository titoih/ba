module.exports.urlSeoFriendly = (req, res, next) => {
  console.log('pass')
  console.log(req.params)
  console.log(req.query)

  next();
}