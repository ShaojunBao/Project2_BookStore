const express = require('express');
const router = express.Router();
const cartsCtrl = require('../controllers/carts');

router.get('/', cartsCtrl.show);
router.post('/', cartsCtrl.add);
router.delete('/:id', cartsCtrl.remove);

module.exports = router;