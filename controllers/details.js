module.exports = {
    create
}

const Book = require('../models/book');

async function create(req,res){
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404).send('Book not found');
        return;
    }
    book.details.push(req.body)
    try{
        await book.save()
    } catch(err){
        console.log(err)
    }
    res.redirect(`/books/${book._id}`);
}