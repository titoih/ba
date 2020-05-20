const express = require('express');
const router = express.Router();

router.get('/sitemap.xml', function(req, res) {
    res.sendFile('sitemap.xml', { root: '.' });
});
module.exports = router; 