const mongoose = require('mongoose');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const emailTemplate = require('../emailTemplate.js')

module.exports.myAds = (req, res, next) => {
  const getNumberPages = (n) => {
    return Math.ceil(n,1);
  }
  let pageNum = req.query.page;
  let var1 = 0;
  let var2 = 5;
    if(pageNum) {
        var1 = var2 * (Number(pageNum) -1 );
        var2 = var1 + 5;

    } else {
      pageNum = 1;
      var1 = 0;
      var2 = 5;
      console.log('there is no req.params.page => #issuePagination')
    }

  User.findOne({email:req.session.currentUser.email})
    .populate('ad')
    .populate('car')
    .populate('contact')
    .populate('misc')
    .sort({renovate:-1})
    .then(ads => {
      //join all ads in same object to my-ads views
      const arrayUserAds = [...ads.ad,...ads.car, ...ads.contact, ...ads.misc];
      let allUserAds = arrayUserAds.sort((a,b) => {return b.renovate -a.renovate})
      const size = allUserAds.length/5;
      allUserAds = allUserAds.slice(var1,var2);
      res.render('users/my-ads', { ads:allUserAds, pagination:{page:pageNum,pageCount:getNumberPages(size)} } )
    })
    .catch(err => next(err))
}

module.exports.editAd = (req, res, next) => {
  const idEdit = req.params.id;
  User.findOne({email:req.session.currentUser.email})
    .then(user => {
      const findAdModel = user.ad;
      const findCarModel = user.car;
      const findMiscModel = user.misc;
      const findContactModel = user.contact;
      var modelVariable;
      // //look in each ad model
      if(findAdModel.includes(idEdit)) {
        modelVariable = Ad;
      }
      else if(findCarModel.includes(idEdit)) {
        modelVariable = Car;
      }
      else if(findContactModel.includes(idEdit)) {
        modelVariable = Contact;
      }
      else if(findMiscModel.includes(idEdit)) {
        modelVariable = Misc;
      } else {
        console.error('something wrong user.controoller.js at editAd')
      }
      //error if no ads or not user verified
      modelVariable.findOne({_id:idEdit})
        .then(ad => {
          if (!ad) {
            next(createError(404, 'Anuncio no encontrado'))
          } else {
              let brandSelect;
                switch(ad.category) {
                  case 'Motos':
                  brandSelect = 'motos';
                  break;
                  case 'Coches':
                  brandSelect = 'coches'; 
                  case 'Todoterrenos':
                  brandSelect = 'coches'; 
                  break;
                  case 'Bricolaje':
                  brandSelect = 'misc';
                  break;
                  case 'Para Bebés':
                  brandSelect = 'misc';
                  break;
                  case 'Electrodomésticos':
                  brandSelect = 'misc';
                  break;
                  case 'Muebles':
                  brandSelect = 'misc';
                  break;
                  case 'Ropa':
                  brandSelect = 'misc';
                  break;
                  case 'Otros':
                  brandSelect = 'misc';
                  break;
                  case 'Contactos Mujeres':
                  brandSelect = 'contactos';
                  break;
                  case 'Contactos Gays':
                  brandSelect = 'contactos';
                  break;
                  case 'Contactos Trans':
                  brandSelect = 'contactos';
                  break;
                  case 'Contactos Hombres':
                  brandSelect = 'contactos';
                  break;
                  case 'Otros Contactos':
                  brandSelect = 'contactos';
                  break;
                  default:
                  console.log('something wrong check users.controller ad.category');
                }
              res.render('users/my-ads-edit', { ad:ad,[brandSelect]:brandSelect} )
            }
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
}

module.exports.doEditAd = (req, res, next) => {

  const idEdit = req.params.id;

  User.findOne({email:req.session.currentUser.email})
    .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    const findMiscModel = user.misc;
    const findContactModel = user.contact;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(idEdit)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idEdit)) {
      modelVariable = Car;
    }
    else if(findMiscModel.includes(idEdit)) {
      modelVariable = Misc;
    }
    else if(findContactModel.includes(idEdit)) {
      modelVariable = Contact;
    } else {
      console.log('something wrong in doEditAd user.controller')
    }

    function renderWithErrors(errors) {
      req.body.id = idEdit;
      if(req.body.brand == '') {
        req.body.brand = 'Elige Marca'
      }
      else if (req.body.title == '') {
        req.body.title = ' ';
      }
      let brandSelect;
        switch(req.body.category) {
          case 'Motos':
            brandSelect = 'motos';
            break;
            case 'Coches':
            brandSelect = 'coches'; 
            case 'Todoterrenos':
            brandSelect = 'coches';
            break;
            case 'Bricolaje':
            brandSelect = 'misc';
            break;
            case 'Para Bebés':
            brandSelect = 'misc';
            break;
            case 'Electrodomésticos':
            brandSelect = 'misc';
            break;
            case 'Muebles':
            brandSelect = 'misc';
            break;
            case 'Ropa':
            brandSelect = 'misc';
            break;
            case 'Otros':
            brandSelect = 'misc';
            break;
            case 'Contactos Mujeres':
            brandSelect = 'contactos';
            break;
            case 'Contactos Gays':
            brandSelect = 'contactos';
            break;
            case 'Contactos Trans':
            brandSelect = 'contactos';
            break;
            case 'Contactos Hombres':
            brandSelect = 'contactos';
            break;
            case 'Otros Contactos':
            brandSelect = 'contactos';
            break;
            default:
          console.log('something went wrong in user.controller renderwitherrors');
        }

      res.render('users/my-ads-edit', {
        ad: req.body,
        [brandSelect]:brandSelect,
        errors: errors
      })
    }
    
    modelVariable.findById({_id:idEdit})
      .then(ad => {
        if(ad){
          const getBrand = (arg) => {
            const obj = {
              '':'',
              '1': 'Aston Martin',
              '2': 'Audi',
              '3': 'Austin',
              '4': 'Bentley',
              '5': 'BMW',
              '6': 'Chevrolet',
              '7': 'Chrysler',
              '8': 'Citroen',
              '9': 'Dacia',
              '10': 'Daewoo',
              '11': 'Daihatsu',
              '12': 'Dodge',
              '13': 'Fiat',
              '14': 'Ford',
              '15': 'Galloper',
              '16': 'Honda',
              '17': 'Hummer',
              '18': 'Hyundai',
              '19': 'Infiniti',
              '20': 'Isuzu',
              '21': 'Jaguar',
              '22': 'Jeep',
              '23': 'Kia',
              '24': 'Lada',
              '25': 'Lamborghini',
              '26': 'Lancia',
              '27': 'Land-Rover',
              '28': 'Lexus',
              '29': 'Lotus',
              '30': 'Mazda',
              '31': 'Mercedes-Benz',
              '32': 'MG',
              '33': 'Mini',
              '34': 'Mitsubishi',
              '35': 'Nissan',
              '36': 'Opel',
              '37': 'Peugeot',
              '38': 'Pontiac',
              '39': 'Porsche',
              '40': 'Renault',
              '41': 'Rolls-Royce',
              '42': 'Rover',
              '43': 'Saab',
              '44': 'Seat',
              '45': 'Skoda',
              '46': 'Smart',
              '47': 'Ssangyong',
              '48': 'Subaru',
              '49': 'Suzuki',
              '50': 'Tesla',
              '51': 'Toyota',
              '52': 'Volkswagen',
              '53': 'Volvo',
              '100': 'Aprilia',
              '101': 'Benelli',
              '102': 'Beta',
              '103': 'Bimota',
              '104': 'BMW',
              '106': 'Bultaco',
              '107': 'Cagiva',
              '108': 'Daelim',
              '109': 'Derbi',
              '110': 'Ducati',
              '111': 'Gasgas',
              '112': 'Gilera',
              '113': 'Hanway',
              '114': 'Harley Davidson',
              '115': 'Honda',
              '116': 'Husaberg',
              '117': 'Husqvarna', 
              '118': 'Hyosung',
              '119': 'Italjet',
              '120': 'Kawasaki',
              '121': 'Keeway',
              '122': 'KTM',
              '123': 'Kymco',
              '124': 'Lambretta',
              '125': 'Laverda',
              '126': 'Malaguti',
              '127': 'MBK',
              '128': 'Montesa',
              '129': 'Moto Guzzi',
              '130': 'Motor Hispania',
              '131': 'MV Agusta',
              '132': 'Ossa',
              '133': 'Peugeot',
              '134': 'Piaggio',
              '135': 'Puch',
              '136': 'Renault',
              '137': 'Rieju',
              '138': 'Royal Enfield',
              '139': 'Sherco',
              '140': 'Siam',
              '141': 'Suzuki',
              '142': 'Sym',
              '143': 'TGB',
              '144': 'Triumph',
              '145': 'Vespa',
              '146': 'Vespino',
              '147': 'Yamaha' 
            }
            return obj[arg];
          }
          const brand = getBrand(req.body.brand);
          req.body.brand = brand;
          modelVariable.findByIdAndUpdate(ad.id, req.body, { new: true, runValidators: true })
          .then(() => {
            res.redirect('/usuario')
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              renderWithErrors(error.errors)
            } else {
              next(error)
            }
          })
          } else {
            next(createError(404, '¿Estás conectado a tu cuenta?'))
          }
      })
      .catch(err => next(err))
  })
  .catch(error => next(error))
}

