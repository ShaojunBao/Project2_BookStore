module.exports ={
    new: newBook,
    create,
    showAdults,
    showKids
}

const Book = require('../models/book')

function newBook(req,res){
    res.render('books/new',{errMsg: ''});
}

// Function to post books
async function create(req, res){
    try {
        const bookData = req.body;
        bookData.imagePath = '/images/' + req.file.filename; // Add the image
        const book = new Book(bookData);
        await book.save();
        //Redirect to the new book's page
        res.redirect('/books/new');
    } catch(err) {
        res.render('books/new', {errMsg: 'Failed to create new book.'});
    }
}

//Function to get adults book
async function showAdults(req,res){
    const books = await Book.find({category: 'Adults'});
    res.render('books/adults',{books:books})
}

//Function to get kids book
async function showKids(req,res){
    const books = await Book.find({category: 'Kids'});
    res.render('books/kids',{books:books})
}