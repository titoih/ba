const Ad = require('../models/ad.model');
const Car = require('../models/car.model');

module.exports.adminDelete = (req, res, next) => {
  const categoryModel = req.params.parentCategory;
  const idDelete = req.params.id;
  const modelVariable = (arg) => {
    const obj = {
      1:Car,
      2:Ad
    }
    return obj[arg];
  }

  modelVariable(categoryModel).findByIdAndDelete(idDelete)
    .then(() => console.log('OK'))
    .catch(error => next(error))
}


