const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/alta', authController.signup);
router.post('/alta',authController.postSingup);
router.get('/mis-anuncios', authController.login);
router.post('/mis-anuncios', authController.doLogin);
router.get('/logout', authController.logout);

module.exports = router;