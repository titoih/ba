const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure.mid')
const userController = require('../controllers/users.controller');

// /usuario/ route

router.get('/', secure.isAuthenticated, userController.myAds);
router.get('/editar/:id', secure.isAuthenticated, userController.editAd)

module.exports = router;