module.exports.editPhotosAd = (req, res, next) => {
  const idEdit = req.params.id;
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    const findMiscModel = user.misc;
    const findContactModel = user.contact;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(idEdit)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idEdit)) {
      modelVariable = Car;
    }
    else if(findMiscModel.includes(idEdit)) {
      modelVariable = Misc;
    }
    else if(findContactModel.includes(idEdit)) {
      modelVariable = Contact;
    } else {
      console.log('something wrong in editPhotosAd user.controller')
    }

    modelVariable.findOne({_id:idEdit})
    .then(ad => {
      res.render('users/my-ads-photos', { ad:ad } )
    })
    .catch(error => next(error))
  })
  .catch(error => next(error))
}

module.exports.addPhotosAd = (req, res, next) => {
  const idEdit = req.params.id;
  const addImages = [];
  req.files.map(eachPath => addImages.push(`uploads/${eachPath.filename}`))
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    const findMiscModel = user.misc;
    const findContactModel = user.contact;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(idEdit)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idEdit)) {
      modelVariable = Car;
    }
    else if(findMiscModel.includes(idEdit)) {
      modelVariable = Misc;
    }
    else if(findContactModel.includes(idEdit)) {
      modelVariable = Contact;
    } else {
      console.log('something wrong in addPhotosAd user.controller')
    }

    modelVariable.updateOne({_id:idEdit}, {$push:{'image.imgPath':{$each:addImages}}})
      .then(()=> {
        res.redirect(`/usuario/editar-fotos/${idEdit}`)
      })
      .catch(error => error)
  })
  .catch(error => next(error))
}

