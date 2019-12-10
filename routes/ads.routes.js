const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');

router.get('/', adsController.home)
router.get('/anuncios', adsController.list)
router.get('/publicar-anuncio', adsController.post)
router.get('/mis-anuncios', adsController.myAds)
router.get('/publicar-anuncio/:categoryId', adsController.postSecond)

router.post('/publicar-anuncio/:categoryId', adsController.doPost)

module.exports = router;