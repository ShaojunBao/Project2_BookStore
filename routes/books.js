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
//GET /adults
router.get('/adults', booksCtrl.showAdults);
//GET /kids
router.get('/kids', booksCtrl.showKids);
//GET /search
router.get('/search', booksCtrl.search);
router.get('/:id', booksCtrl.show); 


module.exports = router;
