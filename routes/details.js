const express = require('express');
const router = express.Router();
const detailsCtrl = require('../controllers/details');

//POST books/:id
router.post('/books/:id/details',detailsCtrl.create);

module.exports = router;