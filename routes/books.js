const express = require('express');
const router = express.Router();
const multer = require('multer');
const booksCtrl = require('../controllers/books.js');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router.get('/new', booksCtrl.new);

// POST route for /books
router.post('/', upload.single('image'), booksCtrl.create);

//GET routes for /books/adults and /books/kids
router.get('/adults', booksCtrl.showAdults);
router.get('/kids', booksCtrl.showKids);

module.exports = router;
