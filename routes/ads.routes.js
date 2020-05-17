const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const secure = require('../middleware/secure.mid');
const upload = require('../middleware/upload.mid');

router.get('/', adsController.home);
router.get('/anuncios', secure.contactCookie, adsController.list);
router.get('/anuncios/:parentCategory', secure.contactCookie, adsController.list);
router.get('/anuncios/:parentCategory/:category', secure.contactCookie, adsController.list);

router.post('/anuncios', adsController.cookieContact);
router.get('/publicar-anuncio', adsController.post)
router.get('/publicar-anuncio/:categoryId', adsController.postSecond)
router.post('/publicar-anuncio/:categoryId', upload.uploadImages,upload.resizeImages, /* upload.getResult, */ adsController.doPost);
router.post('/send-email', adsController.sendEmail)

module.exports = router; 

// var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads' });