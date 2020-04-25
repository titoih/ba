const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const Admin = require('../models/admin.model');

module.exports.adminDelete = (req, res, next) => {
  const categoryModel = req.params.parentCategory;
  const idDelete = req.params.id;
  const modelVariable = (arg) => {
    const obj = {
      1:Car,
      2:Ad,
      3:Misc,
      4:Contact
    }
    return obj[arg];
  }

  modelVariable(categoryModel).findByIdAndDelete(idDelete)
    .then(() => console.log('OK'))
    .catch(error => next(error))
}

module.exports.adminLock = (req, res, next) => {
  const param = {};
  console.log(req.params)
  param[req.params.typeParam] = req.params.adminParams;

  Admin.findOne(param)
  .then(adsByEmail => {
    if(adsByEmail == null) {
      const lockEmail = new Admin(param);
      lockEmail.save()
    } else {
      Admin.deleteOne(param)
        .then(() => {
          console.log('successfully removed from Lock Email List')
        })
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
}

