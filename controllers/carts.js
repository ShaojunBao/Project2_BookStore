module.exports ={
  show,
  add,
  remove,
  checkout
}

const Book = require('../models/book');

async function add(req, res) {
  try {
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
      await req.session.save();

      // Redirect the user back to the previous page instead of the cart page
      res.redirect('back');
  } catch (err) {
      console.error(err);
  }
}

async function show(req, res) {
  try {
      // If the cart does not exist yet in the session, create it as an empty array
      req.session.cart = req.session.cart || [];

      // Render the cart page with the cart data
      res.render('carts/show', {
          cart: req.session.cart
      });
  } catch (err) {
      console.error(err);
  }
}

async function remove(req, res) {
  try {
      const bookId = req.params.id; 

      // Ensure cart exists
      req.session.cart = req.session.cart || [];
  
      // Find book in the cart
      const bookIndex = req.session.cart.findIndex(book => book._id === bookId);
      
      if (bookIndex > -1) {
          // If book exists, remove it from the cart
          req.session.cart.splice(bookIndex, 1);
          await req.session.save();
          res.redirect('/carts');
      } else {
          // If book does not exist, send error message
          res.status(404).send('Book not found in cart');
      }
  } catch (err) {
      console.error(err);
  }
}

async function checkout(req, res) {
  try {
      // Empty the cart
      req.session.cart =[];
      await req.session.save();

      // Redirect to the cart page which should now be empty
      res.redirect('/carts');
  } catch (err) {
      console.error(err);
  }
}

