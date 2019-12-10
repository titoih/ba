const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure.mid')
const userController = require('../controllers/users.controller');

router.get('/alta', userController.signup);
router.post('/alta',userController.postSingup);
router.get('/mis-anuncios', userController.login);
router.post('/mis-anuncios', userController.doLogin);
router.get('/anuncios', secure.isAuthenticated, userController.ads);

module.exports = router;
