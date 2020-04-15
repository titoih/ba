const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const User = require('../models/user.model');
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
  const email = req.params.email;
  Admin.findOne({email:email})
  .then(adsByEmail => {
    if(adsByEmail == null) {
      const lockEmail = new Admin({email});
      lockEmail.save()
    } else {
      Admin.deleteOne({email:email})
        .then(() => {
          console.log('succesfully removed from Lock Email List')
        })
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
}


