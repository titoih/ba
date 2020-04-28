const express = require('express');
const router = express.Router();
const legalController = require('../controllers/legal.controller');

router.get('/terminos-y-condiciones', legalController.tos)
router.get('/cuadro-cookies', legalController.cookies);
router.get('/politica-privacidad', legalController.politicaPrivacidad)


module.exports = router;