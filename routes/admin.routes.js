const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure.mid');
const adminController = require('../controllers/admin.controller');

router.post('/borrar/:parentCategory/:id', secure.isAuthenticated, secure.checkRole, adminController.adminDelete);
router.post('/lock/:adminParams/:typeParam', secure.isAuthenticated, secure.checkRole, adminController.adminLock);

router.get('/scraper', secure.checkRole, adminController.phoneInput)
router.post('/scraper', secure.checkRole, adminController.carScraper)

module.exports = router; 