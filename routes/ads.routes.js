const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads' });
const secure = require('../middleware/secure.mid');

router.get('/', adsController.home);
router.get('/anuncios', secure.contactCookie, adsController.list);
router.get('/anuncios/:parentCategory', secure.contactCookie, adsController.list);
router.get('/anuncios/:parentCategory/:category', secure.contactCookie, adsController.list);

router.post('/anuncios', adsController.cookieContact);
router.get('/publicar-anuncio', adsController.post)
router.get('/publicar-anuncio/:categoryId', adsController.postSecond)
router.post('/publicar-anuncio/:categoryId', upload.array('image'), adsController.doPost)
router.post('/send-email', adsController.sendEmail)

module.exports = router; 