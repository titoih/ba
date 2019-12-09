const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/alta', userController.signup);
// router.post('/alta',userController.doSignup);
// router.get('/mis-anuncios', userController.login);
// router.post('/mis-anuncios', userController.doLogin);

module.exports = router;
