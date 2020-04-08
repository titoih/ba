const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.signup = (req, res, next) => {
  res.render('users/signup')
}

module.exports.postSingup = (req, res, next) => {
  const bcryptSalt = 10;
  const email = req.body.email;
  const adId = req.body.ad;
  const catId = req.body.cat;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password,salt);

  if (password === "") {
    res.render("users/postSignup", {
      errorMessage: "La contraseña no puede estar vacía",
      email:email
    });
    return;
  }

  //handle first ad in user account => model Ad or Car
  let typeAd;

    if(catId == 'Coches' || catId == 'Motos' || catId == 'Todoterrenos') {
      typeAd = 'car';
    } 
    else if(catId == 'Contactos Mujeres' || catId == 'Contactos Gays' || catId == 'Contactos Trans' || catId == 'Contactos Hombres' || catId == 'Otros'){
      typeAd = 'contact';
    } 
    else if (catId == 'Servicio Doméstico' || catId == 'Camareros' || catId == 'Educación' || catId == 'Administrativos' || catId == 'Otros'){
      typeAd = 'ad'
    } else {
      typeAd  = 'misc';
    }
  
  User.findOne({email:email})
    .then(user => {
      if(user === null){
        const newUser = new User({email:email,password:hashPass,[typeAd]:adId})
        return newUser.save()
        .then(() => {
          res.render('ads/test')
        })
        .catch(error => next(error))
      } else {
        res.render('users/postSignup', {errorMessage:'El usuario ya existe'})
      }  
    })
    .catch(err => next(err))
}

module.exports.login = (req, res, next) => {
  if(req.session.currentUser){
    res.redirect('/usuario')
  } else {
    res.render('users/login')

  }
}

module.exports.doLogin = (req,res,next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (userEmail === "" || userPassword === "") {
    res.render("users/login", {
      errorMessage: "Introduce email y contraseña."
    });
    return;
  }
  User.findOne({ email: userEmail })
  .then(user => {
      if (!user) {
        res.render("users/login", {
          errorMessage: "Usuario o password incorrectos.",
          email:userEmail
        });
        return;
      }
      else if (bcrypt.compareSync(userPassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        console.log('check session is saved?')
        console.log(req.session.currentUser)
        // res.redirect("/usuario")
        res.redirect("/mis-anuncios");
      } else {
        res.render("users/login", {
          errorMessage: "Usuario o password incorrectos",
          email:userEmail
        });
      }
  })
  .catch(error => {next(error)})
}

module.exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/usuario');
}

