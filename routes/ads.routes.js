const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads' })

router.get('/', adsController.home)
router.get('/anuncios', adsController.list);
router.get('/publicar-anuncio', adsController.post)
router.get('/publicar-anuncio/:categoryId', adsController.postSecond)
router.post('/publicar-anuncio/:categoryId', upload.array('image'), adsController.doPost)
module.exports = router; 