module.exports.deletePhotoAd = (req, res, next) => {
  const id = req.params.id;
  const photoName = `uploads/${req.params.photoPath}`;
  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    const findMiscModel = user.misc;
    const findContactModel = user.contact;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(id)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(id)) {
      modelVariable = Car;
    }
    else if(findMiscModel.includes(id)) {
      modelVariable = Misc;
    }
    else if(findContactModel.includes(id)) {
      modelVariable = Contact;
    } else {
      console.log('something wrong in deletePhotoAd user.controller')
    }
    modelVariable.findByIdAndUpdate({_id:id},{$pull:{'image.imgPath':photoName}})
    .then( () => {
      res.redirect(`/usuario/editar-fotos/${id}`)
    })
    .catch(error => next(error))
  })
  .catch(error => next(error))
}

module.exports.updateAd = (req,res,next) => {
  const idRenew = req.params.id;

  User.findOne({email:req.session.currentUser.email})
    .then(user => {
      const findAdModel = user.ad;
      const findCarModel = user.car;
      const findMiscModel = user.misc;
      const findContactModel = user.contact;
      var modelVariable;
      // //look in each ad model
      if(findAdModel.includes(idRenew)) {
        modelVariable = Ad;
      }
      else if(findCarModel.includes(idRenew)) {
        modelVariable = Car;
      }
      else if(findMiscModel.includes(idRenew)) {
        modelVariable = Misc;
      }
      else if(findContactModel.includes(idRenew)) {
        modelVariable = Contact;
      } else {
        console.log('something wrong in updateAd user.controller')
      }
      const updateAd = new Date;
      modelVariable.findById({_id:idRenew})
        .then(adData => {
          const hoursToRenew = new Date().getTime() - new Date(adData.renovate).getTime();
          if(hoursToRenew >= 50400000) {
            modelVariable.findOneAndUpdate({_id:idRenew},{$set:{renovate:updateAd}})
            .then(ad => {
              if (!ad) {
                next(createError(404, 'Anuncio no encontrado'))
              } else {
                  if(req.session.currentUser.email === ad.email){
                    res.redirect('/usuario')
                  }
                }
            })
            .catch(error => next(error));
          } 
          else {
            res.redirect('/usuario')
          } 
        })
        .catch(error => next(error))
      
    })
    .catch(error => next(error))
}

