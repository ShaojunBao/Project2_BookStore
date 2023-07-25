module.exports ={
    show,
    add,
    remove
}

const Book = require('../models/book');

async function add(req, res) {
    // Get the book ID from the request body
    const bookId = req.body.bookId;

    // If the cart does not exist yet in the session, create it as an empty array
    req.session.cart = req.session.cart || [];

    // Get the book from the database using the provided ID
    const book = await Book.findById(bookId);

    // If the book does not exist, return an error
    if (!book) {
        return res.status(404).send('Book not found');
    }

    // If the book exists, add it to the cart and save the session
    req.session.cart = [...req.session.cart, book];
    req.session.save(err => {
        if (err) {
            return res.status(500).send('Could not save the session');
        }

        // Redirect the user to the cart page
        res.redirect('/carts');
    });
}

async function show(req, res) {
    // If the cart does not exist yet in the session, create it as an empty array
    req.session.cart = req.session.cart || [];

    // Render the cart page with the cart data
    res.render('carts/show', {
        cart: req.session.cart
    });
}

async function remove(req, res) {
    const bookId = req.params.id; 
  
    // Ensure cart exists
    req.session.cart = req.session.cart || [];
  
    // Find book in the cart
    const bookIndex = req.session.cart.findIndex(book => book._id === bookId);
    
    if (bookIndex > -1) {
      // If book exists, remove it from the cart
      req.session.cart.splice(bookIndex, 1);
      req.session.save(err => {
        if (err) {
          return res.status(500).send('Could not save the session');
        }
        res.redirect('/carts');
      });
    } else {
      // If book does not exist, send error message
      res.status(404).send('Book not found in cart');
    }
  }



