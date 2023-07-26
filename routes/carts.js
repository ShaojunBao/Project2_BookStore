const express = require('express');
const router = express.Router();
const cartsCtrl = require('../controllers/carts');

//GET route for '/'
router.get('/', cartsCtrl.show);
//POST route for'/'
router.post('/', cartsCtrl.add);
//DELETE route for '/' to remove item
router.delete('/:id', cartsCtrl.remove);
//POST route for '/checkout' and redirect to the origin page
router.post('/checkout', cartsCtrl.checkout);

module.exports = router;