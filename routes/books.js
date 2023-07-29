const express = require('express');
const router = express.Router();
const multer = require('multer');
const booksCtrl = require('../controllers/books.js');
const ensureLoggedIn = require('../config/ensureLoggedIn.js');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


router.get('/new',ensureLoggedIn,booksCtrl.new);
router.post('/', upload.single('image'), booksCtrl.create);
router.get('/adults', booksCtrl.showAdults);
router.get('/kids', booksCtrl.showKids);
router.get('/:id', booksCtrl.show); 

module.exports = router;
