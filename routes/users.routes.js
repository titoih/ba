const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure.mid')
const userController = require('../controllers/users.controller');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads' })

// /usuario/ route

router.get('/', secure.isAuthenticated, userController.myAds);
router.get('/editar/:id', secure.isAuthenticated, userController.editAd);
router.post('/editar/:id', secure.isAuthenticated, userController.doEditAd);
router.post('/borrar/:id', secure.isAuthenticated, userController.doDeleteAd);
router.post('/renovar/:id', secure.isAuthenticated, userController.updateAd);
router.get('/editar-fotos/:id', secure.isAuthenticated, userController.editPhotosAd)
router.post('/subir-fotos/:id', secure.isAuthenticated, upload.array('image'), userController.addPhotosAd)
router.post('/borrar-foto/:id/uploads/:photoPath', secure.isAuthenticated, userController.deletePhotoAd)


module.exports = router;
