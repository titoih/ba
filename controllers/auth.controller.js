const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.signup = (req, res, next) => {
  res.render('users/signup')
}

module.exports.postSingup = (req, res, next) => {
  const bcryptSalt = 10;
  const email = req.body.email;
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

  User.findOne({email:email})
    .then(user => {
      if(user === null){
        User.create({email:email,password:hashPass})
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
  }
  res.render('users/login')
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
          errorMessage: "Usuario o password incorrectos."
        });
        return;
      }
      if (bcrypt.compareSync(userPassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/usuario");
      } else {
        res.render("users/login", {
          errorMessage: "Usuario o password incorrectos"
        });
      }
  })
  .catch(error => {next(error)})
  // res.render('auth/login')
}