module.exports.doDeleteAd = (req, res, next) => {
  const idDelete = req.params.id;

  User.findOne({email:req.session.currentUser.email})
  .then(user => {
    const findAdModel = user.ad;
    const findCarModel = user.car;
    const findMiscModel = user.misc;
    const findContactModel = user.contact;
    var modelVariable;
    // //look in each ad model
    if(findAdModel.includes(idDelete)) {
      modelVariable = Ad;
    }
    else if(findCarModel.includes(idDelete)) {
      modelVariable = Car;
    }
    else if(findMiscModel.includes(idDelete)) {
      modelVariable = Misc;
    }
    else if(findContactModel.includes(idDelete)) {
      modelVariable = Contact;
    } else {
      console.log('something wrong in doDeleteAd user.controller')
    }

    modelVariable.findByIdAndDelete(idDelete)
      .then(ad => {
        if (!ad) {
          next(createError(404, 'Anuncio no encontrado'))
        } else {
            res.redirect('/usuario')
          }
      })
      .catch(error => next(error));
  })
  .catch(error => next(error));
}

module.exports.password = (req, res, next) => {
  const email = req.session.currentUser.email;
  res.render('users/update-password', {user:email})
}

module.exports.doPassword = (req, res, next) => {
  const bcryptSalt = 10;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password,salt);
  const email = req.session.currentUser.email;
  if(req.body.email === email) {
    if (password === "") {
      res.render("users/update-password", {
        errorMessage: "La contraseña no puede estar vacía",
        user:email
      });
      return;
    }

    User.updateOne({email:email}, {$set:{password:hashPass}})
    //need improvement user not exists, password too short
      .then(() => {
        res.redirect('/usuario')
      })
      .catch(error => next(error))
  } else {
    res.redirect('/usuario')
    return;
  }
}

module.exports.passwordRecovery = (req, res, next) => {
  res.render('users/recovery-password')
}

module.exports.doPasswordRecovery = (req, res, next) => {
  const user = req.body.email;
  User.findOne({email:user})
    .then(userData => {
      //user doesn't exists: need to improve security
      if(!userData) {
        res.render('users/recovery-password',{errorMessage:'Parece que no existe este email'})
      } else {
        //JWT - token
        const payload = {
          id:userData._id,
          email:userData.email
        }
        const secret = `${userData.password}-${userData.updated_at}`;
        const token = jwt.encode(payload, secret)

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
          user: process.env.EMAILNODEMAILER,
          pass: process.env.NODEMAILERPASS
        }
        });

        const linkResetPass = `http://localhost:3000/usuario/modificar-clave/${payload.id}/${token}`;
        
        transporter.sendMail({
          from: 'BuenAnuncio - Clave <dandogasgas@gmail.com>',
          to: userData.email, 
          subject: 'Establece tu contraseña', 
          // html: `Pulsa en el siguiente enlace para cambiar tu clave:
          //        <a href="http://localhost:3000/usuario/modificar-clave/${payload.id}/${token}">Reset Password</a>`
          html:emailTemplate.createTemplate({linkResetPass})
        })
        res.render('users/recovery-password',{successMessage: 'Hemos enviado un correo a tu cuenta'})
      }
    })
    .catch (error => next(error))
  
}

module.exports.passwordModification = (req, res, next) => {
  const id = req.params.id;
  const token = req.params.token
  res.render('users/modification-password',{id,token})
}

module.exports.doPasswordModification = (req, res, next) => {
  const userId = req.params.id;
  const bcryptSalt = 10;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password,salt);

  User.findById({_id:userId})
    .then(userData => {
      const secret = `${userData.password}-${userData.updated_at}`;
      const payload = jwt.decode(req.params.token, secret);
      //maybe need security to improve
      User.updateOne({email:payload.email}, {$set:{password:hashPass}})
      .then(() => {
        res.redirect('/usuario')
      })
      .catch(error => next(error))
    })
    .catch(error => next(error))
}
