const express = require('express');
const router = express.Router();
const detailsCtrl = require('../controllers/details');
const ensureLoggedIn = require('../config/ensureLoggedIn.js');

//POST books/:id
router.post('/books/:id/details',ensureLoggedIn,detailsCtrl.create);

//DELETE/details(reviews)
router.delete('/details/:id',ensureLoggedIn,detailsCtrl.delete);

//PUT/details/:id
router.put('/details/:id', ensureLoggedIn, detailsCtrl.update);


module.exports = router;