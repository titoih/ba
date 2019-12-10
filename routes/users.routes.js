const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure.mid')
const userController = require('../controllers/users.controller');

router.get('/', secure.isAuthenticated, userController.myAds);

module.exports = router;
